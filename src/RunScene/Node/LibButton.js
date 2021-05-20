var LibButton = Angel.extend({
	margin: 0,
	menu:null,
	flash_name:null,
	ctor: function (parent,zIndex,tag,normalImage, callback, back) {
		this._super(parent, "#root.png", callback, back);
		this.setTag(tag);
		this.parent.libArr.push(tag);
		this.setLocalZOrder(zIndex);
		// 默认不能点击
		this.setEnable(false);
		this.setRectByChild(true);
		
		this.loadImage(normalImage);
		this.loadName();
		this.loadFrame();
	},
	loadImage:function(name){
		var image = new cc.Sprite(name);
		var scale;
		if(image.width > image.height){
			scale = 60 / image.width;
		} else {
			scale = 60 / image.height;
		}
		image.setScale(scale);
		this.addChild(image);
	},
	loadName:function(){
		var name = "";
		for(var i in libRelArr){
			if(libRelArr[i].tag == this.getTag()){
				name = libRelArr[i].name;
				break;
			}
		}
		var nameLabel = new cc.LabelTTF(name, gg.fontName, 20);
		nameLabel.setColor(cc.color(0,0,0));
		nameLabel.setPosition(0, -30 - 10 - 10);
		this.addChild(nameLabel);
	},
	loadFrame:function(){
		var draw = new cc.DrawNode();
// draw.
	},
	preCall:function(){
		// 隐藏箭头
		ll.tip.arr.out();
		this.setEnable(false);
		gg.score += 10;
		if(!gg.errFlag){
			gg.oneSure ++;
		}
		gg.errFlag = false;
		_.clever();
		
		if (ll.run.getChildByTag(TAG_SHOW) != null){
			var seq = cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){
				ll.run.getChildByTag(TAG_SHOW).removeFromParent(true);
			}, this))
			ll.run.getChildByTag(TAG_SHOW).runAction(seq);
		}
	},
	exeUnEnable:function(){
		// 操作失败
		gg.score -= 1;
		gg.errFlag = true;
		gg.errorStep ++;
		_.error();
	},
	right:function (standard, margin){
		margin = 75;
		if(margin != null){
			this.margin = margin;
		}
		var sap = standard.getAnchorPoint();
		var ap = this.getAnchorPoint();
		// 左边的x + 左边的宽度 * 缩放 * 锚点 + 本身的宽度 * 缩放 * 锚点
		var x = standard.x + standard.width * standard.getScaleX() * sap.x  + this.width * ap.x * this.getScaleX() + this.margin;
		this.setPosition(x, standard.y);
	}
})