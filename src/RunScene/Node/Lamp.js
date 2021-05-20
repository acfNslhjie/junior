Lamp = cc.Node.extend({
	ctor:function(p){
		this._super();
		p.addChild(this, 10, TAG_LAMP_NODE);
		this.init();
	},

	init : function(){
		var lamp =  new cc.Sprite("#lamp/lp1.png");
		lamp.setPosition(cc.p(0,0));
		this.addChild(lamp);
		
		var fire2 = new cc.Sprite("#fire2/1.png");
		fire2.setAnchorPoint(0.5,0);
		fire2.setPosition(cc.p(lamp.width/2,55));
		lamp.addChild(fire2);
		fire2.runAction(cc.repeatForever(this.fireaction()));	
	
	},
	fireaction:function(){
		var frames=[];
		for (i=1;i<=3;i++){
			var str ="fire2/"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}
		var animation = new cc.Animation(frames,0.05);//负责动画序列
		var action = new cc.Animate(animation);//帧动画的动作创建
		return action;		
	},
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		func.retain();
		switch(p.getTag()){	
		
		}
	},

	actionDone:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){
		case TAG_LAMP:
		}
	},
	flowNext:function(){
		gg.flow.next();
	},

});