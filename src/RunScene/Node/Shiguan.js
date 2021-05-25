Shiguan = cc.Node.extend({
	labelTag:0,
	posy:-80,
	ctor:function(parent,tag){
		this._super();
		parent.addChild(this,10,tag);
		this.init(tag);
	},
	init:function(tag){
		var name = "";
		if (TAG_SHIGUAN1_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN1, "#sg1.png",this.callback);
			name = "①";
			this.addlable(shiguan, name);
		//	this.addwater(shiguan,cc.p(shiguan.width/2,60),TAG_WATER1);
		}
		else if (TAG_SHIGUAN2_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN2, "#sg1.png",this.callback);
			name = "②";
			this.addlable(shiguan, name);
			//this.addwater(shiguan,cc.p(shiguan.width/2,60),TAG_WATER2);
		}
		else if (TAG_SHIGUAN3_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN3, "#sg1.png",this.callback);
			name = "③";
			this.addlable(shiguan, name);
			//this.addwater(shiguan,cc.p(shiguan.width/2,60),TAG_WATER3);
		}
		else if (TAG_SHIGUAN4_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN4, "#sg1.png",this.callback);
			name = "④";
			this.addlable(shiguan, name);
			//this.addwater(shiguan,cc.p(shiguan.width/2,30),TAG_WATER4);
		}
		else if (TAG_SHIGUAN5_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN5, "#sg1.png",this.callback);
			name = "⑤";
			this.addlable(shiguan, name);
			//this.addwater(shiguan,cc.p(shiguan.width/2,30),TAG_WATER5);
		}
		else if (TAG_SHIGUAN6_NODE == tag){
			var shiguan = new Button(this, 10, TAG_SHIGUAN6, "#sg1.png",this.callback);
			name = "⑥";
			this.addlable(shiguan, name);
			//this.addwater(shiguan,cc.p(shiguan.width/2,30),TAG_WATER6);
		}
		this.setCascadeOpacityEnabled(true);       
	},
	addlable:function(obj,name){
		var label = new cc.LabelTTF(name,gg.fontName,20);
		label.setColor(cc.color(0,0,0));
		label.setPosition(obj.width*0.5,212);
		obj.addChild(label);	
	},
	addwater:function(obj,pos,tag,num){
		var water = new cc.Sprite("#cly_line1.png");		
		water.setScale(0.6);
		obj.addChild(water,1,tag);
		if(num==null){
			water.setPosition(pos.x,10);
			water.runAction(cc.moveTo(1.5,cc.p(pos)));
		}else if(num==1){
			water.setPosition(pos);
		}
		
	},
	watermove:function(tag,time,posy){
		var water = this.getParent().getChildByTag(tag).getChildByTag(TAG_BEAKER_WATER).getChildByTag(TAG_WATER);
		var seq = cc.sequence(cc.delayTime(time),cc.moveBy(0.5,cc.p(0,posy)));
		water.runAction(seq);
	},
	shiguanmove:function(pos,pos1,rotate,time,time1){
		hand.addlefthand(this,"#hand/hand_left",cc.p(-25,100),0.5,40);
		var move = cc.moveBy(1,cc.p(0,130));
		var move1 = cc.moveTo(time,cc.p(pos));
		var rotate = cc.rotateTo(1,rotate);
		var move2 = cc.moveTo(1,cc.p(pos1));
		var spawn = cc.spawn(rotate,move2);
		if(time1==null){
			var seq = cc.sequence(move,cc.callFunc(function(){
				this.setLocalZOrder(11);
				hand.removehand(this,1,1);
				hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5);
			},this),move1,spawn,cc.callFunc(function(){
				hand.removehand(this,1,1);
				this.flowNext();
			},this));
		}else{
			var seq = cc.sequence(move,cc.callFunc(function(){
				this.setLocalZOrder(11);
				hand.removehand(this,1,1);
				hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5);
			},this),move1,spawn,cc.callFunc(function(){
				hand.removehand(this,1,1);
			},this),cc.delayTime(time1),cc.callFunc(function(){
				this.flowNext();
			},this));
		}	
		this.runAction(seq);
	},
	waterflow:function(obj,rotate,pos,pos1){
		var waterflow = new cc.Sprite("#cyl.png");
		waterflow.setScale(0.5,1);
		waterflow.setRotation(rotate);
		waterflow.setPosition(pos);
		obj.addChild(waterflow);
		var move = cc.moveTo(1,cc.p(pos1));
		var fade = cc.fadeOut(1);
		var spawn = cc.spawn(move,fade);
		var seq = cc.sequence(spawn,cc.callFunc(function() {
			waterflow.removeFromParent();
		}, this));
		waterflow.runAction(seq);
		
	},
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		func.retain();
		switch(p.getTag()){	
		case TAG_SHIGUAN1:
			if(action==ACTION_DO1){
				this.shiguanmove(cc.p(520,370),cc.p(515,220),-10,1.5);	
				this.watermove(TAG_BEAKER1_NODE,3,10);
			}else{
				var beakernode= this.getParent().getChildByTag(TAG_BEAKER1_NODE);
				var beaker1 = beakernode.getChildByTag(TAG_BEAKER_WATER).getChildByTag(TAG_WATER);
				this.watermove(TAG_BEAKER1_NODE,0.5,-10);
				
				var move = cc.moveTo(1,cc.p(550,370));
				var rotate = cc.rotateTo(1,0);
				var spawn = cc.spawn(move,rotate);
				var move1 = cc.moveTo(1.5,cc.p(140,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var seq = cc.sequence(cc.callFunc(function(){
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5);
					var water = this.getChildByTag(TAG_SHIGUAN1).getChildByTag(TAG_WATER1);
					water.runAction(cc.rotateTo(1,0));					
				},this),spawn,move1,cc.callFunc(function(){
					this.setLocalZOrder(10);
					hand.removehand(this,1,1);
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move2,cc.callFunc(function(){
					this.flowNext();
					hand.removehand(this,1,1);
					beakernode.removeFromParent(true);
				},this));
				this.runAction(seq);				
			}
			
			break;
		case TAG_SHIGUAN2:
			if (action==ACTION_DO1){
				this.shiguanmove(cc.p(720,370),cc.p(715,220),-10,2);
				this.watermove(TAG_BEAKER2_NODE,3.5,10);
			}else{
				var beakernode= this.getParent().getChildByTag(TAG_BEAKER2_NODE);
				var beaker1 = beakernode.getChildByTag(TAG_BEAKER_WATER).getChildByTag(TAG_WATER);
				this.watermove(TAG_BEAKER2_NODE,0.5,-10);

				var move = cc.moveTo(1,cc.p(750,370));
				var rotate = cc.rotateTo(1,0);
				var spawn = cc.spawn(move,rotate);
				var move1 = cc.moveTo(1.5,cc.p(180,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var seq = cc.sequence(cc.callFunc(function(){
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5);
					var water = this.getChildByTag(TAG_SHIGUAN2).getChildByTag(TAG_WATER2);
					water.runAction(cc.rotateTo(1,0));					
				},this),spawn,move1,cc.callFunc(function(){
					this.setLocalZOrder(10);
					hand.removehand(this,1,1);
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move2,cc.callFunc(function(){
					this.flowNext();
					hand.removehand(this,1,1);
					beakernode.removeFromParent(true);
				},this));
				this.runAction(seq);
			}
		
			break;
		case TAG_SHIGUAN3:
			if(action==ACTION_DO1){
				this.shiguanmove(cc.p(920,370),cc.p(915,220),-10,2.5);
				this.watermove(TAG_BEAKER3_NODE,4,10);
			}else{
				var beakernode= this.getParent().getChildByTag(TAG_BEAKER3_NODE);
				var beaker1 = beakernode.getChildByTag(TAG_BEAKER_WATER).getChildByTag(TAG_WATER);
				this.watermove(TAG_BEAKER3_NODE,0.5,-10);

				var move = cc.moveTo(1,cc.p(950,370));
				var rotate = cc.rotateTo(1,0);
				var spawn = cc.spawn(move,rotate);
				var move1 = cc.moveTo(1.5,cc.p(220,515));
				var move2= cc.moveBy(1,cc.p(0,-135));
				var seq = cc.sequence(cc.callFunc(function(){
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5);
					var water = this.getChildByTag(TAG_SHIGUAN3).getChildByTag(TAG_WATER3);
					water.runAction(cc.rotateTo(1,0));					
				},this),spawn,move1,cc.callFunc(function(){
					this.setLocalZOrder(10);
					hand.removehand(this,1,1);
					hand.addlefthand(this,"#hand/hand_left",cc.p(-25,80),0.5,40);
				},this),move2,cc.callFunc(function(){
					this.flowNext();
					hand.removehand(this,1,1);
					beakernode.removeFromParent(true);
				},this));
				this.runAction(seq);
			}
			
			break;
		case TAG_SHIGUAN4:
			if(action==ACTION_DO1){
				this.shiguanmove(cc.p(585,370),cc.p(590,220),10,1.5);		
				this.watermove(TAG_BEAKER1_NODE,3,10);
			}else{
				this.watermove(TAG_BEAKER1_NODE,0,-20);//烧杯水位下降
				var shiguan1 = this.getParent().getChildByTag(TAG_SHIGUAN1_NODE);
				hand.addlefthand(shiguan1,"#hand/hand_left",cc.p(-25,80),0.5);
				var water1 = shiguan1.getChildByTag(TAG_SHIGUAN1).getChildByTag(TAG_WATER1);
				var move = cc.moveTo(1,cc.p(520,370));
				var rotate = cc.rotateTo(1,10);
				var spawn = cc.spawn(rotate,cc.callFunc(function(){
					water1.runAction(cc.rotateTo(1,-10));
				}));
				var seq = cc.sequence(move,spawn,cc.delayTime(2.5),cc.callFunc(function(){
					this.schedule(function(){					
						this.waterflow(shiguan1,90,cc.p(10,130),cc.p(10,-80));	
					}, 0.01,50);
				},this),cc.callFunc(function(){
					water1.runAction(cc.moveBy(1,cc.p(0,15)));
				},this),cc.delayTime(2),cc.spawn(cc.rotateTo(1,-10)),cc.callFunc(function(){
					this.watermove(TAG_BEAKER1_NODE,0.5,10);
				},this),cc.moveTo(1,cc.p(515,220)),cc.callFunc(function(){					
					water1.runAction(cc.rotateTo(0.3,10));
					hand.removehand(shiguan1,1,1);
					this.flowNext();
				},this));
				shiguan1.runAction(seq);
				
				hand.addlefthand(this,"#hand/hand_right",cc.p(25,80),0.5);
				var water4 = this.getChildByTag(TAG_SHIGUAN4).getChildByTag(TAG_WATER4);
				var mov = cc.moveTo(1,cc.p(580,370));
				var rotat = cc.rotateTo(1,0);
				var spaw = cc.spawn(mov,rotat);
				var mov1 = cc.moveTo(1.5,cc.p(688,543));
				var rotat1 = cc.rotateTo(1.5,-100);
				var spaw1 = cc.spawn(rotat1,cc.callFunc(function(){
					var spawn = cc.spawn(cc.rotateTo(1.5,70),cc.scaleTo(1.5,1.2,0.6));
					water4.runAction(spawn);
				}));				
				var seq1 = cc.sequence(spaw,mov1,spaw1,cc.callFunc(function(){
					var spaw2 = cc.spawn(cc.moveTo(1,cc.p(5,10)),cc.scaleTo(1,0.0,0.6));//斜水面消失
					water4.runAction(spaw2);
				},this),cc.callFunc(function(){
					this.schedule(function(){
						this.posy = this.posy-1;
						this.waterflow(this,90,cc.p(-10,this.posy),cc.p(-10,130));	
					}, 0.01,50);
				},this),cc.delayTime(2.5),cc.callFunc(function(){
					this.setVisible(false);
				},this),cc.delayTime(2),cc.callFunc(function(){				
					this.removeFromParent(true);
				},this));
				this.runAction(seq1);
			}
			break;		
		case TAG_SHIGUAN5:
			if(action==ACTION_DO1){
				this.shiguanmove(cc.p(785,370),cc.p(790,220),10,2);		
				this.watermove(TAG_BEAKER2_NODE,3.5,10);
			}else {
				this.watermove(TAG_BEAKER2_NODE,0,-20);//烧杯水位下降
				var shiguan2 = this.getParent().getChildByTag(TAG_SHIGUAN2_NODE);
				hand.addlefthand(shiguan2,"#hand/hand_left",cc.p(-25,80),0.5);
				var water2 = shiguan2.getChildByTag(TAG_SHIGUAN2).getChildByTag(TAG_WATER2);
				var move = cc.moveTo(1,cc.p(720,370));
				var rotate = cc.rotateTo(1,10);
				var spawn = cc.spawn(rotate,cc.callFunc(function(){
					water2.runAction(cc.rotateTo(1,-10));
				}));
				var seq = cc.sequence(move,spawn,cc.delayTime(2.5),cc.callFunc(function(){
					this.schedule(function(){
						this.waterflow(shiguan2,90,cc.p(10,130),cc.p(10,-80));	
					}, 0.01,50);
				},this),cc.callFunc(function(){
					water2.runAction(cc.moveBy(1,cc.p(0,15)));
				},this),cc.delayTime(2),cc.spawn(cc.rotateTo(1,-10)),cc.callFunc(function(){
					this.watermove(TAG_BEAKER2_NODE,0.5,10);
				},this),cc.moveTo(1,cc.p(715,220)),cc.callFunc(function(){					
					water2.runAction(cc.rotateTo(0.3,10));
					hand.removehand(shiguan2,1,1);
					this.flowNext();
				},this));
				shiguan2.runAction(seq);

				hand.addlefthand(this,"#hand/hand_right",cc.p(25,80),0.5);
				var water5 = this.getChildByTag(TAG_SHIGUAN5).getChildByTag(TAG_WATER5);
				var mov = cc.moveTo(1,cc.p(780,370));
				var rotat = cc.rotateTo(1,0);
				var spaw = cc.spawn(mov,rotat);
				var mov1 = cc.moveTo(1.5,cc.p(888,543));
				var rotat1 = cc.rotateTo(1.5,-100);
				var spaw1 = cc.spawn(rotat1,cc.callFunc(function(){
					var spawn = cc.spawn(cc.rotateTo(1.5,70),cc.scaleTo(1.5,1.2,0.6));
					water5.runAction(spawn);
				}));
				var seq1 = cc.sequence(spaw,mov1,spaw1,cc.callFunc(function(){
					var spaw2 = cc.spawn(cc.moveTo(1,cc.p(5,10)),cc.scaleTo(1,0.0,0.6));
					water5.runAction(spaw2);
				},this),cc.callFunc(function(){
					this.schedule(function(){
						this.posy = this.posy-1;
						this.waterflow(this,90,cc.p(-10,this.posy),cc.p(-10,130));	
					}, 0.01,50);
				},this),cc.delayTime(2.5),cc.callFunc(function(){
					this.setVisible(false);
				},this),cc.delayTime(2),cc.callFunc(function(){				
					this.removeFromParent(true);
				},this));
				this.runAction(seq1);
				
			}
			break;
		case TAG_SHIGUAN6:
			var clock = this.getParent().clock;
			clock.setSpriteFrame("tool/clock.png");
			if(action==ACTION_DO1){
				this.watermove(TAG_BEAKER3_NODE,4,10);
				this.shiguanmove(cc.p(985,370),cc.p(990,220),10,2.5,4);		
				var clock = this.getParent().clock;
				clock.setSpriteFrame("tool/clock.png");
				var seq = cc.sequence(cc.delayTime(4.5),cc.callFunc(function(){
					clock.doing();
				},this),cc.delayTime(4),cc.callFunc(function(){
					clock.stop();
				},this));
				this.runAction(seq);
			}else {
				this.watermove(TAG_BEAKER3_NODE,0,-20);//烧杯水位下降
				var shiguan3 = this.getParent().getChildByTag(TAG_SHIGUAN3_NODE);
				hand.addlefthand(shiguan3,"#hand/hand_left",cc.p(-25,80),0.5);
				var water3 = shiguan3.getChildByTag(TAG_SHIGUAN3).getChildByTag(TAG_WATER3);
				var move = cc.moveTo(1,cc.p(920,370));
				var rotate = cc.rotateTo(1,10);
				var spawn = cc.spawn(rotate,cc.callFunc(function(){
					water3.runAction(cc.rotateTo(1,-10));
				}));
				var seq = cc.sequence(move,spawn,cc.delayTime(2.5),cc.callFunc(function(){
					this.schedule(function(){
						this.waterflow(shiguan3,90,cc.p(10,130),cc.p(10,-80));	
					}, 0.01,50);
				},this),cc.callFunc(function(){
					water3.runAction(cc.moveBy(1,cc.p(0,15)));
				},this),cc.delayTime(2),cc.spawn(cc.rotateTo(1,-10)),cc.callFunc(function(){
					this.watermove(TAG_BEAKER3_NODE,0.5,10);
				},this),cc.moveTo(1,cc.p(915,220)),cc.callFunc(function(){					
					water3.runAction(cc.rotateTo(0.3,10));
					hand.removehand(shiguan3,1,1);					
				},this),cc.callFunc(function(){
					clock.doing();
				},this),cc.delayTime(4),cc.callFunc(function(){
					clock.stop();
					this.flowNext();
				},this));
				shiguan3.runAction(seq);

				hand.addlefthand(this,"#hand/hand_right",cc.p(25,80),0.5);
				var water6 = this.getChildByTag(TAG_SHIGUAN6).getChildByTag(TAG_WATER6);
				var mov = cc.moveTo(1,cc.p(980,370));
				var rotat = cc.rotateTo(1,0);
				var spaw = cc.spawn(mov,rotat);
				var mov1 = cc.moveTo(1.5,cc.p(1088,543));
				var rotat1 = cc.rotateTo(1.5,-100);
				var spaw1 = cc.spawn(rotat1,cc.callFunc(function(){
					var spawn = cc.spawn(cc.rotateTo(1.5,70),cc.scaleTo(1.5,1.2,0.6));
					water6.runAction(spawn);
				}));
				var seq1 = cc.sequence(spaw,mov1,spaw1,cc.callFunc(function(){
					var spaw2 = cc.spawn(cc.moveTo(1,cc.p(5,10)),cc.scaleTo(1,0.0,0.6));
					water6.runAction(spaw2);
				},this),cc.callFunc(function(){
					this.schedule(function(){
						this.posy = this.posy-1;
						this.waterflow(this,90,cc.p(-10,this.posy),cc.p(-10,130));	
					}, 0.01,50);
				},this),cc.delayTime(2.5),cc.callFunc(function(){
					this.setVisible(false);
				},this),cc.delayTime(2),cc.callFunc(function(){				
					this.removeFromParent(true);
				},this));
				this.runAction(seq1);
			}			
		    break;
		
		}
	},
	actionDone:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){
		}
	},
	flowNext:function(){
		gg.flow.next();
	},
	
	
});