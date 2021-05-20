Clock = cc.Sprite.extend({
	point:null,
	ctor:function (parent) {
		this._super("#tool/clock.png");
		parent.addChild(this, 1000);
		this.init();
	},
	init:function () {
		this.setPosition(gg.width * 0.5, gg.height * 0.7);
		this.setVisible(false);
		this.point = new cc.Sprite("#tool/point.png");
		this.point.setPosition(this.width * 0.5, this.height * 0.5);
		this.addChild(this.point);
		this.action = cc.repeatForever(cc.rotateBy(2,360));
		this.action.retain();
	},
	doing:function () {
		this.setVisible(true);
		_.clock();
		this.point.runAction(this.action);
	},
	stop:function () {
		this.setVisible(false);
		_.stopClock();
		this.point.stopAllActions();
		if(this.tip != null){
			this.tip = null;
		}
	},
	loadTip:function(fileName){
		this.tip = new cc.Sprite(fileName);
		this.tip.setAnchorPoint(0, 0.5);
		this.tip.setPosition(100, 153);
		this.addChild(this.tip);
	},
	doTime:function(time,delay){
		if(delay != null){
			this.scheduleOnce(function(){
				this.doing();
			},delay);	
		} else {
			delay = 0;
			this.doing();
		}
		this.scheduleOnce(function(){
			this.stop();
			gg.flow.next();
		},(time + delay));
	}
})