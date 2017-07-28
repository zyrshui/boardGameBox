// TypeScript file
namespace app {
    export class WerewolvesManager {
        players: { [id: string]: number } = {};
        playerList: string[] = [];
        getPlayerList(): string[] {
            let playerList = [];
            for (let job in this.players) {
                let jobCount = this.players[job];
                while (jobCount--) {
                    playerList.push(job);
                }
            }
            this.playerList = playerList.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
            return this.playerList;
        }

        getJobImage(job: string): string {
            return job+'_jpg';
        }
    }
}
