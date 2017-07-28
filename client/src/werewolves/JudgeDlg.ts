// TypeScript file
namespace app.werewolves {
    export class JudgeDlg extends ui.Dialog {
        btnCheck: eui.Button;
        btnEnd: eui.Button;
        grpHead: eui.DataGroup;
        timeId: number;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.updateView()
        }

        registerEvent() {
            this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnCheck, this);
            this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnCheck, this);
            this.btnEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnd, this);
        }

        dispose() {
            super.dispose();
            this.btnCheck.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this);
            this.btnEnd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnd, this);
        }

        updateView() {
            this.showHead();
        }

        onBtnCheck(e: egret.TouchEvent) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.timeId = egret.setTimeout(() => {
                        this.showHead(true);
                    }, this, 1000);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    egret.clearTimeout(this.timeId);
                    this.showHead();
                    break;
            }
        }

        onBtnEnd() {
            ui.msgBox('quit game?',{ buttons: ui.MessageButton.YesNo }, (e: ui.DialogEvent) => {
                e.result == ui.DialogResult.Yes ? this.close() : "";
            })
        }

        showHead(showJob = false) {
            let arrCollect = this.grpHead.dataProvider as eui.ArrayCollection;
            let source = [];
            for (let i = 0, l = manager.werewolves.playerList.length; i < l; i++) {
                let job = manager.werewolves.playerList[i];
                source.push({
                    job: job,
                    index: i + 1,
                    showJob: showJob
                });
            }
            arrCollect.source = source;
        }
    }
}
