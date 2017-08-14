
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.js",
	"libs/lodash/lodash.js",
	"bin-debug/base/ui/View.js",
	"bin-debug/base/ui/Dialog.js",
	"bin-debug/base/ui/DialogManager.js",
	"bin-debug/Main.js",
	"bin-debug/base/ui/DialogEvents.js",
	"bin-debug/facade/FacadeDetailDlg.js",
	"bin-debug/facade/FacadeDlg.js",
	"bin-debug/king_game/CardDlg.js",
	"bin-debug/king_game/KingDlg.js",
	"bin-debug/king_game/KingGameDlg.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/manager/FacadeManager.js",
	"bin-debug/manager/KingManager.js",
	"bin-debug/manager/Manager.js",
	"bin-debug/manager/WerewolvesManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/msg.js",
	"bin-debug/utils/patch.js",
	"bin-debug/werewolves/CardDlg.js",
	"bin-debug/werewolves/JudgeDlg.js",
	"bin-debug/werewolves/WerewolvesDlg.js",
	"bin-debug/wgt/MsgBox.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedNarrow",
		contentWidth: 720,
		contentHeight: 1280,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};