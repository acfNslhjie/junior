var AboutBackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.loadBg();
        this.loadAnim();
        return true;
    },
    loadBg : function(){
    	var node = new cc.Sprite("#about_bg.png");
        this.addChild(node);
        node.setPosition(gg.c_p);
    },
    loadAnim:function(){
    	var node = new cc.NodeGrid();
    	node.setPosition(320, 384);
    	this.addChild(node);
    	var logo = new cc.Sprite("#about_logo.png");
    	node.addChild(logo);
    	var plane = new cc.Sprite("#about_plane.png");
    	plane.setPosition(logo.width * 0.5, logo.height * 0.5);
    	logo.addChild(plane);
    	var repeat = cc.repeatForever(cc.rotateBy(3, 360));
    	plane.runAction(repeat);
    	
    	oo = node;
//    	cc.flipX3D(3.0)
//    	cc.pageTurn3D(3.0, cc.size(15, 10))
//    	cc.lens3D(3.0, cc.size(15, 10),cc.p(size.width / 2, size.height / 2), 240)
//    	cc.shaky3D(3.0, cc.size(15, 10), 5, false)
//    	cc.waves3D(3.0, cc.size(15, 10), 5, 40)
//    	cc.jumpTiles3D(3.0, cc.size(15, 10), 2, 30)
//    	cc.shakyTiles3D(3.0, cc.size(16, 12), 5, false)
//    	cc.wavesTiles3D(3.0, cc.size(15, 10), 4, 120)
    }
});