// TypeScript file
namespace app {
    export class KingManager {
        _model: number = 9;
        playerList: { [id: number]: number } = {};

        setPlayModel(model: number) {
            this._model = model;
        }

        getPlayModel() {
            return +this._model;
        }


        getPlayerList() {
            let list = [];
            for (let i = 1; i <= this._model - 1; i++) {
                list.push(i);
            }
            list.push(13);
            list.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
            for (let i = 0, l = list.length; i < l; i++) {
                let job = list[i];
                this.playerList[job] = i + 1;
            }
            return list;
        }

        getJobImage(job: number): string {
            return job + '_png';
        }

        getJobDesc(job: number): string {
            let desc = '';
            switch (job) {
                case 1:
                    desc = 'A';
                    break;
                case 11:
                    desc = 'J';
                    break;
                case 12:
                    desc = 'Q';
                    break;
                case 13:
                    desc = 'K';
                    break;
                default:
                    desc = job + '';
            }
            return desc;
        }
    }
}
