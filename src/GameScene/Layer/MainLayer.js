TAG_H1 = 1;
TAG_H2 = 2;
TAG_H3 = 3;
TAG_H4 = 4;
TAG_H5 = 5;
TAG_H6 = 6;
var hJson = [{tag:TAG_H1,image:"prop1.png",name:"量筒"},
            {tag:TAG_H2,image:"prop2.png",name:"胶头滴管"},
			{tag:TAG_H3,image:"prop3.png",name:"蒸发皿"},
			{tag:TAG_H4,image:"prop4.png",name:"表面皿"},
			{tag:TAG_H5,image:"prop5.png",name:"酒精灯"},
			{tag:TAG_H6,image:"prop6.png",name:"洗耳球"}]
var GameMainLayer = cc.Layer.extend({
	curScore:0,
	listTime:30,
	posArr:[],
	curHam:null,
	angelArr: [],
    ctor:function () {
        this._super();
        this.init();
        gg.game = this;
    },
    init:function(){
    	this.curScore = 0;
    	this.loadPos();
    	this.loadAngel();
    	this.loadCurtain();
    	this.loadBoard();
    	this.startGame();
    	this.loadBack();
    },
    startGame:function(){
    	this.listTime = 30;
    	this.curScore = 0;
    	this.loadScore();
    	this.loadTime();
    	this.schedule(this.showHamster, 1.5, this.listTime/1.5 - 1);
    },
    loadScore:function(){
    	if(this.score == null){
    		this.score = new cc.LabelTTF("分数：0分", gg.fontName, gg.fontSize);
    		this.score.setAnchorPoint(0, 1);
    		this.score.setPosition(200, gg.height - 10);
    		this.score.setColor(cc.color(0, 130, 21));
    		this.addChild(this.score);
    	}
    },
    loadTime:function(){
    	if(this.time == null){
    		this.time = new cc.LabelTTF("时间：" + this.listTime + "秒", gg.fontName, gg.fontSize);
    		this.time.setAnchorPoint(0, 1);
    		this.time.setPosition(10, gg.height - 10);
    		this.time.setColor(cc.color(0, 130, 21));
    		this.addChild(this.time);	
    	} else {
    		this.time.setString("时间："+ this.listTime +"秒");
    		this.updateScore();
    	}
    	this.schedule(function(){
    		this.time.setString("时间："+ --this.listTime +"秒");
    		if(this.listTime <= 0){
    			this.gameOver();	
    		}
    	}, 1, this.listTime - 1);
    },
    updateScore:function(){
    	this.score.setString("分数：" + this.curScore + "分");
    },
    loadBoard:function(){
    	var board = new cc.Sprite("#board.png");
    	board.setPosition(1100, 150);
    	this.addChild(board, 80);
    	
    	this.tip = new cc.LabelTTF("", gg.fontName, 40);
    	this.tip.setPosition(1100, 160);
    	this.addChild(this.tip, 90);
    },
    getTwoRan:function(max){
    	var ran = $.getRandom(max);
    	var ran2 = $.getRandom(max);
    	while(ran == ran2){
    		ran2 = $.getRandom(max);
    	}
    	return [ran,ran2];
    },
    showHamster:function(){
    	var ranArr1 = this.getTwoRan(this.angelArr.length);
    	var ranArr2 = this.getTwoRan(hJson.length);
    	this.angelArr[ranArr1[0]].go2(hJson[ranArr2[0]]);
    	this.angelArr[ranArr1[1]].go2(hJson[ranArr2[1]]);
    	this.curHam = hJson[ranArr2[0]];
    	this.showTip();
    },
    showTip:function(){
    	this.tip.setString(this.curHam.name);
    },
    loadPos:function(){
    	var posX = 435, posY = 205 - 70 + 38, mX = 180, mY = 90;
    	for(var i = 0; i < 6; i++){
   			this.posArr[i] = cc.p(posX,posY);
    		if(i % 3 == 2){
    			posX -= 2 * mX;
    			posY += mY;
    		} else {
    			posX += mX;	
    		}
    	}
    },
    loadAngel:function(){
    	var g = 20;
    	for(var i = 0; i <this.posArr.length; i++){
    		var hamster1 = new Hamster(this,
    				this.callback,i + 1, g);
    		hamster1.setPos(this.posArr[i]);
    		this.angelArr[i] = hamster1;
    		if(i == 2){
    			g = 10;
    		}
    	}
    },
    loadCurtain:function(){
    	var curtain1 = new cc.Sprite("#b1.png");
    	curtain1.setAnchorPoint(0, 0);
    	this.addChild(curtain1, 30);
    	
    	var curtain2 = new cc.Sprite("#b2.png");
    	curtain2.setAnchorPoint(0, 0);
    	curtain2.setPosition(0, 166);
    	this.addChild(curtain2, 15);
    },
    gameOver:function(){
    	if(this.over == null){
    		this.over = new cc.Sprite("#over.png");	
    		this.addChild(this.over, 200);
    		this.over.setPosition(gg.c_p);
    	}
    	this.over.setVisible(true);
    	var again = new Angel(this.over, "#again.png", function(){
    		this.over.setVisible(false);
    		this.startGame();
    	}, this);
    	again.setPosition(gg.c_width, gg.c_height - 50);
    },
    callback:function(p){
    	p.setEnable(false);
    	
    	p.hit();
    	cc.log(p.getTag());

    	if(this.curHam.tag == p.getTag()){
    		this.curScore += 10;	
    	} else {
    		this.curScore += 5;
    	}
    	this.updateScore();
    },
	loadBack:function(){
		var back = new Angel(this,"#game_back.png",function(){
			$.runScene(new StartScene());
		},this);
		back.setPosition(10 + back.width * 0.5, 10 + back.height * 0.5);
		back.setLocalZOrder(50);
	}
});

