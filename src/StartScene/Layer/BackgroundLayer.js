var StartBackgroundLayer = cc.LayerColor.extend({
	zindex:5,
    ctor:function () {
        this._super();
        this.loadBg();
        this.loadQ1();
        this.loadQ2();
        this.loadR1();
        this.loadR2();
        this.loadR3();
        this.loadCloud();
        this.loadPlane();
        this.loadTitle();
        this.loadWosai();
//        this.loadLogo();
        return true;
    },
    loadBg : function(){
    	this.setColor(cc.color(111,111,111));
        var node = new cc.Sprite("#back.jpg");
        dd = node;
        this.addChild(node);
        node.setPosition(gg.c_p);
    },
    loadQ1:function(){
    	this.schedule(function(){
    		var bubble = new Bubble(this,"#q1.png");
    		bubble.setLocalZOrder(this.zindex);
    		bubble.setPosition(280, 260);
    		bubble.up();
    	}, 0.25);
    },
    loadQ2:function(){
    	this.schedule(function(){
    		var bubble = new Bubble(this,"#q2.png");
    		bubble.setPosition(500, 250);
    		bubble.setLocalZOrder(this.zindex);
    		bubble.up();
    	}, 0.25);
    },
    loadR1:function(){
    	var r1 = new cc.Sprite("#r1.png");
    	r1.setPosition(60, 350);
    	r1.setOpacity(120);
    	this.addChild(r1,this.zindex);
    	var func1 = cc.callFunc(function(){
    		this.removeFromParent(true);    		
    	}.bind(r1),this);
    	var func2 = cc.callFunc(function(){
    		this.loadR1();    		
    	}.bind(this),this);
    	// 贝尔移动
    	var bezier1 = [cc.p(200, 500), cc.p(30, 600), cc.p(60, 900)];
    	var bezierTo1 = cc.bezierTo(6, bezier1);
    	var seq = cc.sequence(bezierTo1,func1,func2);
    	r1.runAction(seq);
    	// 摇摆
    	r1.setRotation(-5);
    	var rotate1 = cc.rotateBy(1,10);
    	var rotate2 = cc.rotateBy(1,-10);
    	var rotaSeq = cc.sequence(rotate1, rotate2);
    	var rep = cc.repeatForever(rotaSeq);
    	r1.runAction(rep)
    },
    loadR2:function(){
    	var r2 = new cc.Sprite("#r2.png");
    	r2.setPosition(800, 350);
    	this.addChild(r2,this.zindex);
    	var func1 = cc.callFunc(function(){
    		this.removeFromParent(true);    		
    	}.bind(r2),this);
    	var func2 = cc.callFunc(function(){
    		this.loadR2();    		
    	}.bind(this),this);
    	var bezier1 = [cc.p(750, 500), cc.p(820, 650), cc.p(860, 900)];
    	var bezierTo1 = cc.bezierTo(8, bezier1);
    	var seq = cc.sequence(bezierTo1,func1,func2);
    	r2.runAction(seq);
    	// 摇摆
    	r2.setRotation(-5);
    	var rotate1 = cc.rotateBy(1,10);
    	var rotate2 = cc.rotateBy(1,-10);
    	var rotaSeq = cc.sequence(rotate1, rotate2);
    	var rep = cc.repeatForever(rotaSeq);
    	r2.runAction(rep)
    },
    loadR3:function(){
    	var r3 = new cc.Sprite("#r3.png");
    	r3.setPosition(250, 350);
    	this.addChild(r3,this.zindex);
    	var func1 = cc.callFunc(function(){
    		this.removeFromParent(true);    		
    	}.bind(r3),this);
    	var func2 = cc.callFunc(function(){
    		this.loadR3();    		
    	}.bind(this),this);
    	var bezier1 = [cc.p(200, 500), cc.p(270, 650), cc.p(310, 900)];
    	var bezierTo1 = cc.bezierTo(12, bezier1);
    	var seq = cc.sequence(bezierTo1,func1,func2);
    	r3.runAction(seq);
    	// 摇摆
    	r3.setRotation(-5);
    	var rotate1 = cc.rotateBy(1,10);
    	var rotate2 = cc.rotateBy(1,-10);
    	var rotaSeq = cc.sequence(rotate1, rotate2);
    	var rep = cc.repeatForever(rotaSeq);
    	r3.runAction(rep)
    },
    loadCloud:function(){
    	var cloud = new cc.Sprite("#cloud.png");
    	cloud.setPosition(1050,320);
    	this.addChild(cloud, this.zindex + 1);
    	var move1 = cc.moveBy(10,cc.p(-230, 0));
    	var move2 = cc.moveBy(10,cc.p(230, 0));
    	var seq = cc.sequence(move1,move2);
    	var rep = cc.repeatForever(seq);
    	cloud.runAction(rep);
    	
    	var cloud2 = new cc.Sprite("#cloud.png");
    	cloud2.setPosition(850,360);
    	cloud2.setScale(0.6);
    	cloud2.setLocalZOrder(-1);
    	this.addChild(cloud2, this.zindex - 1);
    	var move3 = cc.moveBy(10,cc.p(200, 0));
    	var move4 = cc.moveBy(10,cc.p(-200, 0));
    	var seq2 = cc.sequence(move3,move4);
    	var rep2 = cc.repeatForever(seq2);
    	cloud2.runAction(rep2);
    },
    loadPlane:function(){
    	var plane = new cc.Sprite("#plane.png");
    	plane.setPosition(1350, 650);
    	plane.setScale(0.4);
    	this.addChild(plane, 6);
    	
    	var func1 = cc.callFunc(function(){
    		this.removeFromParent(true);    		
    	}.bind(plane),this);
    	var func2 = cc.callFunc(function(){
    		this.loadPlane();	
    	}.bind(this),this);
    	
    	var bezier1 = [cc.p(800, 600),cc.p(500, 700),cc.p(-50, 400)];
    	var bezierTo1 = cc.bezierTo(10, bezier1);
    	var seq = cc.sequence(bezierTo1,func1,func2);
    	plane.runAction(seq);
    	
    	// 摇摆
    	plane.setRotation(-5);
    	var rotate1 = cc.rotateBy(3,10);
    	var rotate2 = cc.rotateBy(3,-10);
    	var rotaSeq = cc.sequence(rotate1, rotate2);
    	var rep = cc.repeatForever(rotaSeq);
    	plane.runAction(rep)
    	
    	// 放大
    	var scale = cc.scaleTo(10, 1);
    	plane.runAction(scale);
    },
    loadTitle:function(){
    	var title = new cc.Sprite(res_start.title);
    	title.setPosition(title.width * 0.5, gg.height - title.height * 0.5);
    	this.addChild(title,10);
    },
    loadLogo:function(){
    	var logo = new cc.Sprite(res_start.logo);
    	logo.setAnchorPoint(0, 1);
    	logo.setPosition(10, gg.height - 10);
    	this.addChild(logo, 10);
    },
    loadWosai:function(){
    	var wosai  = new cc.Sprite(res_start.wosai);
    	wosai.setPosition(gg.width - 10, gg.height -10);
    	wosai.setAnchorPoint(1,1);
    	this.addChild(wosai);
    }
});