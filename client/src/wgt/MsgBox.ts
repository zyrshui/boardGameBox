// TypeScript file
// TypeScript file
import MessageButton = app.ui.MessageButton;
import DialogResult = app.ui.DialogResult;
import MessageBoxOption = app.ui.MessageBoxOption;
namespace app.wgt {
    export class MsgBox extends app.ui.Dialog {
        public lblMsg: eui.Label;
        public lblTitle: eui.Label;
        public btnGroup: eui.Group;
        public firstBtn: eui.Button;
        public secondBtn: eui.Button;
        private _msg: string;
        private _style: MessageBoxOption;
        constructor(msg?: string, style?: MessageBoxOption) {
            super();
            this._msg = msg;
            this._style = style;
            if (style.skinName) {
                this.skinName = style.skinName;
            } else if (!this.skinName) {
                this.skinName = "app.wgt.MsgBoxSkin";
            }
        }

        createChildren() {
            super.createChildren();
            this.updateStyle();
        }

        /**
         * 更新msgBox风格
         */
        private updateStyle() {
            this.btnGroup.removeChildren();
            switch (this._style.buttons) {
                case MessageButton.Yes:
                    this.btnGroup.addChild(this.firstBtn);
                    break;
                case MessageButton.YesNo:
                    this.btnGroup.addChild(this.firstBtn);
                    this.btnGroup.addChild(this.secondBtn);
                    break;
                default:
                    console.log("参数错误");
                    break;
            }
            this.lblMsg.textFlow = (new egret.HtmlTextParser).parser(this._msg);
            if (this._style.lbls) {
                if (this._style.lbls[0]) {
                    this.firstBtn.label = this._style.lbls[0];
                }
                if (this._style.lbls[1]) {
                    this.secondBtn.label = this._style.lbls[1];
                }
            }
            if (this._style.icons) {
                if (this._style.icons[0]) {
                    this.firstBtn.icon = this._style.icons[0];
                }
                if (this._style.icons[1]) {
                    this.secondBtn.icon = this._style.icons[1];
                }
            }
            if (this._style.title && this.lblTitle) {
                this.lblTitle.text = this._style.title;
            }
            this.firstBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.secondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }

        /**
         * 处理点击事件给上层
         * @param e
         */
        public onClose(e: TouchEvent) {
            let closeType = DialogResult.Yes;
            switch (<any>e.currentTarget) {
                case this.firstBtn:
                    closeType = DialogResult.Yes;
                    break;
                case this.secondBtn:
                    closeType = DialogResult.No;
                    break;
            }
            this.close(closeType);
        }

        /**
         * 移除监听
         */
        public $onRemoveFromStage(): void {
            super.$onRemoveFromStage();
            this.firstBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.secondBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }
    }

}
