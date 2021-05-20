var StartLayer = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.stopMusic();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	stopMusic : function() {
		_.cPause();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_start.start_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new StartBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new StartMainLayer();
		this.addChild(this.mainLayar);
	}
});

var StartScene = PScene.extend({
	onEnter:function () {
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
});
