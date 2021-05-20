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
    	var root = new cc.NodeGrid();
    	root.setPosition(930, -50);
    	root.setAnchorPoint(0.5, 1);
    	this.addChild(root, 10);
    	var prev = null;
    	var mg = 150;
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
    	var height = root.getBoundingBoxToWorld().height;
    	var seq = cc.sequence(cc.moveBy(height * (100 - this.speed) / (gg.height + height - root.getPositionY()), 
    			cc.p(0, height + gg.height - root.getPositionY())),cc.callFunc(function(){
    			this.loadSteady(jsonObject.steady);
    	}, this));
    	root.runAction(seq);
    	root.runAction(cc.lens3D(1.0, cc.size(150, 100),cc.p(930, -50), 800)); 
    },
    loadSteady:function(jsonObject){
    	var steady = new cc.NodeGrid();
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
    			label.setFontSize(40);
    			if(prev != null){
    				label.down(prev, mg)
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
