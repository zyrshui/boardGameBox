// TypeScript file
namespace app {
    export enum EGameType {
        WEREWOLVES = 0,
        KING_GAME,
        WHO_IS_THIS_SPY
    }
    interface IGameData {
        name: string;
        desc: string;
        show: () => void
    }
    export class FacedeManager {
        cfgMap: { [id: number]: IGameData } = {
            0: {
                "name": "Werewolves",
                desc: t.WERE_DESC,
                show: () => {
                    ui.show(werewolves.WerewolvesDlg);
                }
            },
            1: {
                "name": "The King's game",
                desc: t.KING_DESC,
                show: () => {
                    ui.show(king_game.KingGameDlg);
                }
            },
            2: {
                "name": "",
                desc: "",
                show: () => {

                }
            }
        };
        playGame(gameType: EGameType) {
            let cfg = this.cfgMap[gameType];
            cfg.show();
        }
    }
}
