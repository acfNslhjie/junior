var RunLayer2 = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_run.run_p);
//		cc.spriteFrameCache.addSpriteFrames(res_run.red_run_p);
//		cc.spriteFrameCache.addSpriteFrames(res_run.c7_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new RunBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new RunMainLayer();
		this.addChild(this.mainLayar);
	}
});

var RunScene = PScene.extend({
	onEnter:function () {
		this._super();
		gg.initTeach();
		var layer = new RunLayer2();
		this.addChild(layer);
	}
});
