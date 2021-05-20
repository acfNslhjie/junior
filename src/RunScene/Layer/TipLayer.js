var TipLayer = cc.Layer.extend({
	scene:null,
	tip:null,
	time:null,
	score:null,
	flash:null,
	tip_frame:null,
	up_button:null,
	down_button:null,
	rotateAction:null,
	ctor:function (parent) {
		this._super();
		this.scene = parent;
		this.scene.addChild(this, 30);
		this.init();
	},
	init: function (){
		// 引导标记
		this.arr = new Arrow(this);
		this.addChild(this.arr, 100);
		
		this.menu = new cc.Menu();
		this.tip = new Tip("", gg.width * 0.85);
		this.flash = new Flash("", gg.width * 0.6);
		this.tipItem = new cc.MenuItemImage("#button/tip.png","#button/tip.png",this.eventMenuCallback,this);
		this.up_button = new cc.MenuItemImage("#button/up.png","#button/up.png",this.eventMenuCallback,this);
		this.down_button = new cc.MenuItemImage("#button/down.png","#button/down.png",this.eventMenuCallback,this);
		this.backItem = new cc.MenuItemImage("#button/back.png","#button/back.png",this.eventMenuCallback,this);
		this.musicItem = new cc.MenuItemImage("#button/music1.png","#button/music1.png",this.eventMenuCallback,this);
		this.tip_frame= new TipFrame(this);
		this.time = new cc.LabelTTF("", gg.fontName, gg.fontSize);
		this.score = new cc.LabelTTF("分数：0", gg.fontName, gg.fontSize);
		
		this.tip.setPosition(gg.width * 0.05, 10);
		this.flash.setPosition(300, 620);
		this.menu.setPosition(0, 0);
		this.tipItem.setPosition(gg.width - this.tipItem.width * 0.5 - 10, gg.height - this.tipItem.height * 0.5 - 10);
		this.musicItem.setPosition(gg.width - this.tipItem.width * 0.5 - 10, gg.height - this.tipItem.height - this.musicItem.height * 0.5 - 20);
		this.tip_frame.setPosition(gg.width, 0);
		
		this.time.setPosition(10, gg.height - 10);
		this.time.setAnchorPoint(0, 1);
		this.time.setColor(cc.color(0,0,0,0));
		this.score.setPosition(10, gg.height - 40);
		this.score.setAnchorPoint(0, 1);
		this.score.setColor(cc.color(0,0,0,0));

		this.up_button.setPosition(this.tipItem.x,this.tipItem.y - this.up_button.height - 10);
		this.down_button.setPosition(this.up_button.x,this.up_button.y - this.down_button.height - 10);
		this.up_button.setVisible(false);
		this.down_button.setVisible(false);
		this.backItem.setPosition(gg.width - this.backItem.width * 0.5 - 10, this.backItem.height * 0.5 + 10);
		
		this.menu.addChild(this.tipItem, 1, TAG_TIP);
		this.menu.addChild(this.up_button, 1, TAG_UP_BUTTON);
		this.menu.addChild(this.down_button, 1, TAG_DOWN_BUTTON);
		this.menu.addChild(this.backItem, 1, TAG_CLOSE);
		this.menu.addChild(this.musicItem, 1, TAG_MUSIC);
		this.addChild(this.menu, 11);
		this.addChild(this.tip, 10);
		this.addChild(this.flash, 10);
		this.addChild(this.tip_frame, 200);
		this.addChild(this.time, 12);
		this.addChild(this.score, 12);
		
		if(gg.teach_type == TAG_LEAD){
		} else {
			this.tip.setVisible(false);
		}
		this.updateTime();
		this.schedule(this.updateTime, 1);
		
		this.rotateAction = cc.repeatForever(cc.rotateBy(2, 360));
		this.rotateAction.retain();// jsb BUG
		if(!_.isStop()){
			this.musicItem.setNormalSpriteFrame("#button/music2.png");
			this.musicItem.setSelectedSpriteFrame("#button/music2.png");
			this.musicItem.runAction(this.rotateAction);
		} 
		
		gg.tip_layer = this;
		this.tip_frame.loadSlide();
	},
	sayFlash:function(str){
		this.flash.doFlash(str);
	},
	updateTime:function(){
		var now = new Date();
		var ds = Math.round((now - gg.begin_time) / 1000);
		this.time.setString("计时：" + ds + "秒");
		this.updateScore();
	},
	updateScore:function(){
		this.score.setString("分数：" + gg.score);
	},
	over:function(){
		this.unschedule(this.updateTime);
		gg.end_time = new Date();
	},
	eventMenuCallback: function(pSender) {
		switch (pSender.getTag()){
		case TAG_TIP:
			if(this.tip_frame.isOpen()){
				cc.log("关闭提示");
				gg.synch_l = false;
				gg.logo_onclick = true;
				this.tip_frame.close();
				this.up_button.setVisible(false);
				this.down_button.setVisible(false);
				this.backItem.setVisible(true);
				this.musicItem.setVisible(true);
				this.menu.setPosition(0, 0);
			} else {
				cc.log("打开提示");
				gg.synch_l = true;
				gg.logo_onclick = false;
				this.tip_frame.refresh();
				this.tip_frame.open();
				this.up_button.setVisible(true);
				this.down_button.setVisible(true);
				this.backItem.setVisible(false);
				this.musicItem.setVisible(false);
				this.menu.setPosition(-0.5*gg.width + this.tipItem.width + 15 - 100,0);
				
				// 定位帮助信息
				var step = gg.flow.getStep();
				this.tip_frame.local(step);
				gg.score -= 1;
			}
			break;
		case TAG_MUSIC:
			if(_.isStop()){
				_.cResume();
				this.musicItem.setNormalSpriteFrame("#button/music2.png");
				this.musicItem.setSelectedSpriteFrame("#button/music2.png");
				this.musicItem.runAction(this.rotateAction);
			} else {
				_.cPause();
				this.musicItem.setNormalSpriteFrame("#button/music1.png");
				this.musicItem.setSelectedSpriteFrame("#button/music1.png");
				this.musicItem.stopAction(this.rotateAction);
				this.musicItem.setRotation(0);
			}
			break;
		case TAG_UP_BUTTON:
			this.tip_frame.up();
			break;
		case TAG_DOWN_BUTTON:
			this.tip_frame.down();
			break;
		case TAG_CLOSE:
			$.runScene(new StartScene());
			break;
		default:
			break;
		}
	}
});