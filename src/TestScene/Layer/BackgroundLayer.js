var TestBackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.loadBg();
        return true;
    },
    loadBg : function(){
    	var node = new cc.Sprite("#test_bg.jpg");
        this.addChild(node);
        node.setPosition(gg.c_p);
    }
});