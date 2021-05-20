Drop2 = cc.Node.extend({
	ctor:function(p){
		this._super();
		p.addChild(this, 10, TAG_DROP_NODE);
		this.init();
	},
	init : function(){
		this.setCascadeOpacityEnabled(true);
		var bottle = new Button(this, 9, TAG_BOTTLE, "#dianfen/1.png",this.callback);
		var  lid  = new Button(this, 8, TAG_LID, "#lid.png",this.callback);
		lid.setPosition(0,67);
//		lid.setScale(1.7);
//		var label = new cc.LabelTTF("碘溶液",gg.fontName,12);
//		label.setColor(cc.color(0,0,0));
//		label.setPosition(bottle.width*0.5,bottle.height*0.35);
//		bottle.addChild(label, 11,TAG_LABEL);
	},
	genPoint:function(p,count,str){
		count --;
		if(count <= 0){
			return;
		}
		wp = new cc.Sprite("#"+str);
		wp.setPosition(10, 0);
		p.addChild(wp);
		var move = cc.moveBy(1, cc.p(0, -40));
		var func = cc.callFunc(function(){
			wp.removeFromParent(true);
			this.genPoint(p,count,str);
		}, this);
		var seq = cc.sequence(move, func);
		wp.runAction(seq);
	},
	xuanzhuan:function(){
		var frames=[];
		for(var i=1;i<6;i++){
			var str ="mei/"+i+".png";
			var frame=cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames,0.2);//负责动画序列
		var action = new cc.Animate(animation);//帧动画的动作创建
		return action;
	},
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		func.retain();
		switch(p.getTag()){	
		case TAG_LID:
			p.setSpriteFrame("lid1.png");
			p.setPosition(0,55);
			var move = cc.moveBy(0.5,cc.p(0,50));
			var rotate = cc.rotateTo(1,180);
			var move1= cc.moveTo(1,cc.p(50,-50));
			var spawn = cc.spawn(rotate,move1);
			var seq = cc.sequence(move,spawn,cc.callFunc(function(){
				var show = new ShowTip(ll.run,"注意瓶塞朝上",25,cc.p(1060,360));
				gg.flow.next();
				//this.flowNext();
			}));	
			p.runAction(seq);
			break;
		case TAG_BOTTLE:
			var lid =this.getChildByTag(TAG_LID);
			lid.removeFromParent(true);

			var move = cc.moveTo(1,cc.p(830,290));
			var rotate = cc.rotateTo(1,-70);
			var spawn = cc.spawn(rotate,move);
			var seq = cc.sequence(cc.callFunc(function(){
				hand.addrighthand(this, "#hand/hand_right", cc.p(20,-10),0.6);				
				p.runAction(this.xuanzhuan());	
			},this),cc.delayTime(1.2),spawn,cc.callFunc(function(){
				p.runAction(func);
				var show = new ShowTip(ll.run,"量取1ml",25,cc.p(660,120));
			},this),cc.delayTime(1),cc.callFunc(function(){
				this.removeFromParent();
			},this));
			this.runAction(seq);

			var cylindernode = this.getParent().getChildByTag(TAG_CYLINDER_NODE);
			hand.addlefthand(cylindernode, "#hand/hand_left", cc.p(-20,50),0.6);
			var rotate1 = cc.rotateTo(1,10);
			var rotate2 = cc.rotateTo(1,0);
			var seq1 = cc.sequence(cc.delayTime(1.2),rotate1,cc.delayTime(1),rotate2,cc.callFunc(function(){

				//	this.flowNext();
				gg.flow.next();
			}));
			cylindernode.runAction(seq1);
			break;
		}
	},
	actionDone:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){
		case TAG_BOTTLE:
			var cylindernode = this.getParent().getChildByTag(TAG_CYLINDER_NODE);
			var line = new cc.Sprite("#cly_line1.png");
			line.setScale(0.5);
			line.setRotation(-10);
			line.setPosition(0,-95);
			cylindernode.addChild(line,1,TAG_SHOW);
			var seq = cc.sequence(cc.moveBy(1,cc.p(0,25)),cc.rotateTo(1,0));
			line.runAction(seq);
			break;
		}
	},
	flowNext:function(){
		gg.flow.next();
		cc.log("下一步"+gg.flow.flow.tag);
	}
});