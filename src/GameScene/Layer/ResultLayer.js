var ResultLayer = cc.LayerColor.extend({
    ctor:function () {
        this._super();
        this.loadBg();
        this.loadTip();
        this.init();
    },
    init: function(){
    	new FireWork(this);
    	_.gameWin();
    	this.scheduleOnce(function(){
    		this.loadButton();
    	},3);
    },
    loadBg: function(){
    	this.setColor(cc.color(72,218,205));
    },
    loadButton:function(){
    	var start = new Angel(this,"#restart.png",
    		function(){
    		$.runScene(new StartScene());
    	},this);
    	start.setPosition(gg.c_width, 150);
    },
    loadTip : function(){
    	this.tip = new cc.Sprite("#great.png");
    	this.tip.setPosition(gg.c_width,400);
    	var rotate1 = cc.rotateTo(0.3, 10);
    	var rotate2 = cc.rotateTo(0.3, -10);
    	var seq = cc.sequence(rotate1,rotate2);
    	var forever = cc.repeatForever(seq);
    	this.tip.runAction(forever);
    	this.addChild(this.tip);
    },
});