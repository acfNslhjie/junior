Drop3 = cc.Node.extend({
	ctor:function(p){
		this._super();
		p.addChild(this, 10, TAG_DROP_NODE);
		this.init();
	},
	init : function(){
		this.setCascadeOpacityEnabled(true);
		var bottle = new Button(this, 9, TAG_BOTTLE, "#bottle3.png",this.callback);
		var  lid  = new Button(this, 8, TAG_DROP, "#lid5.png",this.callback);
		lid.setPosition(0,45);
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
	callback:function(p){
		var action = gg.flow.flow.action;
		var func = cc.callFunc(this.actionDone, this);	
		switch(p.getTag()){	
		case TAG_DROP:
			
			
			
		}
	},
	flowNext:function(){

		gg.flow.next();
		cc.log("下一步"+gg.flow.flow.tag);
	}
});