var listener_touch = cc.EventListener.create({
	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	onTouchBegan:function(touch, event) {
		var pos = cc.p(touch.getLocationX(),touch.getLocationY());
		var target = event.getCurrentTarget();
		if(cc.rectContainsPoint(target.getChildByTag(TAG_TANK_TAOTONG).getBoundingBox(), pos)){
			cc.log("点击了")
		}
		return true;
	},
	onTouchMoved:function(touch, event) {
		var target = event.getCurrentTarget();
		var pos = touch.getLocation();
		
		if(cc.rectContainsPoint(target.getChildByTag(TAG_TANK_TAOTONG).getBoundingBox(), pos)){
			target.getChildByTag(TAG_TANK_TAOTONG).setPosition(pos);
		}
	},
	onTouchEnded:function(touch, event) {
		var target = event.getCurrentTarget();
		var pos = touch.getLocation();
	}
});
