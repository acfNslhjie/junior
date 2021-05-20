var FinishMainLayer = cc.Layer.extend({
	lead:null,
	real:null,
    ctor:function () {
        this._super();
        this.loadFire();
        this.loadTip();
        return true;
    },
    loadFire: function(){
    	new FireWork(this);
    },
    loadTip: function(){
    	this.tip = new Tip("恭喜过关", gg.width * 0.85);
    	this.addChild(this.tip, 10);
    	this.tip.runAction(
			cc.spawn(
				cc.moveTo(2, cc.p(gg.width * 0.5 - this.tip.width, gg.height * 0.5)),
				cc.tintTo(2,231,64,25),
				cc.scaleTo(2,2)
			)
    	);
    	_.over();
    	this.scheduleOnce(function(){
    		this.loadStartButton();
    		this.loadStartButtonParticle();
    	},3);
    },
    loadStartButton : function(){
        this.restart = new cc.MenuItemImage(
        		"#finish_restart1.png",
        		"#finish_restart2.png",
            this.callback,this);
        this.restart.setPosition(gg.width * 0.5, gg.height * 0.4);
        var menu = new cc.Menu();
        this.addChild(menu);
        menu.setPosition(0, 0);
        menu.addChild(this.restart);
    },
    loadStartButtonParticle : function(){
    	var restart_node = new cc.ParticleSystem(res_start.follow_p);
    	this.addChild(restart_node);
    	restart_node.setPosition(this.restart.x - this.restart.width / 2, this.restart.y - this.restart.height / 2);
    	var action = this.getFollowAction(10, this.restart);
    	restart_node.runAction(action);
    },
    getFollowAction : function(stretch, node){
        var width = node.width;
        var height = node.height;

        var bezier1 = [cc.p(-stretch, 0), cc.p(-stretch, height), cc.p(0, height)];
        var bezierBy1 = cc.bezierBy(0.6, bezier1);
        var move1 = new cc.moveBy(0.7, cc.p(width, 0));

        var bezier2 = [cc.p(stretch, 0), cc.p(stretch, -height), cc.p(0, -height)];
        var bezierBy2 = cc.bezierBy(0.6, bezier2);
        var move2 = new cc.moveBy(0.7, cc.p(-width, 0));

        var action = cc.sequence(bezierBy1, move1, bezierBy2, move2).repeatForever();
        return action;
    },
    callback:function(pSend){
    	switch(pSend){
	    	case this.restart:
	    		gg.synch_l = false;
	    		cc.log("重新开始");
	    		_.stop();
	    		$.runScene(new StartScene());
	    		break;
    	}
    }
});
