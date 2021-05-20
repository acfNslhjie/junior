var GameLayer = cc.Layer.extend({
	backgroundLayer : null,
	mainLayar : null,
	ctor:function () {
		this._super();
		this.initFrames();
		this.loadBackground();
		this.loadMainLayer();
	},
	initFrames : function(){
		cc.spriteFrameCache.addSpriteFrames(res_game.game_p);
	},
	loadBackground : function(){
		this.backgroundLayer = new GameBackgroundLayer();
		this.addChild(this.backgroundLayer);
	},
	loadMainLayer : function(){
		this.mainLayar = new GameMainLayer();
		this.addChild(this.mainLayar);
	},
	loadResultLayer:function(){
		this.removeChild(this.mainLayar,true);
		this.removeChild(this.backgroundLayer,true);
		this.resultLayar = new ResultLayer();
		this.addChild(this.resultLayar);
	}
});

var GameScene = PScene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});
