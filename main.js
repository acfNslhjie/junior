cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading"))
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(false);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(1280, 768, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    
    gg.init();
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
    	var userId = $.getQueryString("userId");
    	gg.userId = userId;
    } else {
    	// 移动
    	var userId = cc.sys.localStorage.getItem("userId");
    	gg.userId = userId;
    }
    _ = new PlayMusic();
    hand = new Hand();
    cc.LoaderScene.preload(g_resources_start, function () {
    	$.runScene(new StartScene());
    }, this);
};
cc.game.run();