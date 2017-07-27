// TypeScript file
namespace app.ui {
    export class View extends eui.Component {

        constructor() {
            super();
            this.skinName = egret.getQualifiedClassName(this) + 'Skin';
        }

        /**子类重写 */
        public dispose() {
        }

        removeFromParent() {
            if (this.parent) {
                this.parent.removeChild(this);
                this.dispose();
            }
        }
    }
}
