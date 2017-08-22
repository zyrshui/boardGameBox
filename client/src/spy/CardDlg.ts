// TypeScript file
namespace app.spy {
    export class CardDlg extends ui.Dialog {
        playerList: string[];
        curWord: string;
        index = -1;
        tempPlayText: string;

        lblTitle: eui.Label;
        btnFlip: eui.Button;
        btnNext: eui.Button;
        btnBack: eui.Button;
        lblWord: eui.Label;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.tempPlayText = this.lblTitle.text;
            this.playerList = manager.spy.getPlayerList();
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
            this.curWord = this.playerList[this.index];
            if (!this.curWord) {
                ui.show(SpyDlg);
                this.close();
            }
            this.currentState = 'positive';
            this.showPositive();
        }

        showPositive() {
            this.lblTitle.text = this.tempPlayText.format(this.index + 1);
        }

        showBack() {
            this.lblWord.text = this.curWord;
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
