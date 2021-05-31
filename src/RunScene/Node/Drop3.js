Drop3 = cc.Node.extend({
	ctor:function(p){
		this._super();
		p.addChild(this, 10, TAG_DROP_NODE);
		this.init();
	},
	init : function(){
		this.setCascadeOpacityEnabled(true);
		var bottle = new Button(this, 9, TAG_BOTTLE, "#bottle1.png",this.callback);
		var  lid  = new Button(this, 8, TAG_DROP, "#drop.png",this.callback);
		lid.setPosition(0,90);
		lid.setScale(1.3);
		var label = new cc.LabelTTF("碘溶液",gg.fontName,12);
		label.setColor(cc.color(0,0,0));
		label.setPosition(bottle.width*0.5,bottle.height*0.35);
		bottle.addChild(label, 11,TAG_LABEL);
	},
	genPoint:function(p,count,str){
		count --;
		if(count <= 0){
			return;
		}
		wp = new cc.Sprite("#"+str);
		wp.setPosition(10, 0);
		p.addChild(wp);
		var move = cc.moveBy(0.5, cc.p(0, -150));
		var func = cc.callFunc(function(){
			wp.removeFromParent(true);
			this.genPoint(p,count,str);
		}, this);
		var seq = cc.sequence(move, func);
		wp.runAction(seq);
	},
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		switch(p.getTag()){	
		case TAG_DROP:
			p.setSpriteFrame("drop1.png");
			p.setPosition(0,55);
			if(action==ACTION_DO1){
				var move = cc.moveBy(0.5,cc.p(0,60));
				var move1 = cc.moveBy(1.5,cc.p(-550,190));
				var move2 = cc.moveBy(0.5,cc.p(0,-50));
				
				var move3 = cc.moveBy(0.5,cc.p(0,50));
				var move4 = cc.moveBy(0.5,cc.p(550,-190));
				var move5 = cc.moveBy(0.5,cc.p(0,-60));
				
				
				var seq = cc.sequence(move,move1,move2);
				var seq2 = cc.sequence(move3,move4,move5);
				var seq1 = cc.sequence(seq,cc.callFunc(function(){
					this.genPoint(p, 2, "wpoint.png");
					p.runAction(func);
				},this),cc.delayTime(1),seq2,cc.callFunc(function(){
					p.setSpriteFrame("drop.png");
					p.setPosition(0,90);
				},this));
				p.runAction(seq1);
				hand.addrighthand(this.getParent(), "#hand/hand_right", cc.p(1120,440), 0.5);
				var seq3 = cc.sequence(seq.clone(),cc.delayTime(1),seq2.clone());
				hand.handmove1(this.getParent(),seq3,2);
				
			}else if(action==ACTION_DO2){
				var move = cc.moveBy(0.5,cc.p(0,60));
				var move1 = cc.moveBy(1.5,cc.p(-350,190));
				var move2 = cc.moveBy(0.5,cc.p(0,-50));

				var move3 = cc.moveBy(0.5,cc.p(0,50));
				var move4 = cc.moveBy(0.5,cc.p(350,-190));
				var move5 = cc.moveBy(0.5,cc.p(0,-60));

				var seq = cc.sequence(move,move1,move2);
				var seq2 = cc.sequence(move3,move4,move5);
				var seq1 = cc.sequence(seq,cc.callFunc(function(){
					this.genPoint(p, 2, "wpoint.png");
					p.runAction(func);
				},this),cc.delayTime(1),seq2,cc.callFunc(function(){
					p.setSpriteFrame("drop.png");
					p.setPosition(0,90);
				},this));
				p.runAction(seq1);
				hand.addrighthand(this.getParent(), "#hand/hand_right", cc.p(1120,440), 0.5);
				var seq3 = cc.sequence(seq.clone(),cc.delayTime(1),seq2.clone());
				hand.handmove1(this.getParent(),seq3,2);

			}else if(action==ACTION_DO3){
				var move = cc.moveBy(0.5,cc.p(0,60));
				var move1 = cc.moveBy(1.5,cc.p(-150,190));
				var move2 = cc.moveBy(0.5,cc.p(0,-50));

				var move3 = cc.moveBy(0.5,cc.p(0,50));
				var move4 = cc.moveBy(0.5,cc.p(150,-190));
				var move5 = cc.moveBy(0.5,cc.p(0,-60));

				var seq = cc.sequence(move,move1,move2);
				var seq2 = cc.sequence(move3,move4,move5);
				var seq1 = cc.sequence(seq,cc.callFunc(function(){
					this.genPoint(p, 2, "wpoint.png");
					p.runAction(func);
				},this),cc.delayTime(1),seq2,cc.callFunc(function(){
					p.setSpriteFrame("drop.png");
					p.setPosition(0,90);
				},this));
				p.runAction(seq1);
				hand.addrighthand(this.getParent(), "#hand/hand_right", cc.p(1120,440), 0.5);
				var seq3 = cc.sequence(seq.clone(),cc.delayTime(1),seq2.clone());
				hand.handmove1(this.getParent(),seq3,2);
			}									
		}
	},
	actionDone:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){		
		case TAG_DROP:
			if(action==ACTION_DO1){
				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN1_NODE);
				var sglan = new cc.Sprite("#sglan.png");
				sglan.setPosition(0,0);
				sglan.setOpacity(0);
				shiguannode.addChild(sglan,11);
				var seq1 = cc.sequence(cc.delayTime(1),cc.fadeIn(1.5));
				sglan.runAction(seq1);
				
				var move1 = cc.moveTo(1.5,cc.p(140,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var rotate = cc.rotateTo(0.1,5);
				var rotate1 = cc.rotateTo(0.2,-5);
				var rotate2 = cc.rotateTo(0.2,5);
				var rotate3 = cc.rotateTo(0.1,0);
				var seq2 = cc.sequence(rotate,rotate1,rotate2,rotate1,rotate2,rotate1,rotate2,rotate3);
				var seq= cc.sequence(cc.delayTime(0.5),seq2,cc.delayTime(1),move1,cc.callFunc(function(){
					shiguannode.setLocalZOrder(10);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.5,40);
					},this),move2,cc.callFunc(function(){
					this.flowNext();
					hand.removehand(shiguannode,1,1);
					},this));
				shiguannode.runAction(seq);
			}else if(action==ACTION_DO2){
				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN2_NODE);
				var move1 = cc.moveTo(2,cc.p(180,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var rotate = cc.rotateTo(0.1,5);
				var rotate1 = cc.rotateTo(0.2,-5);
				var rotate2 = cc.rotateTo(0.2,5);
				var rotate3 = cc.rotateTo(0.1,0);
				var seq2 = cc.sequence(rotate,rotate1,rotate2,rotate1,rotate2,rotate1,rotate2,rotate3);
				var seq= cc.sequence(cc.delayTime(0.5),seq2,cc.delayTime(1),move1,cc.callFunc(function(){
					shiguannode.setLocalZOrder(10);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move2,cc.callFunc(function(){
					this.flowNext();
					hand.removehand(shiguannode,1,1);
				},this));
				shiguannode.runAction(seq);
			}else if(action==ACTION_DO3){
				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN3_NODE);
				var sglan = new cc.Sprite("#sglan.png");
				sglan.setPosition(0,0);
				sglan.setOpacity(0);
				shiguannode.addChild(sglan,11);
				var seq1 = cc.sequence(cc.delayTime(1),cc.fadeIn(1.5));
				sglan.runAction(seq1);

				var move1 = cc.moveTo(2.5,cc.p(220,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var rotate = cc.rotateTo(0.1,5);
				var rotate1 = cc.rotateTo(0.2,-5);
				var rotate2 = cc.rotateTo(0.2,5);
				var rotate3 = cc.rotateTo(0.1,0);
				var seq2 = cc.sequence(rotate,rotate1,rotate2,rotate1,rotate2,rotate1,rotate2,rotate3);
				var seq= cc.sequence(cc.delayTime(0.5),seq2,cc.delayTime(1),move1,cc.callFunc(function(){
					shiguannode.setLocalZOrder(10);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move2,cc.callFunc(function(){
					var show = new ShowTip(ll.run,"1号和3号试管变蓝" +
							                    "\n2号试管不变蓝",25,cc.p(550,300));
					this.flowNext();
					hand.removehand(shiguannode,1,1);
				},this));
				shiguannode.runAction(seq);
			}
		}
	},
	flowNext:function(){

		gg.flow.next();
		cc.log("下一步"+gg.flow.flow.tag);
	}
});