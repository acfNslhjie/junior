Flash = cc.LabelTTF.extend({
	falg: false,
	d_width:null,
	ctor:function (text, width , dimensions, hAlignment, vAlignment) {
		this.d_width = width;
		text = $.format(text, this.d_width, gg.fontSize);
		this._super(text, gg.fontName, gg.fontSize, dimensions, hAlignment, vAlignment);
		this.setColor(new cc.Color(0, 0, 0, 0))
		this.setAnchorPoint(0, 0);
	},
	initFlash:function(){
		this.unscheduleAllCallbacks();
		this.stopAllActions();
		this.finish(this);
	},
	doFlash:/**
			 * 闪现提示
			 * 
			 * @param text
			 */
		function(text){
		this.initFlash();
		text = $.format(text,this.d_width, gg.fontSize);
		this.setString(text);
		this.finishFlash();
	},
	finishFlash:function(){
		this.scheduleOnce(function(){
			this.runAction(cc.sequence(
					cc.scaleTo(1, 0.3, 0.3),
					cc.callFunc(this.finish, this)));
			
			},2);
	},
	finish:function(flash){
		flash.setString("");
		flash.setScale(1);
	}
});