// TypeScript file
namespace app.werewolves {
    interface IWereNum {
        txt: string
    }
    export class WerewolvesDlg extends ui.Dialog {
        btnModel9: eui.CheckBox;
        btnModel12: eui.CheckBox;
        lblTotal: eui.Label;
        tbrVilligers: eui.TabBar;
        tbrWolves: eui.TabBar;
        TempText: string;
        grpCheck: eui.Group;
        btnStart: eui.Button;
        btnBack: eui.Button;
        imgVilliger: eui.Image;
        imgWolves: eui.Image;
        srcVilligers: eui.Scroller;
        srcWolves: eui.Scroller;
        lblSelectedVilligers: eui.Label;
        lblSelectedWolves: eui.Label;
        childrenCreated() {
            super.childrenCreated();
            this.initData();
            this.registerEvent();
            this.updateView();
        }

        dispose() {
            super.dispose();
            this.btnModel9.removeEventListener(eui.UIEvent.CHANGE, this.onBtnModel9, this);
            this.btnModel12.removeEventListener(eui.UIEvent.CHANGE, this.onBtnModel12, this);
            this.imgVilliger.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
            this.imgWolves.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
            this.tbrVilligers.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrVilligersItemTap, this);
            this.tbrWolves.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrWolvesItemTap, this);
            this.grpCheck.$children.forEach(child => {
                child.removeEventListener(eui.UIEvent.CHANGE, this.onCheckChange, this);
            });
            this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartGame, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            manager.removeEventListener(Manager.GAME_END, this.close, this);
        }

        initData() {
            this.TempText = this.lblTotal.text;
            this.tbrWolves.selectedIndex = 0;
            this.tbrVilligers.selectedIndex = 0;
            manager.werewolves.players = {};
        }

        registerEvent() {
            this.btnModel9.addEventListener(eui.UIEvent.CHANGE, this.onBtnModel9, this);
            this.btnModel12.addEventListener(eui.UIEvent.CHANGE, this.onBtnModel12, this);
            this.imgVilliger.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
            this.imgWolves.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropList, this);
            this.tbrVilligers.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrVilligersItemTap, this);
            this.tbrWolves.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrWolvesItemTap, this);
            this.grpCheck.$children.forEach(child => {
                child.addEventListener(eui.UIEvent.CHANGE, this.onCheckChange, this);
            });
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartGame, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            manager.addEventListener(Manager.GAME_END, this.close, this);
        }

        showDropList(e:egret.TouchEvent) {
            let target = e.currentTarget as egret.DisplayObject;
            let src = this[target.name];
            egret.Tween.get(src).to({ height: 200 }, 300).call(()=>{
                egret.Tween.removeTweens(src);
            });
        }

         hideDropList(src:eui.Scroller) {
            egret.Tween.get(src).to({ height: 0 }, 300).call(()=>{
                egret.Tween.removeTweens(src);
            });
        }


        onBtnModel9() {
            this.tbrVilligers.selectedIndex = 0;
            this.tbrWolves.selectedIndex = 0;
            this.setSpecialJob(['Seer', 'Hunter', 'Witch']);
            this.updateView();
        }

        onBtnModel12() {
            this.tbrVilligers.selectedIndex = 1;
            this.tbrWolves.selectedIndex = 1;
            this.setSpecialJob(['Seer', 'Hunter', 'Witch', 'Idiot']);
            this.updateView();
        }

        onTbrVilligersItemTap(e: eui.ItemTapEvent) {
            this.hideDropList(this.srcVilligers);
            this.calPlayModel();
        }

        onTbrWolvesItemTap(e: eui.ItemTapEvent) {
            this.hideDropList(this.srcWolves);
            this.calPlayModel();
        }

        onCheckChange(evt: eui.UIEvent) {
            this.calPlayModel();
        }

        onBtnStartGame() {
            ui.show(CardDlg);
        }

        updateView() {
            this.calPlayModel();
        }


        calPlayModel() {
            let villigers = 0, wolves = 0, specials = 0;
            if (this.tbrVilligers.selectedItem)
                villigers = +((this.tbrVilligers.selectedItem as IWereNum).txt);
            if (this.tbrWolves.selectedItem)
                wolves = +((this.tbrWolves.selectedItem as IWereNum).txt);
            let findSpecials = _.filter(this.grpCheck.$children, (child: eui.CheckBox) => {
                manager.werewolves.players[child.name] = child.selected ? 1 : 0;
                return child.selected == true;
            })
            this.lblSelectedVilligers.text = villigers;
            this.lblSelectedWolves.text = wolves;
            manager.werewolves.players['Villager'] = villigers;
            manager.werewolves.players['Wolves'] = wolves;
            this.notifyTotalChange(villigers + wolves + findSpecials.length);
        }

        setSpecialJob(jobs: string[]) {
            for (let i = 0, l = this.grpCheck.$children.length; i < l; i++) {
                let child = this.grpCheck.$children[i] as eui.CheckBox;
                child.selected = jobs.indexOf(child.name) > -1;
            }
        }

        notifyTotalChange(total: number) {
            this.lblTotal.text = this.TempText.format(total);
        }
    }
}
