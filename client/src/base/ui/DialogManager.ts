// TypeScript file
namespace app.ui {

    export class UIConfig {
        public static designWidth = 720;
        public static desighHeight = 1280;
        public static popupBgColor = 0;
        public static popupBgAlpha = 0.8;
        public static bgMaskColor = 0x00222222; // 对话框背景的遮盖颜色，避免切换对话框时显示下面的对话框
        public static bgMaskImage = 'img_table_e';
    }

    export enum DisplayLayer {
        MAIN,     // 主界面层
        POPUP,    // 弹出的模式对话框层
        TOAST,    // 文字消息层
        LOADING,  // 加载动画层
        SYSTEM    // 系统消息层
    }

    export enum DialogResult {
        No = 1,
        Yes = 2,
        Skip = 1,
    }

    export enum MessageButton {
        Yes = 1,
        No = 2,
        YesNo = 3
    }

    interface PopupMaskOptions {
        closeOnClick?: boolean;
        bgColor?: number;
        bgAlpha?: number;
        noMask?: boolean;   // 不需要背景，不阻挡鼠标事件
        modalize?: boolean; // 是否模态化
    }

    // 控制对话框出现的显示参数
    export interface ShowOptions {
        closeAllOther?: boolean; // 关闭本层的其他所有View
        closeCurrent?: boolean;  // 关闭当前的最顶层的View
        clearPopup?: boolean;    // 关闭popup层的所有View
        closeOnClick?: boolean;  // 是否点击空白区域即关闭，只用于popup
        showBgMask?: boolean;    // 是否显示对话框背景遮盖
        params?: any[];          // 构造函数的参数
        animating?: boolean;     // 是否显示界面打开的动画
        popupBgColor?: number;   // 弹出界面的背景颜色
        popupBgAlpha?: number;   // 弹出界面的背景alpha
        popupNoMask?: boolean;   // 弹出界面不需要背景，不阻挡鼠标
        container?: egret.DisplayObjectContainer; // 是否显示在指定的容器中
        bgMaskParam?: number | string;//对话框背景的遮盖颜色或背景 图片资源的九宫参数在setting.json中设置
    }

    export interface RemoveOptions {
        until?: egret.DisplayObject;   // 从顶层遍历直到until指定的view停止
        exclude?: egret.DisplayObject; // 排除exclude指定的view
        onlyOne?: boolean;             // 只清除顶层
    }

    export interface MessageBoxOption {
        buttons?: MessageButton,
        skinName?: string,
        title?: string,
        lbls?: string[],
        icons?: string[]
    }

    export interface DialogConstructor<T> {
        new (...params: any[]): T
    };

    const emptyObject = {};
    const defaultMsgBoxOption = { buttons: MessageButton.Yes };
    const VIEW_AUTO_HIDDEN_KEY = "__auto_hidden__"; // 用于自动隐藏全屏界面下面的界面，目前只处理覆盖的最顶层的一个界面
    /**
    * 管理一组界面，对应DialogManager中的一个Layer
   */
    class ViewContainer extends eui.UILayer {
        private _layer: DisplayLayer;

        constructor(layer: DisplayLayer) {
            super();
            this._layer = layer;
            this.touchEnabled = false;
        }

        get layer(): DisplayLayer {
            return this._layer;
        }
    }

    /**
     * 模式弹出框如果需要使用半透明背景，则使用本容器
     * 每个PopupMaskContainer实例只容纳一个对话框
     */
    export class PopupMaskContainer extends eui.UILayer {
        private bgColor: number;
        private bgAlpha: number;
        private noMask: boolean;
        private shp: egret.Shape;
        private _view: egret.DisplayObject;

