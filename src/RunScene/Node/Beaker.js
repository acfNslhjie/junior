Beaker = cc.Node.extend({
	labelTag:0,
	ctor:function(parent,tag){
		this._super();
		parent.addChild(this,12,tag);
		this.init(tag);
	},
	init:function(tag){
		var name = "";
		if (TAG_BEAKER1_NODE == tag){
			var beaker = new cc.Sprite("#beaker1.png");
			beaker.setPosition(cc.p(0,0));
			this.addChild(beaker,1,TAG_BEAKER_WATER);
			//beaker.setScale(2);
			name = "0℃";
			this.addlable(beaker, name);
			this.addwater(beaker,cc.p(beaker.width/2,90),TAG_WATER);
		}
		else if (TAG_BEAKER2_NODE == tag){
			var beaker = new cc.Sprite("#beaker1.png");
			beaker.setPosition(cc.p(0,0));
			this.addChild(beaker,1,TAG_BEAKER_WATER);
		//	beaker.setScale(2);
			name = "37℃";
			this.addlable(beaker, name);
			this.addwater(beaker,cc.p(beaker.width/2,90),TAG_WATER);
		}
		else if (TAG_BEAKER3_NODE == tag){
			var beaker = new cc.Sprite("#beaker1.png");
			beaker.setPosition(cc.p(0,0));
			this.addChild(beaker,1,TAG_BEAKER_WATER);
			//beaker.setScale(2);
			name = "60℃";
			this.addlable(beaker, name);
			this.addwater(beaker,cc.p(beaker.width/2,90),TAG_WATER);
		}
		
		this.setCascadeOpacityEnabled(true);
		//shiguan.setCascadeOpacityEnabled(true);

//		var label = new cc.LabelTTF(name,gg.fontName,12);
//		label.setColor(cc.color(0,0,0));
//		label.setPosition(shiguan.width*0.5,shiguan.height*0.8);
//		shiguan.addChild(label);

	},
	addlable:function(obj,name){
		var label = new cc.LabelTTF(name,gg.fontName,25);
		label.setColor(cc.color(0,0,0));
		label.setPosition(obj.width*0.5,50);
		obj.addChild(label);	
	},
	addwater:function(obj,pos,tag){
		var water = new cc.Sprite("#cly_line1.png");
		water.setPosition(pos.x+3,pos.y);
		water.setScale(2.2,1.5);
		obj.addChild(water,1,tag);
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
		}
	},
	flowNext:function(){
		gg.flow.next();
	},


});