var ToolLayer = cc.Layer.extend({
	scene:null,
	ctor:function (parent) {
		this._super();
		this.scene = parent;
		this.scene.addChild(this, 20);
		this.init();
	},
	init: function (){
		var lib = new  Angel(this,
				"#button/lib.png",
				this.callback,this);
		lib.setTag(TAG_BUTTON_LIB);
		lib.setPosition(gg.width - lib.width * 0.5 - 10, gg.height * 0.6);
	},
	callback: function(pSender) {
		pSender.setEnable(false);
		switch (pSender.getTag()){
			case TAG_BUTTON_LIB:
				if(ll.run.lib.isOpen()){
					ll.run.lib.close();
				} else {
					ll.run.lib.open();
					if(gg.flow.flow.tag == TAG_BUTTON_LIB){
						gg.flow.next();
					}
				}
				pSender.setEnable(true);
		}
	}
})