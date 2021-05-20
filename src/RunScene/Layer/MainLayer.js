var RunMainLayer = cc.Layer.extend({
	lead:null,
	real:null,
    ctor:function () {
        this._super();
        this.loadTip();
        this.loadRun();
        this.loadTool();
        this.loadFlow();
        this.loadTV();    
        return true;
    },
    loadTV:function(){
    	tv = new cc.Sprite();
	tv.setColor(cc.color(66,110,75));
	tv.setTextureRect(cc.rect(0,0,560,220));
//    	tv.setColor(cc.color(20,40,50));
//    	tv.setTextureRect(cc.rect(0,0,1280,768));
    	tv.setPosition(640,595);
    	this.addChild(tv);

    	var self = this;
    	
    	
    	
// var url =
// "http://teach-platform.oss-cn-hangzhou.aliyuncs.com/head/sakura.jpg";
// cc.loader.loadImg(url, {isCrossOrigin : false }, function(err,img){
// if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
// tv.setTexture(url);
// } else {
// tv.initWithTexture(img);
// }
// });
    },
    loadTip:function(){
    	ll.tip = new TipLayer(this);
    },
    loadTool:function(){
    	ll.tool = new ToolLayer(this);
    },
    loadRun:function(){
    	ll.run = new RunLayer(this);
    },
    loadFlow:function(){
    	gg.flow.setMain(this);
    	gg.flow.start();
    },
    over: function (){
    	ll.tip.over();
    	this.scheduleOnce(function(){
    		$.runScene(new FinishScene());
    	},2);
    	// 提交成绩
    	net.saveScore();
    },
});
