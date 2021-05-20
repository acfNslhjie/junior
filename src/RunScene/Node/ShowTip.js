/**
 * 文字自带边框的实体
 */
ShowTip = cc.Node.extend({
	ctor:function(parent,str,font,pos,tag){
		this._super();
		if (tag==null){
			parent.addChild(this,1000,TAG_SHOW);
			}else{
				parent.addChild(this,1000,tag);
			}
		
		this.setCascadeOpacityEnabled(true);
		this.init(str,font,pos);
	},
	init:function(str,font,pos){		
		var content = new cc.LabelTTF(str, gg.fontName, font);
		content.setColor(cc.color(0, 0, 0));
		content.setPosition(pos);
		this.addChild(content,2);
		var mr = 10;
		var rect = content.getBoundingBoxToWorld();
		var bg = new cc.Scale9Sprite(res_start.show_tip);
		bg.width = rect.width + mr * 2;
		bg.height = rect.height + mr * 2;
		bg.setPosition(pos);
		this.addChild(bg);
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