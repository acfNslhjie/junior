var AboutLayer = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_about.about_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new AboutBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new AboutMainLayer();
		this.addChild(this.mainLayar);
	}
});

var AboutScene = PScene.extend({
	onEnter:function () {
		this._super();
		var layer = new AboutLayer();
		this.addChild(layer);
	}
});
