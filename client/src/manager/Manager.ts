// TypeScript file
namespace app {
    export class Manager {
        werewolves:WerewolvesManager;
        init(){
            this.werewolves = new WerewolvesManager();
        }
    }
}

var manager = new app.Manager();
