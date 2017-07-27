// TypeScript file
namespace app.werewolves {
    export class FacadeDlg extends ui.Dialog {
        btnPlay: eui.Button;
        btnBack: eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
        }

        onBtnBack() {
            this.close();
        }

        onBtnPlay() {
            ui.show(WerewolvesDlg);
        }

        dispose() {
            super.dispose();
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this.btnPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
        }

        // animatingShow() {
        //     this.x = this.stage.stageWidth;
        //     egret.Tween.get(this).to({ x: 0 }, 1000).call(() => {
        //         egret.Tween.removeTweens(this);
        //     });
        // }
    }
}
