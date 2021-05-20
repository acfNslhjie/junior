var GameBackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.loadBg();
        return true;
    },
    loadBg : function(){
    	var node = new cc.Sprite("#game_bg.png");
        this.addChild(node);
        node.setAnchorPoint(0, 1);
        node.setPosition(0, gg.height);
    }
});