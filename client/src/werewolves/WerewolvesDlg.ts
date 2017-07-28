// TypeScript file
namespace app.werewolves {
    interface IWereNum {
        txt: string
    }
    export class WerewolvesDlg extends ui.Dialog {
        lblTotal: eui.Label;
        tbrVilligers: eui.TabBar;
        tbrWolves: eui.TabBar;
        TempText: string;
        childrenCreated() {
            super.childrenCreated();
            this.TempText = this.lblTotal.text;
            this.tbrWolves.selectedIndex = 0;
            this.tbrVilligers.selectedIndex = 0;
            this.updateView();
        }

        dispose() {
            super.dispose();
        }

        updateView() {
            this.calPlayModel();
        }

        calPlayModel() {
            let villigers = (this.tbrVilligers.selectedItem as IWereNum).txt;
            let wolves = (this.tbrWolves.selectedItem as IWereNum).txt;
            this.lblTotal.text = this.TempText.format(+villigers + +wolves);
        }
    }
}
