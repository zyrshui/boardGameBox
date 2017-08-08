// TypeScript file
namespace app {
    export class Manager {
        werewolves:WerewolvesManager;
        facede:FacedeManager;
        king:KingManager;
        init(){
            this.werewolves = new WerewolvesManager();
            this.facede = new FacedeManager();
            this.king = new KingManager();
        }
    }
}

var manager = new app.Manager();
