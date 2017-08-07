// TypeScript file
namespace app {
    export class Manager {
        werewolves:WerewolvesManager;
        facede:FacedeManager;
        init(){
            this.werewolves = new WerewolvesManager();
            this.facede = new FacedeManager();
        }
    }
}

var manager = new app.Manager();
