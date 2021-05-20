PScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		this.preLoad();
	},
	preLoad:function(){
		if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
			// html5 浏览器
			cc.log("html5");
		} else{
			// cc.sys.os native 不需要预加载资源
			gg.run_load = true;
			gg.finish_load = true;
			gg.game_load = true;
			cc.log("jsb");
		}
		
		if(!gg.run_load){
			cc.loader.load(g_resources_run,
					function () {
				gg.run_load = true;
				cc.log("仿真页面加载完成");
			});
		}
		if(!gg.finish_load){
			cc.loader.load(g_resources_finish, 
					function () {
				gg.finish_load = true;
				cc.log("结束页面加载完成");
			});
		}
		if(!gg.game_load){
			cc.loader.load(g_resources_game, 
					function () {
				gg.game_load = true;
				cc.log("小游戏页面加载完成");
			});
		}
		if(!gg.test_load){
			cc.loader.load(g_resources_test, 
					function () {
				gg.test_load = true;
				cc.log("测试页面加载完成");
			});
		}
		if(!gg.about_load){
			cc.loader.load(g_resources_about, 
					function () {
				gg.about_load = true;
				cc.log("关于页面加载完成");
			});
		}
	}
});