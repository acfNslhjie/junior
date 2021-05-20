/**
 * 云窗口，
 */
Cloud = cc.Class.extend({
	scene: null,
	layer: null,
	tag: null,
	rootNode:null,
	ctor:function (parent) {
		this.layer = parent;
		this.scene = parent.getParent();
		this.init();
	},
	init:function (){
		this.rootNode = new cc.NodeGrid();
		this.layer.addChild(this.rootNode, 99);

		this.rootNode.setVisible(false);
		this.rootNode.setOpacity(0);
		// 影响子节点透明度
		this.rootNode.setCascadeOpacityEnabled(true)
	},
	open:function(){
		this.rootNode.setVisible(true);
		var fade = cc.fadeTo(0.5, 255);
		this.rootNode.runAction(fade);
	},
	close:function(){
		var fade = cc.fadeTo(0.5, 0);
		var func = cc.callFunc(this.destroy, this);
		var seq = cc.sequence(fade, func);
		this.rootNode.runAction(seq);
	},
	destroy:function() {
		this.rootNode.setVisible(false);
		if(this.rootNode != null){
			this.rootNode.removeAllChildren(true);
			this.rootNode.removeFromParent(true);
			this.rootNode = null;
		}
	}
})