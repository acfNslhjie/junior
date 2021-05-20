TAG_YINDAO = 1001;
TAG_SHIZHAN = 1002;
TAG_QUWEI = 1003;
TAG_QITA = 1004;
TAG_ABOUT = 1401;
TAG_TEST = 1402;
TAG_LIANX = 1403;
TAG_YUANL = 1404;
TAG_MUDE = 1405;
TAG_DTL = 1406;

var StartMainLayer = cc.Layer.extend({
	lead:null,
	real:null,
	ctor:function () {
		this._super();
		// 加载菜单栏
		this.loadMenu();
		// 加载菜单栏按钮
		this.loadButton();
		// 加载二级菜单按钮
		this.loadQiTa();
		//	this.loadVersion();
		return true;
	},
	loadMenu:function(){
		var menuBg = new cc.Sprite("#menuBg.jpg")
		menuBg.setPosition(gg.c_width, 26);
		this.addChild(menuBg,5);
	},
	qitaHeight:0,
	qitaWidth:0,
	loadButton:function(){
		this.buttonBg = new cc.Sprite("#cell.png");
		this.buttonBg.setVisible(false);
		this.addChild(this.buttonBg,5);

		var b1y = 24;
		var yinD = new Angel(this,"#YinD.png",this.callback);
		yinD.setLocalZOrder(5);
		yinD.setPosition(142 + yinD.width * 0.5,b1y);
		yinD.setTag(TAG_YINDAO);

		var Shiz = new Angel(this,"#Shiz.png",this.callback);
		Shiz.setLocalZOrder(5);
		Shiz.setPosition(416 + Shiz.width * 0.5,b1y);
		Shiz.setTag(TAG_SHIZHAN);

		var Quw = new Angel(this,"#Quw.png",this.callback);
		Quw.setPosition(690 + Quw.width * 0.5,b1y);
		Quw.setLocalZOrder(5);
		Quw.setTag(TAG_QUWEI);

		var QiTa = new Angel(this,"#QiTa.png",this.callback);
		QiTa.setPosition(964 + QiTa.width * 0.5,b1y);
		QiTa.setTag(TAG_QITA);
		QiTa.setLocalZOrder(5);
		this.qitaHeight = QiTa.height;
		this.qitaWidth = 964 + QiTa.width * 0.5;
	},
	loadQiTa:function(){
		this.qita = new cc.Sprite("#DianjiK.png");
		this.qita.setPosition(this.qitaWidth, this.qitaHeight + this.qita.height * 0.5 - this.qita.height);
		this.addChild(this.qita);

		var about = new Angel(this.qita,"#GuanY.png",this.callback,this);
		about.hoverName = "GuanY_Sel.png";
		about.setTag(TAG_ABOUT);
		about.setPosition(about.width * 0.5,about.height * 0.5+40);
		var test = new Angel(this.qita,"#CeShi.png",this.callback,this);
		test.hoverName = "CeShi_Sel.png";
		test.setTag(TAG_TEST);
		test.up(about);
//		var lianxi = new Angel(this.qita,"#LianX.png",this.callback,this);
//		lianxi.hoverName = "LianX_Sel.png";
//		lianxi.setTag(TAG_LIANX);
//		lianxi.up(test);
		var yuanli = new Angel(this.qita,"#YuanL.png",this.callback,this);
		yuanli.hoverName = "YuanL_Sel.png";
		yuanli.setTag(TAG_YUANL);
		yuanli.up(test);
		var mude = new Angel(this.qita,"#MuDe.png",this.callback,this);
		mude.hoverName = "MuDe_Sel.png";
		mude.setTag(TAG_MUDE);
		mude.up(yuanli);
		gg.qita = this.qita;

		this.win = new cc.Sprite("#axiom.png");
		this.win.setAnchorPoint(1, 0);
		this.win.setOpacity(0);
		this.qita.addChild(this.win, 10);
	},
	qitaFlag:false,
	showQiTa:function(){
		if(this.qitaFlag){
			return;
		}
		this.qitaFlag = true;
		var move = cc.moveBy(0.3,cc.p(0,this.qita.height-30));
		this.qita.runAction(move);
	},
	hiddenQiTa:function(){
		if(this.qitaFlag){
			this.qitaFlag = false;
			this.win.runAction(cc.fadeOut(0.3));
			var move = cc.moveBy(0.3,cc.p(0,-this.qita.height));
			this.qita.runAction(move);
		}
	},
	cWin:function(name){
		if(name == null || name == ""){
			this.win.runAction(cc.fadeOut(0.15));	
			return;
		}
		var seq = cc.sequence(cc.fadeOut(0.15),cc.callFunc(function(){
			this.win.setSpriteFrame(name);
		}, this),cc.fadeIn(0.15));
		this.win.runAction(seq);
	},
	loadVersion : function(){
		var version = new cc.LabelTTF(gg.version, gg.fontName, gg.fontSize);
		version.setColor(cc.color(0,0,0,0));
		version.setPosition(gg.width - version.width - 10, gg.height - version.height * 0.5 -10);
		this.addChild(version);
	},
	callback:function(pSend){
		switch(pSend.getTag()){
		case TAG_YINDAO:
			cc.log("进入引导模式");
			gg.teach_type = TAG_LEAD;
			this.buttonBg.setVisible(true);
			this.buttonBg.setPosition(pSend.getPosition());
			this.hiddenQiTa();
			this.runNext(pSend.getTag());
			break;
		case TAG_SHIZHAN:
			cc.log("进入实战模式");
			gg.teach_type = TAG_REAL;
			this.buttonBg.setVisible(true);
			this.buttonBg.setPosition(pSend.getPosition());
			this.hiddenQiTa();
			this.runNext(pSend.getTag());
			break;
		case TAG_QUWEI:
			cc.log("进入小游戏模式");
			this.buttonBg.setVisible(true);
			this.buttonBg.setPosition(pSend.getPosition());
			this.runNext(pSend.getTag());
			this.hiddenQiTa();
			break;
		case TAG_QITA:
			cc.log("其他");
			this.showQiTa();
			this.buttonBg.setVisible(true);
			this.buttonBg.setPosition(pSend.getPosition());
			break;
		case TAG_ABOUT:
			this.checkSel(pSend.getTag());
			this.runNext(pSend.getTag());
			break;
		case TAG_TEST:
			this.cWin("");
			this.checkSel(pSend.getTag());
			this.runNext(pSend.getTag());
			break;
		case TAG_LIANX:
			this.cWin("");
			this.checkSel(pSend.getTag());
			break;
		case TAG_YUANL:
			this.cWin("axiom.png");
			this.checkSel(pSend.getTag());
			break;
		case TAG_MUDE:
			this.cWin("target.png");
			this.checkSel(pSend.getTag());
			break;
			break;
		}
	},
	checkFlag: 0,
	checkSel:function(tag){
		if(this.checkFlag != tag){
			var prev = this.qita.getChildByTag(this.checkFlag);
			if(prev != null){
				prev.setSpriteFrame(prev.normalName);
			}
			this.checkFlag = tag
		}
		var cur = this.qita.getChildByTag(tag);
		cur.setSpriteFrame(cur.hoverName);
	},
	runNext:function(tag){
		switch(tag){
		case TAG_YINDAO:
		case TAG_SHIZHAN:
			if(gg.run_load){
				$.runScene(new RunScene());
				return;
			}
			break;
		case TAG_QUWEI:
			if(gg.game_load){
				$.runScene(new GameScene());
				return;
			}
			break;
		case TAG_TEST:
			if(gg.game_load && gg.test_load){
				$.runScene(new TestScene());
				return;
			}
			break;
		case TAG_ABOUT:
			if(gg.about_load){
				$.runScene(new AboutScene());
				return;
			}
			break;
		}
		if(this.tip == null){
			this.tip = new cc.LabelTTF("加载中，请稍候再试",gg.fontName,gg.fontSize);
			this.tip.setColor(cc.color(0,0,0,0));
			this.tip.setPosition(gg.width * 0.5, gg.height * 0.5)
			this.addChild(this.tip);
		} else {
			this.tip.setVisible(true);
		}
		this.scheduleOnce(function(){
			this.tip.setVisible(false);	
		}.bind(this), 1.5);
	}
});
