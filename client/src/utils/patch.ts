// TypeScript file
interface String {
    // shim
    startsWith(str: string, pos?: number): boolean;
    endsWith(str: string, pos?: number): boolean;

    // user customized
    format(...params: any[]): string;
    format(params: { [index: string]: string }): string;
}

(function () {
    // patch String Object
    if (!String.prototype.format) {
        String.prototype.format = function () {
            let str = this.toString();
            let seq = 0;
            str = str.replace(/(%s|%d|%%)/g, match => {
                return match === '%%' ? '%' : `{${seq++}}`
            });
            if (!arguments.length)
                return str;
            let argType = typeof arguments[0];
            let args = (("string" == argType || "number" == argType) ? arguments : arguments[0]);
            for (let arg in args)
                str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
            return str;
        }
    }
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (str: string, pos?: number) {
            if (pos === undefined) pos = str.length;
            return this.substr(pos - str.length, str.length) === str;
        }
    }
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (str: string, pos?: number) {
            if (pos === undefined) pos = 0;
            return this.substr(pos, str.length) === str;
        }
    }
    // patch Date Object

})();
