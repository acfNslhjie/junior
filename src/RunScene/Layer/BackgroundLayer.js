var RunBackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.loadBg();
        return true;
    },
    loadBg : function(){
    	var node = new cc.Sprite("#run_back.png");
        this.addChild(node);
        node.setPosition(gg.c_p);
    	
    }
});