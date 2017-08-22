// TypeScript file
namespace app {
    export enum EGameType {
        WEREWOLVES = 0,
        KING_GAME,
        WHO_IS_THIS_SPY
    }
    interface IGameData {
        desc: string;
        bg: string;
        show: () => void
    }
    export class FacedeManager {
        cfgMap: { [id: number]: IGameData } = {
            0: {
                desc: t.WERE_DESC,
                bg: "img_facade_bg1_jpg",
                show: () => {
                    ui.show(werewolves.WerewolvesDlg);
                }
            },
            1: {
                desc: t.KING_DESC,
                bg: "img_facade_bg2_jpg",
                show: () => {
                    ui.show(king_game.KingGameDlg);
                }
            },
            2: {
                desc: t.SPY_DESC,
                bg: "img_facade_bg3_jpg",
                show: () => {
                    ui.show(spy.SpyGameDlg);
                }
            }
        };
        playGame(gameType: EGameType) {
            let cfg = this.cfgMap[gameType];
            cfg.show();
        }
    }
}
