// TypeScript file
namespace app.king_game {
    interface IKingGameData {
        txt: string
    }
    export class KingGameDlg extends ui.Dialog {
        recTouch: eui.Rect;
        tbrKings: eui.TabBar;
        srcKings: eui.Scroller;
        lblSelectedModel: eui.Label;
        btnStart:eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.registerEvent();
            this.updateView();
        }

        registerEvent() {
            this.recTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
            this.tbrKings.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrKingsItemTap, this);
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        }

        updateView() {
            let model = manager.king.getPlayModel();
            this.lblSelectedModel.text = model;
            this.tbrKings.selectedIndex = model - 6;
        }

        showDropList() {
            egret.Tween.get(this.srcKings).to({ height: 200 }, 300);
        }

        hideDropList() {
            egret.Tween.get(this.srcKings).to({ height: 0 }, 300);
        }

        onTbrKingsItemTap() {
            let data = this.tbrKings.selectedItem as IKingGameData;
            this.lblSelectedModel.text = data.txt;
            manager.king.setPlayModel(+data.txt);
            this.hideDropList();
        }

        startGame(){
            ui.show(CardDlg);
        }


        dispose() {
            super.dispose();
            this.recTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
        }
    }
}
