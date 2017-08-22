// TypeScript file
namespace app.spy {
    export class SpyDlg extends ui.Dialog {
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
            this.showHead();
        }

        show(e: eui.ItemTapEvent) {
            let index = this.listHead.selectedIndex;
            let item = this.listHead.getChildAt(index) as eui.ItemRenderer;
            let img = item.$children[2] as eui.Image;
            let corImg = item.$children[3] as eui.Image;
            let lblIndex = item.$children[4] as eui.Image;
            if (img.scaleX)
                corImg.visible = false;
            lblIndex.visible = false;
            egret.Tween.get(img).to({ scaleX: 0 }, 300).call(() => {
                egret.Tween.removeTweens(img);
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
            for (let i = 0, l = manager.spy.playerList.length; i < l; i++) {
                source.push({
                    job: manager.spy.playerList[i] == manager.spy.sameWoed ? "innocent" : "spy",
                    index: i + 1
                });
            }
            arrCollect.source = source;
        }
    }
}
