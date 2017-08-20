// TypeScript file
namespace app.king_game {
    export class CardDlg extends ui.Dialog {
        playerList: number[];
        curJob: number;
        index = -1;
        tempPlayText: string;

        lblTitle: eui.Label;
        lblDesc: eui.Label;
        imgCard: eui.Image;
        btnFlip: eui.Button;
        btnNext: eui.Button;
        btnBack: eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.tempPlayText = this.lblTitle.text;
            this.playerList = manager.king.getPlayerList();
            this.next();
        }

        registerEvent() {
            this.btnFlip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFlip, this);
            this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNext, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }

        dispose() {
            super.dispose();
            this.btnFlip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFlip, this);
            this.btnNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNext, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }



        next() {
            this.index++;
            this.curJob = this.playerList[this.index];
            if (!this.curJob) {
                ui.show(KingDlg);
                this.close();
            }
            this.currentState = 'positive';
            this.showPositive();
        }

        showPositive() {
            this.lblTitle.text = this.tempPlayText.format(this.index + 1);
            this.imgCard.source = 'king_card_bg_png';
        }

        showBack() {
            this.lblDesc.text = this.playerList.length == this.index + 1 ? t.FLIP_CARD_END : t.FLIP_CARD;
            this.imgCard.source = manager.king.getJobImage(this.curJob);
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
