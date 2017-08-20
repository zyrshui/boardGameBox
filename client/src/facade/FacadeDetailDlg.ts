// TypeScript file
namespace app.facade {
    export class FacadeDetailDlg extends ui.Dialog {
        btnPlay: eui.Button;
        btnBack: eui.Button;
        gameType: EGameType;
        lblDesc: eui.Label;
        imgGameBg: eui.Image;
        constructor(gameType: EGameType) {
            super();
            this.gameType = gameType;
        }
        childrenCreated() {
            super.childrenCreated();
            let cfg = manager.facede.cfgMap[this.gameType];
            this.imgGameBg.source = cfg.bg;
            this.lblDesc.text = cfg.desc;
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
            manager.addEventListener(Manager.GAME_END, this.close, this);
        }

        onBtnBack() {
            this.close();
        }

        onBtnPlay() {
            manager.facede.playGame(this.gameType);
        }

        dispose() {
            super.dispose();
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack, this);
            this.btnPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
            manager.removeEventListener(Manager.GAME_END, this.close, this);
        }

        // animatingShow() {
        //     this.x = this.stage.stageWidth;
        //     egret.Tween.get(this).to({ x: 0 }, 1000).call(() => {
        //         egret.Tween.removeTweens(this);
        //     });
        // }
    }
}
