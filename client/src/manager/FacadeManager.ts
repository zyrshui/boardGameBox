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
        bg: string;
        show: () => void
    }
    export class FacedeManager {
        cfgMap: { [id: number]: IGameData } = {
            0: {
                name: "Werewolves",
                desc: t.WERE_DESC,
                bg: "img_facade_bg1_jpg",
                show: () => {
                    ui.show(werewolves.WerewolvesDlg);
                }
            },
            1: {
                name: "The King's game",
                desc: t.KING_DESC,
                bg: "img_facade_bg2_jpg",
                show: () => {
                    ui.show(king_game.KingGameDlg);
                }
            },
            2: {
                name: "",
                desc: "",
                bg: "",
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
