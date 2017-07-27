// TypeScript file
namespace app.ui {
    export class Dialog extends View {
        protected helpId: number;
        private _adjustWidth: boolean;
        private _adjustHeight: boolean;
        private _bgShape: egret.Shape;
        private _bgImage: eui.Image; //图片资源的九宫参数在setting.json中设置
        public autoHideBackground: boolean = true; // 当全屏时，是否自动隐藏背后的界面
        public showBgMask: boolean; // 是否显示一个背景的遮盖，以便界面没有完全显示时不至于显示后面的界面
        public bgMaskParam: number | string; //对话框背景的遮盖样式
        protected autoDisposeRes: boolean = true;
        onStageResize() {
            if (this._adjustWidth) {
                this.width = this.stage.stageWidth;
            } else {
                this.x = (this.stage.stageWidth - this.width) / 2;
            }
            if (this._adjustHeight) {
                this.height = this.stage.stageHeight;
            } else {
                this.y = (this.stage.stageHeight - this.height) / 2;
            }
            if (this._bgShape) {
                let shp = this._bgShape;
                let bgMaskColor = this.bgMaskParam as number;
                shp.graphics.beginFill(bgMaskColor || UIConfig.bgMaskColor);
                shp.graphics.drawRect(0, 0, this.width, this.height);
                shp.graphics.endFill();
            } else if (this._bgImage) {
                let img = this._bgImage;
                let bgMaskImage = this.bgMaskParam as string;
                img.width = this.width;
                img.height = this.height;
                img.source = bgMaskImage || UIConfig.bgMaskImage;
            }
        }

        $onAddToStage(stage: egret.Stage, nestLevel: number): void {
            super.$onAddToStage(stage, nestLevel);
            if (this.showBgMask) {
                if (!this.bgMaskParam || typeof (this.bgMaskParam) == 'number') {
                    this._bgShape = new egret.Shape();
                    this.addChildAt(this._bgShape, 0);
                } else {
                    this._bgImage = new eui.Image();
                    this._bgImage.cacheAsBitmap = true;
                    this.addChildAt(this._bgImage, 0);
                }
            }
            // 处理对话框的宽高的自动调整，所有对话框都是居中的，如果宽高与设计宽高一致，则自动调整为全屏
            this._adjustWidth = this.width == UIConfig.designWidth;
            this._adjustHeight = this.height == UIConfig.desighHeight;
            this.onStageResize();
            if (this._adjustWidth || this._adjustHeight)
                this.validateNow();
            this.stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
        }

        $onRemoveFromStage(): void {
            super.$onRemoveFromStage();
            this.stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
        }

        removeFromParent() {
            // 覆盖View的removeFromParent，Dialog的关闭需要调用close
        }
        close(result: DialogResult = DialogResult.No, data?: any) {
            if (!this.stage)
                return;
            ui.manager.close(this, result, data);
        }
    }
}
