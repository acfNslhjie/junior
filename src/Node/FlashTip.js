var FlashTip = cc.LabelTTF.extend({
	ctor:function (parent, str, fontName, fontSize) {
		this._super(str, fontName, fontSize);
		this.setColor(cc.color(0, 0, 0));
		parent.addChild(this);
		
	},
	doFlash:function(str, color){
		if(color != null){
			this.setColor(color);	
		}
		this.setString(str);
		this.scheduleOnce(function(){
			this.setString("");	
		}.bind(this), 1.5);
	}
});