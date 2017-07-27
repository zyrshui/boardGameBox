// TypeScript file
namespace app.facade {
    export class FacadeDlg extends ui.Dialog {
        btnWolves: eui.Button;
        btnKing: eui.Button;
        btnSpy: eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.btnWolves.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWolves, this);
            this.btnKing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnKing, this);
            this.btnSpy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSpy, this);
        }


        onBtnWolves() {
            ui.show(werewolves.FacadeDlg);
        }

        onBtnKing() {
            ui.msgBox('Not open yet', { buttons: ui.MessageButton.Yes });
        }

        onBtnSpy() {

        }

        dispose() {
            super.dispose();
            this.btnWolves.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWolves, this);
            this.btnKing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnKing, this);
            this.btnSpy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSpy, this);
        }

        Partial
    }
}
