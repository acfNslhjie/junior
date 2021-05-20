var RunLayer = cc.Layer.extend({
	arr:null,
	scene:null,
	clock:null,
	ctor:function (parent) {
		this._super();
		this.scene = parent;
		this.scene.addChild(this, 10);
		gg.main = this;
		this.init();
	},
	init:function () {
		this.callNext = cc.callFunc(function(){
			gg.flow.next();
		}, this);
		this.callKill = cc.callFunc(function(p){
			var seq = cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){
				p.removeFromParent(true);	
			}, this));
			p.runAction(seq);
		}, this); 
		
		this.callNext.retain();
		this.callKill.retain();
		//时钟
		this.clock = new Clock(this);
		// 物品库
		this.lib = new Lib(this);
		//试管架
		var shiguanjia = new cc.Sprite("#rack1.png");
		shiguanjia.setPosition(cc.p(240,310));
		this.addChild(shiguanjia,9);
		var shiguanjia1 = new cc.Sprite("#rack2.png");
		shiguanjia1.setPosition(cc.p(240,310));
		this.addChild(shiguanjia1,11);
				
//		var sprite =new cc.Sprite("#bottle3.png");
//		sprite.setPosition(500,500);
//		this.addChild(sprite);
		
		var shiguan1 = new Shiguan(this,TAG_SHIGUAN1_NODE);
		shiguan1.setPosition(cc.p(140,380));
		var shiguan2 = new Shiguan(this,TAG_SHIGUAN2_NODE);
		shiguan2.setPosition(cc.p(180,380));
		var shiguan3 = new Shiguan(this,TAG_SHIGUAN3_NODE);
		shiguan3.setPosition(cc.p(220,380));
		var shiguan4 = new Shiguan(this,TAG_SHIGUAN4_NODE);
		shiguan4.setPosition(cc.p(260,380));
		var shiguan5 = new Shiguan(this,TAG_SHIGUAN5_NODE);
		shiguan5.setPosition(cc.p(300,380));
		var shiguan6 = new Shiguan(this,TAG_SHIGUAN6_NODE);
		shiguan6.setPosition(cc.p(340,380));
//		var show = new ShowTip(this,"1~3号试管中分别装" +
//				"\n有2ml 1%淀粉溶液，" +
//				"\n4~6号试管中分别装有" +
//				"\n1ml新鲜唾液淀粉酶溶液",25,cc.p(240,140),TAG_SHOW1);		
//		var beaker1 = new Beaker(this,TAG_BEAKER1_NODE);
//		beaker1.setPosition(cc.p(550,150));
//		var beaker2 = new Beaker(this,TAG_BEAKER2_NODE);
//		beaker2.setPosition(cc.p(750,150));
//		var beaker3 = new Beaker(this,TAG_BEAKER3_NODE);
//		beaker3.setPosition(cc.p(950,150));
		
		
	//	var lamp = new Lamp(this);
		//lamp.setPosition(cc.p(500,150));
	},
//	loadBeaker:function(pos){
//		var beaker = new Beaker(this);
//		this.loadInLib(beaker, pos,cc.p(750,160));
//		
//	},
//	loadDrop:function(pos){
//		var drop = new Drop(this);
//		this.loadInLib(drop, pos,cc.p(640,310));
//	},
	loadCylinder:function(pos){
		var action = gg.flow.flow.action;
		if(action == ACTION_DO1){
			var cylinder = new Cylinder(this,action);
			this.loadInLib(cylinder, pos, cc.p(750,180));
		} else if(action == ACTION_NONE){
			var cylinder = new Cylinder(this,action);
			this.loadInLib(cylinder, pos, cc.p(750,180));
			var shiguannode2 = this.getChildByTag(TAG_SHIGUAN2_NODE);
			var shiguan2= shiguannode2.getChildByTag(TAG_SHIGUAN2);
			shiguannode2.addwater(shiguan2,cc.p(shiguan2.width/2,60),TAG_WATER2,1);
			
			var shiguannode3 = this.getChildByTag(TAG_SHIGUAN3_NODE);
			var shiguan3= shiguannode3.getChildByTag(TAG_SHIGUAN3);
			shiguannode3.addwater(shiguan3,cc.p(shiguan3.width/2,60),TAG_WATER3,1);
		}
		
	},
	loadDrop1:function(pos){
          var drop = new Drop1(this);
          this.loadInLib(drop, pos, cc.p(900,400));
	},
	loadDrop2:function(pos){
		var drop = new Drop2(this);
		this.loadInLib(drop, pos, cc.p(900,400));
	},
	loadDrop3:function(pos){
		var drop = new Drop3(this);
		this.loadInLib(drop, pos, cc.p(750,120));
	},
	loadShuiyu:function(pos){			
		var beaker1 = new Beaker(this,TAG_BEAKER1_NODE);
		beaker1.setPosition(pos);
		var seq = cc.sequence(cc.moveTo(1,cc.p(550,150)),cc.callFunc(function(){
			this.flowNext();
		},this));
		beaker1.runAction(seq);

		var beaker2 = new Beaker(this,TAG_BEAKER2_NODE);
		beaker2.setPosition(pos);
		beaker2.runAction(cc.moveTo(1,cc.p(750,150)));
		
		var beaker3 = new Beaker(this,TAG_BEAKER3_NODE);
		beaker3.setPosition(pos);
		beaker3.runAction(cc.moveTo(1,cc.p(950,150)));
		
		var shiguannode5 = this.getChildByTag(TAG_SHIGUAN5_NODE);
		var shiguan5= shiguannode5.getChildByTag(TAG_SHIGUAN5);
		shiguannode5.addwater(shiguan5,cc.p(shiguan5.width/2,30),TAG_WATER5,1);

		var shiguannode6 = this.getChildByTag(TAG_SHIGUAN6_NODE);
		var shiguan6= shiguannode6.getChildByTag(TAG_SHIGUAN6);
		shiguannode6.addwater(shiguan6,cc.p(shiguan6.width/2,30),TAG_WATER6,1);
		
		var show = new ShowTip(this,"1~3号试管中分别装" +
		"\n有2ml 1%淀粉溶液，" +
		"\n4~6号试管中分别装有" +
		"\n1ml新鲜唾液淀粉酶溶液",25,cc.p(240,140),TAG_SHOW1);	

		
	},
	loadInLib:function(obj, pos, tarPos,delay){
		obj.setPosition(pos);
		if(delay == null){
			delay = 1;
		}
		var ber = $.bezier(pos, tarPos, delay);
		var seq = cc.sequence(ber, this.callNext);
		obj.runAction(seq);
	},
	kill:function(obj){
		var fade = cc.fadeTo(0.5,0);
		var func = cc.callfunc(function(){
			obj.removeFromParent(true);
		},this);
		var seq = cc.sequence(fade,func);
		obj.runAction(seq)
	},
	
	callback:function (p){
		var func = cc.callFunc(this.actionDone, this);
		var action=gg.flow.flow.action;
		switch(p.getTag()){
		 
		}
	},
	actionDone:function(p){
		var func = cc.callFunc(this.actionDone, this);
		switch(p.getTag()){
		
		}
	},
	flowNext:function(){
		gg.flow.next();
	},
	onExit:function(){
		this._super();
		this.callNext.release();
		this.callKill.release();
	}
});