var AboutMainLayer = cc.Layer.extend({
	speed: 1,
	ctor:function () {
        this._super();
        this.init();
        return true;
    },
    init:function(){
    	// 1 - 100之间
    	this.speed = 70;
    	this.loadAbout();
    	this.loadBack();
    },
    loadAbout:function(){
    	var url = res_about.about_j;
    	cc.loader.loadJson(url, function(err, json){
    		if(err != null){
    			cc.log("信息加载错误" + err);
    		} else {
    			this.startFlow(json);
    		}
    	}.bind(this));
    },
    startFlow:function(jsonObject){
    	var root = new cc.Node();
    	root.setPosition(930, gg.height * 0.7);
    	root.setAnchorPoint(0.5, 1);
    	root.setCascadeOpacityEnabled(true);
    	this.addChild(root, 10);
    	var prev = null;
    	var mg = 30;
    	var jsonFlow = jsonObject.flow;
    	for(var i in jsonFlow){
    		var json = jsonFlow[i];
    		var name = json.name;
    		var value = "";
    		if(json.value == null){
    		} else if(json.value instanceof Array){
    			for(var j in json.value){
    				value = value + " " + json.value[j];	
    			}
    		} else {
    			value = json.value;
    		}
    		if(name != null){
    			var middle = new LineLabel(root, "  :  ");	
    			if(prev != null){
    				middle.down(prev, mg)
    			}
    			prev = middle;
    			var left =  new LineLabel(root, name);
    			left.setAnchorPoint(1, 0.5);
    			left.left(middle,10);
    			var right =  new LineLabel(root, value);
    			right.setAnchorPoint(0, 0.5);
    			right.right(middle,10);
    		} else {
    			var valueL = new LineLabel(root, value);
    			if(prev != null){
    				valueL.down(prev, mg)
    			}
    			prev = valueL;
    		}
    	}
    	root.setOpacity(0);
    	var seq = cc.sequence(cc.fadeIn(0.5), cc.delayTime(10), cc.fadeOut(0.5), 
    		cc.callFunc(function(){
    			this.loadSteady(jsonObject.steady);
    	}, this));
    	root.runAction(seq);
    },
    loadSteady:function(jsonObject){
    	var steady = new cc.Node();
    	steady.setAnchorPoint(0.5, 0.5);
    	steady.setPosition(930, gg.height * 0.6);
    	steady.setCascadeOpacityEnabled(true);
    	this.addChild(steady, 10);
    	var prev = null;
    	var mg = 150;
    	for(var i in jsonObject){
    		var json = jsonObject[i];
    		var value = "";
    		for(var j in json.value){
    			value = value + " " + json.value[j];
    			var label = new LineLabel(steady, value);
    			if(prev != null){
    				label.down(prev, mg)
    				label.setFontSize(30);
    			} else {
    				label.setFontSize(40);
    			}
    			prev = label;
    		}
    	}
    	steady.setOpacity(0);
    	steady.runAction(cc.fadeIn(0.5));
    },
    loadBack:function(){
    	var back = new Angel(this,"#about_back.png",function(){
    		$.runScene(new StartScene());
    	},this);
    	back.setPosition(10 + back.width * 0.5, 10 + back.height * 0.5);
    	back.setLocalZOrder(50);
    },
    callback:function(pSend){
    	switch(pSend){
	    	case this.restart:
	    		cc.log("返回");
	    		$.runScene(new StartScene());
	    		break;
    	}
    }
});
