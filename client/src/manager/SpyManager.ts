// TypeScript file
namespace app {
    interface ISpyWord {
        sameWord: string,
        spyWords: string[]
    }
    export class SpyManager {
        _model: number = 9;
        playerList: string[] = [];
        wordList: ISpyWord[] = [
            { sameWord: 'Cat', spyWords: ['Dog', 'Pet Pig'] },
            { sameWord: 'Toe', spyWords: ['Finger', 'Arm'] }
        ];
        sameWoed = "";
        setPlayModel(model: number) {
            this._model = model;
        }

        getPlayerList() {
            let spyNum = 1;
            let list: string[] = [];
            if (this._model > 8) {
                spyNum = 2;
            }
            let index = getRandNum(0, this.wordList.length - 1);
            let words = this.wordList[index];
            this.sameWoed = words.sameWord;
            for (let i = 1; i <= this._model - spyNum; i++) {
                list.push(words.sameWord);
            }
            for (let i = 0; i < spyNum; i++) {
                list.push(words.spyWords[i]);
            }
            this.playerList = list.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1;
            })
            return this.playerList;
            function getRandNum(min, max) {
                let choice = max - min + 1;
                return Math.floor(Math.random() * choice + min);
            }
        }
    }
}
