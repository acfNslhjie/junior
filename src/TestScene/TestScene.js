var TestLayer = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_test.test_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new TestBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new TestMainLayer();
		this.addChild(this.mainLayar);
	}
});

var TestScene = PScene.extend({
	onEnter:function () {
		this._super();
		var layer = new TestLayer();
		this.addChild(layer);
	}
});
