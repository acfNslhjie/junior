var FinishLayer = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_finish.finish_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new FinishBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new FinishMainLayer();
		this.addChild(this.mainLayar);
	}
});

var FinishScene = PScene.extend({
	onEnter:function () {
		this._super();
		var layer = new FinishLayer();
		this.addChild(layer);
	}
});
