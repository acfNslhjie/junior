var TestMainLayer = cc.Layer.extend({
	cur:0,
	max:4,
    ctor:function () {
        this._super();
        this.init();
        return true;
    },
    init:function(){
    	this.cur = 0;
    	this.loadBack();
    	this.loadTip();
    	this.loadSubject();
    	
    },
    loadSubject:function(){
    	var url = res_test.subject;
//    	url = "http://teach-platform.oss-cn-hangzhou.aliyuncs.com/experiment/jsonLib/subject.json";
    	cc.loader.loadJson(url, function(err, json){
    		if(err != null){
    			cc.log("试题加载错误" + err);
    		} else {
    			gg.subject = json;
    			this.startTest();
    		}
    	}.bind(this));
    },
    loadTip:function(){
    	this.tip = new cc.LabelTTF("",gg.fontName,gg.fontSize);
    	this.tip.setColor(cc.color(0,0,0,0));
    	this.tip.setPosition(gg.width * 0.5, gg.height * 0.5)
    	this.addChild(this.tip);
    },
    startTest:function(){
    	this.cloud = new SelCloud(this, this.cur++);
    },
    questionNext:function(){
    	this.scheduleOnce(function(){
    		if(this.cur > this.max){
    			this.tip.setString("没有题目了");
    		} else {
    			this.cloud = new SelCloud(this, this.cur++);    		
    		}	
    	}, 0.5)
    },
    loadBack:function(){
    	var back = new Angel(this,"#test_back.png",function(){
    		$.runScene(new StartScene());
    	},this);
    	back.setPosition(10 + back.width * 0.5, 10 + back.height * 0.5);
    	back.setLocalZOrder(50);
    },
    callback:function(pSend){
    	switch(pSend){
	    	case this.restart:
	    		cc.log("重新开始");
	    		_.stop();
	    		$.runScene(new StartScene());
	    		break;
    	}
    }
});