        constructor(opt: PopupMaskOptions = emptyObject) {
            super();
            this.bgColor = opt.bgColor === undefined ? UIConfig.popupBgColor : opt.bgColor;
            this.bgAlpha = opt.bgAlpha === undefined ? UIConfig.popupBgAlpha : opt.bgAlpha; // 防止opt.bgAlpha设置为0
            this.noMask = opt.noMask;
            if (opt.closeOnClick) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.numChildren > 1 && manager.close(this.getChildAt(1));
                }, this);
            }
            if (this.noMask)
                this.touchEnabled = false;
        }

        childrenCreated() {
            super.childrenCreated();
            if (this.noMask)
                return;
            this.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.shp = new egret.Shape();
            this.shp.x = this.shp.y = 0;
            this.addChildAt(this.shp, 0);
            this.onStageResize();
        }

        onStageResize() {
            let shp = this.shp;
            shp.graphics.beginFill(this.bgColor, this.bgAlpha);
            shp.graphics.drawRect(0, 0, this.width, this.height);
            shp.graphics.endFill();
        }

        $onRemoveFromStage(): void {
            super.$onRemoveFromStage();
            this.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
        }

        set view(value: egret.DisplayObject) {
            this._view = value;
            this.addChild(value);
        }

        get view(): egret.DisplayObject {
            return this._view;
        }
    }

    /**
     * 管理游戏中的所有界面，并按层来确定最主要的几个显示层级关系
     * 所有窗口界面的打开和关闭都必须通过DialogManger的show和close来进行，以便集中管理
     */
    class DialogManager {

        private _mainLayer: ViewContainer; // 主界面层
        private _popupLayer: ViewContainer; // 弹出的模式对话框层
        private _toastLayer: ViewContainer; // 文字消息层
        private _loadingLayer: ViewContainer; // 加载动画层
        private _systemLayer: ViewContainer; // 系统消息层
        private _layers: ViewContainer[];

        init(root: eui.UILayer) {
            this._mainLayer = new ViewContainer(DisplayLayer.MAIN);
            this._popupLayer = new ViewContainer(DisplayLayer.POPUP);
            this._toastLayer = new ViewContainer(DisplayLayer.TOAST);
            this._loadingLayer = new ViewContainer(DisplayLayer.LOADING);
            this._systemLayer = new ViewContainer(DisplayLayer.SYSTEM);
            this._layers = [this._mainLayer, this._popupLayer, this._toastLayer, this._loadingLayer, this._systemLayer];

            root.addChild(this._mainLayer);
            root.addChild(this._popupLayer);
            root.addChild(this._toastLayer);
            root.addChild(this._loadingLayer);
            root.addChild(this._systemLayer);
        }

        show(view: egret.DisplayObject, layer: DisplayLayer, opt: ShowOptions = emptyObject) {
            let container = opt.container || this._layers[layer];
            if (!container)
                return;
            let maskContainer: PopupMaskContainer;
            if (opt.popupNoMask != null || layer == DisplayLayer.POPUP) {
                maskContainer = new PopupMaskContainer({
                    closeOnClick: opt.closeOnClick,
                    bgColor: opt.popupBgColor,
                    bgAlpha: opt.popupBgAlpha,
                    noMask: opt.popupNoMask,
                });
            } else if (layer == DisplayLayer.LOADING) {
                maskContainer = new PopupMaskContainer({ bgAlpha: 0 });
            }
            if (maskContainer) {
                maskContainer.view = view;
                this.addToContainer(maskContainer, container, opt);
            } else {
                this.addToContainer(view, container, opt);
            }
        }

        private addToContainer(view: egret.DisplayObject, container: egret.DisplayObjectContainer, opt: ShowOptions) {
            if (opt.clearPopup) {
                this.removeAll(this._popupLayer);
            }
            if (opt.closeAllOther || opt.closeCurrent) {
                this.removeAll(container, { onlyOne: opt.closeCurrent });
            }
            container.addChild(view); // 必需先addChild，否则view的宽高获取不到
            if (isViewHideBackground(view)) {
                this.enumChildren(container, (v, index) => {
                    if (v === view) // 排除刚加入的
                        return false;
                    if (v[VIEW_AUTO_HIDDEN_KEY])
                        return true;
                    v[VIEW_AUTO_HIDDEN_KEY] = true;
                    v.visible = false;
                    return false;
                })
            }
        }

        removeAll(container: egret.DisplayObjectContainer, opt: RemoveOptions = emptyObject) {
            this.enumChildren(container, (view, index): boolean => {
                if (view === opt.until)
                    return true;
                if (view !== opt.exclude)
                    this.close(view);
                if (opt.onlyOne)
                    return true;
                return false;
            })
        }

        close(view: egret.DisplayObject, result: DialogResult = DialogResult.No, data?: any) {
            if (!view.stage)
                return;
            this.removeFromContainer(view);
            if (view instanceof Dialog)
                DialogEvent.dispatch(view, DialogEvent.CLOSE, { result: result, data: data });
            if (view instanceof View) {
                (view as View).dispose();
            }
        }

        private removeFromContainer(view: egret.DisplayObject) {
            let container = view.parent;
            if (container instanceof PopupMaskContainer) {
                container.removeChildren();
                view = container;
                container = container.parent;
            }
            container.removeChild(view);
            this.enumChildren(container, (v, index) => {
                if (v[VIEW_AUTO_HIDDEN_KEY]) {
                    v.visible = true;
                    v[VIEW_AUTO_HIDDEN_KEY] = false;
                }
                return isViewHideBackground(v) // 如果是全屏的视图，则结束遍历
            })
        }

        enumChildren(container: egret.DisplayObjectContainer, cb: (view: egret.DisplayObject, index: number) => boolean) {
            let count = container.numChildren;
            for (let i = count - 1; i >= 0; i--) {
                let view = container.getChildAt(i) as egret.DisplayObject;
                if (view instanceof PopupMaskContainer)
                    view = (view as PopupMaskContainer).view;
                if (cb(view, count - 1 - i))
                    return;
            }
        }
    }

    export function isViewHideBackground(view: egret.DisplayObject): boolean {
        if (!(view instanceof ui.Dialog))
            return false;
        let dlg = (view as any) as ui.Dialog;
        let stage = dlg.stage;
        return (dlg.autoHideBackground && dlg.width === stage.stageWidth && dlg.height === stage.stageHeight)
            && (isNaN(dlg.alpha) || dlg.alpha == 1);
    }

    function internalShowDialog<T extends Dialog>(c: { new (...params: any[]): T }, layer: DisplayLayer, opt: ShowOptions): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            egret.callLater(() => {
                let dlg = new c(...opt.params);
                dlg.showBgMask = opt.showBgMask;
                dlg.bgMaskParam = opt.bgMaskParam;
                manager.show(dlg, layer, opt);
                if (opt.animating && dlg['animatingShow']) {
                    dlg['animatingShow']();
                }
                resolve(dlg);
            }, this);
        });

    }

    export function init(root: eui.UILayer) {
        manager.init(root);
    }

    export function show<T extends Dialog>(c: DialogConstructor<T>, opt: ShowOptions = emptyObject): Promise<T> {
        return internalShowDialog(c, DisplayLayer.MAIN, opt);
    }

    export function msgBox(msg: string, opt?: MessageBoxOption, cb?: (e: DialogEvent) => void) {
        opt = opt || defaultMsgBoxOption;
        internalShowDialog(wgt.MsgBox, DisplayLayer.POPUP, { params: [msg, opt] }).then(dlg => {
            cb && dlg.addEventListener(DialogEvent.CLOSE, cb, this);
        });
    }

    export var manager = new DialogManager();
}

var ui = app.ui;
