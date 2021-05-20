/**
 * 上下滑动监听辅助
 */
UpperLowerSliding = {
	onTouchBegan: function(touch, event){
		var target = event.getCurrentTarget();
		var pos = cc.p(touch.getLocationX(),touch.getLocationY());
		if(cc.rectContainsPoint(
				target.getBoundingBoxToWorld(),pos)){
			this.click = true;
			return true;
		}
		return false;
	},
	onTouchMoved: function(touch, event){
		if(this.click){
			var target = event.getCurrentTarget();
			var pos = cc.p(touch.getLocationX(),touch.getLocationY());
			if(this.last == null){
				this.last = pos;
			} else {
				// target.cell,最小滑动距离判断,默认为10px
				target.cell = target.cell == null ? 0 : target.cell;
				var margin = pos.y - this.last.y;
				var t = margin > 0 ? margin / target.cell : -margin / target.cell;
				if(t >= 1 && margin > 0){
					for(var i = 0; i < t; i++){
						// 上拉,目标必须实现向下事件
						target.up();						
					}
					this.last = pos;
				} else if(t >= 1 && margin < 0){
					for(var i = 0; i < t; i++){
						// 下拉,目标必须实现向上事件
						target.down();
					}
					this.last = pos;
				}
			}
		}
	},
	onTouchEnded: function(touch, event){
		if(this.click){
			this.click = false;
			this.last = null;
		}
	},
	onMouseScroll: function(event){
		var target = event.getCurrentTarget();
		if(event.getScrollY() > 0){
			target.up();
		} else if(event.getScrollY() < 0){
			target.down();
		}
	}
}