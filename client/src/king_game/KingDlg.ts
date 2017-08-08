// TypeScript file
namespace app.king_game {
    export class KingDlg extends ui.Dialog {
        lblTitle: eui.Label;
        btnEnd: eui.Button;
        listHead: eui.List;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.updateView()
        }

        registerEvent() {
            this.btnEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnd, this);
            this.listHead.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.show, this);
        }

        dispose() {
            super.dispose();
            this.btnEnd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnd, this);
            this.listHead.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.show, this);
        }

        updateView() {
            let index = manager.king.playerList[13];
            this.lblTitle.text = "Player %s is King".format(index);
            this.showHead();
        }

        show(e: eui.ItemTapEvent) {
            let index = this.listHead.selectedIndex;
            let item = this.listHead.getChildAt(index) as eui.ItemRenderer;
            let grp = item.$children[1] as eui.Group;
            if (grp.scaleX)
                egret.Tween.get(grp).to({ scaleX: 0, visible: 0 }, 300).call(() => {
                    egret.Tween.removeTweens(grp);
                });;
        }

        onBtnEnd() {
            ui.msgBox('quit game?', { buttons: ui.MessageButton.YesNo }, (e: ui.DialogEvent) => {
                e.result == ui.DialogResult.Yes ? this.close() : "";
            })
        }

        showHead(showJob = false) {
            let arrCollect = this.listHead.dataProvider as eui.ArrayCollection;
            let source = [];

            for (let key in manager.king.playerList) {
                let index = manager.king.playerList[key];
                let job = '';
                switch (key) {
                    case "1":
                        job = 'A';
                        break;
                    case "11":
                        job = 'J';
                        break;
                    case "12":
                        job = 'Q';
                        break
                    case "13":
                        job = 'K';
                        break;
                    default:
                        job = key;
                }
                source.push({
                    job: job,
                    index: 'Player ' + index,
                })
                arrCollect.source = source;
            }
        }
    }
}
