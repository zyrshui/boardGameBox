// TypeScript file
namespace app.facade {
    export class FacadeDlg extends ui.Dialog {
        imgWolves: eui.Image;
        imgKing: eui.Image;
        imgSpy: eui.Image;
        childrenCreated() {
            super.childrenCreated();
            this.imgWolves.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWolves, this);
            this.imgKing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnKing, this);
            this.imgSpy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSpy, this);
        }


        onBtnWolves() {
            ui.show(FacadeDetailDlg, {params:[EGameType.WEREWOLVES]});
        }

        onBtnKing() {
            ui.show(FacadeDetailDlg, {params:[EGameType.KING_GAME]});
        }

        onBtnSpy() {
            ui.msgBox('Not open yet', { buttons: ui.MessageButton.Yes });
        }

        dispose() {
            super.dispose();
            this.imgWolves.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWolves, this);
            this.imgKing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnKing, this);
            this.imgSpy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSpy, this);
        }

        Partial
    }
}
