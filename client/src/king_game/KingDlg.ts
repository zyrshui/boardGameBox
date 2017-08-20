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
            let img = item.$children[1] as eui.Image;
            let bg = item.$children[0] as eui.Image;
            if (img.scaleX)
                egret.Tween.get(img).to({ scaleX: 0 }, 300).call(() => {
                    egret.Tween.removeTweens(img);
                    item.$children[2].visible = true;
                    item.$children[3].visible = true;
                    egret.Tween.get(bg).to({ scaleX: 1 }, 300).call(() => {
                        egret.Tween.removeTweens(bg);
                    });
                });;
        }

        onBtnEnd() {
            ui.msgBox('quit game?', { buttons: ui.MessageButton.YesNo }, (e: ui.DialogEvent) => {
                if (e.result == ui.DialogResult.Yes) {
                    this.close();
                    manager.dispatchEventWith(Manager.GAME_END);
                }
            })
        }

        showHead(showJob = false) {
            let arrCollect = this.listHead.dataProvider as eui.ArrayCollection;
            let source = [];

            for (let key in manager.king.playerList) {
                let index = manager.king.playerList[key];
                source.push({
                    index: index,
                    source: manager.king.getJobImage(+key)
                })
                arrCollect.source = source;
            }
        }
    }
}
