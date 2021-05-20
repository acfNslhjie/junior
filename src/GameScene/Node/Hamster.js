Hamster = Angel.extend({
	index:-1,
	oPos:null,
	hammer:null,
	ctor:function(p, callback, tag, order){
		this._super(p, "#hamster.png", callback, p);
		this.setTag(tag);
		this.setLocalZOrder(order);
		this.setAnchorPoint(0.5, 1);
		this.setEnable(false);
		this.hammer = new cc.Sprite("#hammer.png");
		this.hammer.setAnchorPoint(0, 0);
		this.hammer.setVisible(false);
		this.addChild(this.hammer);
	},
	setPos:function(p){
		this.oPos = p;
		this.setPosition(p);
	},
	go2:function(json){
		this.setTag(json.tag);
		this.setSpriteFrame(json.image);
// this.setPositionY();
		this.go();
	},
	go:function(){
		var move1 = cc.moveBy(0.2,cc.p(0,this.height));
		var delay = cc.delayTime(1.1);
		var move2 = cc.moveBy(0.18,cc.p(0,-this.height));
		var func = cc.callFunc(function(){
			this.setEnable(false);
		},this);
		var seq = cc.sequence(move1, delay, move2, func);
		this.runAction(seq);
		this.setEnable(true);
	},
	hit:function(){
		this.hammer.setPosition(this.width * 0.5, this.height);
		this.stopAllActions();
		this.hammer.setRotation(20);
		this.hammer.setVisible(true);
		this.hammer.runAction(cc.rotateBy(0.2, -50));
		
		var move = cc.moveTo(0.2, this.oPos);
		var func = cc.callFunc(function(){
			this.hammer.setVisible(false);
		},this);
		var seq = cc.sequence(move, func);
		this.runAction(seq);
	}
});