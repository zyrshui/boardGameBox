// TypeScript file
namespace app.ui {
    export interface DialogEventData {
        result?: DialogResult;
        data?: any;
    }

    export class DialogEvent extends egret.Event {

        public static CLOSE:string = "close";

        result: DialogResult;

        public static dispatch(target: egret.IEventDispatcher, type: string, dataObj?: DialogEventData): boolean {
            if (!target.hasEventListener(type))
                return true;

            var event: DialogEvent = egret.Event.create(DialogEvent, type);
            if (dataObj) {
                for (let key in dataObj) {
                    event[key] = dataObj[key];
                }
            }
            var r = target.dispatchEvent(event);
            egret.Event.release(event);
            return r;
        }
    }
}
