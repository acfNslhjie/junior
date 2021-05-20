/**
 * 文字自带边框的实体
 */
ShowTip1 = cc.Node.extend({
	ctor:function(parent,str,font,pos,wid,hei,str1,delay){
		this._super();
		ll.run.addChild(this,1000,TAG_SHOW);
		this.setCascadeOpacityEnabled(true);
		this.init(str,font,pos,wid,hei,str1,delay);
	},
	init:function(str,font,pos,wid,hei,str1,delay){		
		var bg = new cc.Scale9Sprite(res_start.show_tip);
		var content = new cc.LabelTTF(str, gg.fontName, font);
		content.setColor(cc.color(0, 0, 0));
		content.setPosition(pos.x,pos.y+2*font/3);
		this.addChild(bg);
		this.addChild(content,2);
		
		var gongshi = new cc.Sprite(str1);
		gongshi.setPosition(pos.x,pos.y-2*font/3);
		this.addChild(gongshi,2);
		
		var mr = 10;

		bg.width = wid;
		bg.height = hei;
		bg.setPosition(pos);

		if(delay == null){
			delay = 2;      
		}
//		this.step=gg.flow.step+1;
//		this.schedule(this.kill,1,100,delay);
		//this.schedule(this.kill,delay);
	},
	kill:function(){
		if (ll.run.getChildByTag(TAG_SHOW) != null){
			var seq = cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){

				this.removeFromParent(true);



			}, this))
			this.runAction(seq);
		}

	}
})