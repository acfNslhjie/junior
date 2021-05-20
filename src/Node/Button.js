var Button = Angel.extend({
	margin: 0,
	menu:null,
	flash_name:null,
	ctor: function (parent,zIndex,tag,normalImage, callback, back) {
		this._super(parent,normalImage, callback, back);
		this.setTag(tag);
		this.setLocalZOrder(zIndex);
		// 默认不能点击
		this.setEnable(false);
	},
	preCall:function(){
		// 隐藏箭头
		ll.tip.arr.out();
		this.setEnable(false);
		// 操作成功
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
	}
})