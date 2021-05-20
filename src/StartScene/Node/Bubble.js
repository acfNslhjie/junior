Bubble = cc.Sprite.extend({
	ctor:function(parent,fileName){
		this._super(fileName);
		parent.addChild(this);
	},
	up:function(){
		this.setScale(0.5);
		var func = cc.callFunc(function(){
			this.removeFromParent(true);    		
		}.bind(this),this);
		var x = this.getPositionX();
		var y = this.getPositionY();
		var margin = 60;
		var bezier1 = [cc.p(x - margin, y + 80), cc.p(x + margin, y + 120), cc.p(x, y + 150)];
		var bezier2 = [cc.p(x + margin, y + 80), cc.p(x - margin, y + 120), cc.p(x, y + 150)];
		var bezier3 = [cc.p(x, y + 80), cc.p(x + margin, y + 120), cc.p(x - margin, y + 150)];
		var cell = 0.5;
		var bezierTo1 = cc.bezierTo(cell, bezier1);
		var random = $.getRandom(99);
		if(random%3 == 0){
			bezierTo1 = cc.bezierTo(cell, bezier1);
// one.setColor(cc.color(255,0,0));
		} else if(random%3 == 1){
			bezierTo1 = cc.bezierTo(cell, bezier2);
// one.setColor(cc.color(0,255,0));
		} else if(random%3 == 2){
			bezierTo1 = cc.bezierTo(cell, bezier3);
// one.setColor(cc.color(0,0,255));
		}
		var fadeTo1 = cc.fadeTo(cell * 0.5, 255);
		var fadeTo2 = cc.fadeTo(cell * 0.5, 0);
		var scale = cc.scaleTo(cell, 1);
		var fadeSeq = cc.sequence(fadeTo1, fadeTo2);
		var spaw = cc.spawn(bezierTo1,fadeSeq,scale);
		var seq = cc.sequence(spaw,func);
		this.runAction(seq);
	}
});