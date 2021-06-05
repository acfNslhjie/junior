Cylinder = cc.Node.extend({

	ctor:function(parent,action){
		this._super();
		parent.addChild(this,10,TAG_CYLINDER_NODE);
		this.init(action);


	},
	init:function(action){
		var label = new cc.LabelTTF("","gg.fontName","20");
		label.setColor(cc.color(0,0,0));
		if (action == ACTION_DO1){
			var cylinder = new Button(this, 10, TAG_CYLINDER,"#cylinder.png", this.callback);
			label.setPosition(cylinder.width*0.5,cylinder.height*0.8+12);
			label.setString("①");
			
		}else if(action == ACTION_NONE){
			var cylinder = new Button(this, 10, TAG_CYLINDER,"#cylinder.png", this.callback);
			label.setPosition(cylinder.width*0.5,cylinder.height*0.8+12);
			label.setString("②");
				
		} 
			

		cylinder.addChild(label,5);
	},
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		func.retain();
		var Cal = cc.callFunc(function(){
			p.runAction(func);
		},this);
		Cal.retain();
		switch(p.getTag()){
		case TAG_CYLINDER:
			if (action==ACTION_DO1){
				hand.removehand(this,1, 1);
				hand.addrighthand(this,"#hand/hand_right",cc.p(20,50),0.6);
				var move = cc.moveTo(2,cc.p(693,392));
				var rotate = cc.rotateTo(1,-100);
				var seq = cc.sequence(move,cc.delayTime(0.5),rotate,cc.callFunc(function(){
					p.runAction(func);
				},this),cc.delayTime(2),cc.callFunc(function(){
					this.removeFromParent(true);
				},this));
				this.runAction(seq);

				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN1_NODE);
				hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,100),0.5,40);
				var move1 = cc.moveBy(1,cc.p(0,135));
				var move2 = cc.moveTo(1.5,cc.p(550,220));
				var rotate1 = cc.rotateTo(1.5,10);
				var spawn = cc.spawn(move2,rotate1);
				var move3 = cc.moveTo(1.5,cc.p(140,515));
				var rotate2 = cc.rotateTo(1.5,0);
				var spawn2 = cc.spawn(move3,rotate2);
				var move4 = cc.moveBy(1,cc.p(0,-135));
				var seq1 = cc.sequence(move1,cc.callFunc(function(){
					shiguannode.setLocalZOrder(11);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.6);
				},this),spawn,cc.delayTime(3),spawn2,cc.callFunc(function(){
					shiguannode.setLocalZOrder(10);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move4,cc.callFunc(function(){
//					this.flowNext();
					hand.removehand(shiguannode,1,1);
					gg.flow.next();
					var show = new ShowTip(ll.run,"同样方法，在2号和3号试管" +
							"\n中分别加入2ml1%淀粉溶液",25,cc.p(650,300));
				}));
				shiguannode.runAction(seq1);
			}else{
				hand.removehand(this,1, 1);
				hand.addrighthand(this,"#hand/hand_right",cc.p(20,50),0.6);
				var move = cc.moveTo(2,cc.p(693,392));
				var rotate = cc.rotateTo(1,-100);
				var seq = cc.sequence(move,cc.delayTime(0.5),rotate,cc.callFunc(function(){
					p.runAction(func);
				},this),cc.delayTime(2),cc.callFunc(function(){
					this.removeFromParent(true);
				},this));
				this.runAction(seq);

				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN4_NODE);
				hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,100),0.5,40);
				var move1 = cc.moveBy(1,cc.p(0,135));
				var move2 = cc.moveTo(1.5,cc.p(550,220));
				var rotate1 = cc.rotateTo(1.5,10);
				var spawn = cc.spawn(move2,rotate1);
				var move3 = cc.moveTo(1.5,cc.p(260,515));
				var rotate2 = cc.rotateTo(1.5,0);
				var spawn2 = cc.spawn(move3,rotate2);
				var move4 = cc.moveBy(1,cc.p(0,-135));
				var seq1 = cc.sequence(move1,cc.callFunc(function(){
					shiguannode.setLocalZOrder(11);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.6);
				},this),spawn,cc.delayTime(3),spawn2,cc.callFunc(function(){
					shiguannode.setLocalZOrder(10);
					hand.removehand(shiguannode,1,1);
					hand.addlefthand(shiguannode,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move4,cc.callFunc(function(){
//					this.flowNext();
					hand.removehand(shiguannode,1,1);
					gg.flow.next();
					var show = new ShowTip(ll.run,"同样方法，在5号和6号试管中" +
							                    "\n分别加入1ml唾液淀粉酶溶液",25,cc.p(650,300));
				}));
				shiguannode.runAction(seq1);
			}
			
			
			break;
	
		}
	},
	actionDone:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){
		case TAG_CYLINDER:
			if(action==ACTION_DO1){
				var line = this.getChildByTag(TAG_SHOW);
				line.runAction(cc.moveBy(1,cc.p(0,-25)));
                
				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN1_NODE);
				var shiguan = shiguannode.getChildByTag(TAG_SHIGUAN1);
				shiguannode.addwater(shiguan,cc.p(shiguan.width/2,60),TAG_WATER1);
				this.schedule(function(){					
					shiguannode.waterflow(shiguannode,90,cc.p(10,130),cc.p(10,-80));	
				}, 0.01,50);
			}else{
				var line = this.getChildByTag(TAG_SHOW);
				line.runAction(cc.moveBy(1,cc.p(0,-25)));

				var shiguannode = this.getParent().getChildByTag(TAG_SHIGUAN4_NODE);
				var shiguan = shiguannode.getChildByTag(TAG_SHIGUAN4);
				shiguannode.addwater(shiguan,cc.p(shiguan.width/2,30),TAG_WATER4);
				this.schedule(function(){					
					shiguannode.waterflow(shiguannode,90,cc.p(10,130),cc.p(10,-80));	
				}, 0.01,50);
			}		
			break;
			
		}

	},

	flowNext:function(){
		gg.flow.next();
	}



});