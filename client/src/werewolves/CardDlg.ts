// TypeScript file
namespace app.werewolves {
    export class CardDlg extends ui.Dialog {
        playerList: string[];
        curJob: string;
        index = -1;
        tempPlayText: string;

        lblTitle: eui.Label;
        lblDesc: eui.Label;
        lblJob: eui.Label;
        imgCard: eui.Image;
        btnFlip: eui.Button;
        btnNext: eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.tempPlayText = this.lblTitle.text;
            this.playerList = manager.werewolves.getPlayerList();
            this.next();
        }

        registerEvent() {
            this.btnFlip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFlip, this);
            this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNext, this);
        }

        dispose() {
            super.dispose();
            this.btnFlip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFlip, this);
            this.btnNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNext, this);
        }



        next() {
            this.index++;
            this.curJob = this.playerList[this.index];
            if (!this.curJob) {
                ui.show(JudgeDlg);
                this.close();
            }
            this.currentState = 'positive';
            this.showPositive();
        }

        showPositive() {
            this.lblTitle.text = this.tempPlayText.format(this.index + 1);
            this.imgCard.source = 'card_bg_jpg';
        }

        showBack() {
            this.lblJob.text = this.curJob;
            this.lblDesc.text = this.playerList.length == this.index + 1 ? t.FLIP_CARD_END : t.FLIP_CARD;
            this.imgCard.source = manager.werewolves.getJobImage(this.curJob);
        }

        onBtnFlip() {
            this.currentState = 'back';
            this.showBack();
        }

        onBtnNext() {
            this.next();
        }
    }
}
