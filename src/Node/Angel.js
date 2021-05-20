/**
 * 按钮基类
 */
Angel = cc.Sprite.extend({
	p:null,
	callback:null,
	back:null,
	enable:null,
	margin:0,
	normalName:null,
	hoverName:null,
	flashName:null,
	rectByChild:false,
	ctor:function (parent, fileName, callback, back, rect, rotated) {
		if(gg.isdemo){
			this.enable = false;
		} else {
			this.enable = true;
		}
		this._super(fileName, rect, rotated);
		this.p = parent;
		this.normalName = fileName.split("#")[1];
		this.hoverName = fileName.split("#")[1];
		this.flashName = "red/" + fileName.split("#")[1];
		this.orig_color = this.getColor();
		this.callback = callback;
		if(back == null){
			this.back = this.p;
		} else {
			this.back = back;
		}
		this.init();
	},
	init:function(){
		// 添加到界面
		this.p.addChild(this);
		// 添加按钮事件
		this.listener();
	},
	genFlashName:function (){
		this.file_name = this.file_name.split("#")[1];
		this.flash_name = "red/" + this.file_name; 
	},
	setRectByChild:/**
					 * 点击范围 是否包括子节点范围 默认不包括
					 * 
					 * @param bool
					 */
	function(bool){
		this.rectByChild = bool;
	},
	genBox:function(){
		if(this.rectByChild){
			return this.getBoundingBoxToWorld();
		} else {
			return $.genBoundingBoxToWorld(this);
		}
	},
	checkClick:function(pos){
		// 判断触碰 getBoundingBoxToWorld getBoundingBox

		if(cc.rectContainsPoint(
				this.genBox(),pos)){
			return true;
		} else {
			return false;
		}
	},
	onTouchBegan:function(touch, event){
		if(gg.synch_l){
			return false;
		}
		var target = event.getCurrentTarget();
		var pos = cc.p(touch.getLocationX(),touch.getLocationY());
		// 被点击则，更换点击图片
		if(target.checkClick(pos)){
			if(!this.canSee(target)){
				return false;
			}
			if(!this.enable){
				this.exeUnEnable();
				return false;
			}
			this.hover = true;
			gg.synch_l = true;
			if(target.hoverName != target.normalName){
				target.setSpriteFrame(target.hoverName);	
			}
			if(this.checkPre(target, this)){
				// 如果触发事件，同步
				cc.log("gg.synch_l:" + gg.synch_l + "|tag:"+target.getTag())
			}
		}
		return true;
	},
	onTouchEnded:function(touch, event){
		var target = event.getCurrentTarget();
		if(this.hover){
			// 点击结束，更换常态图片
			this.hover = false;
			gg.synch_l = false;
			cc.log("gg.synch_l:" + gg.synch_l + "|tag:"+target.getTag())
			if(target.hoverName != target.normalName){
				target.setSpriteFrame(target.normalName);
			}
			if(!this.checkBack(target, this)){
				return;
			}
			if(target.callback != null){
				this.preCall();
				// 有回调函数，则调用回调函数
				target.callback.call(target.back,target);
			}
		}
	},
	preCall:function(){
		// 回调之前的处理，一般子类才会用到
	},
	exeUnEnable:function(){
		// 回调之前的处理，一般子类才会用到
	},
	simCallBack:function(){
		if(this.callback != null){
			this.callback.call(this.back,this);	
		}
	},
	checkVisible:function(){
		if(!this.isVisible()){
			return false;
		}
		if(!this.getParent().isVisible()){
			return false;
		}
		return true;
	},
	checkBack:function(target, listener){
		// 回调检查
		return true;
	},
	checkPre:function(target, listener){
		// 回调预检查
		return true;
	},
	setSFrame:function(sFrame){
		this.setSpriteFrame(sFrame);
		this.normalName = sFrame;
		this.hoverName = sFrame;
		this.flashName = "red/" + sFrame;
	},
	listener:function(){
		var listener_touch = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			hover: false,
			onTouchBegan:this.onTouchBegan.bind(this),
			onTouchEnded:this.onTouchEnded.bind(this)});
		cc.eventManager.addListener(listener_touch, this);
	},
	setHoverName:function(fileName){
		this.hoverName = fileName;
	},
	flash_flag:false,
	flash:function(){
		if(gg.teach_type != TAG_LEAD){
			return;
		}
		// 是否在闪现
		this.flash_flag = true;
		this.schedule(this.updateFlash, 0.4);
	},
	file_name_flag:true,
	updateFlash:function(){
		if(this.file_name_flag){
			this.file_name_flag = false;
			var frame1 = cc.spriteFrameCache.getSpriteFrame(this.normalName);
			this.setSpriteFrame(frame1);	
		} else {
			this.file_name_flag = true; 
			var frame2 = cc.spriteFrameCache.getSpriteFrame(this.flashName);
			this.setSpriteFrame(frame2);
		}
	},
	stop:function(){
		this.unschedule(this.updateFlash);
		if(this.flash_flag){
			this.setSpriteFrame(this.normalName);	
		}
	},
	canSee:/**
			 * 是否可见
			 * 
			 * @param target
			 */
	function(target){
		if(!target.checkVisible()){
			return false;
		} else if(target.getOpacity() == 0 ){
			return false;
		}
		var p = target.getParent();
		while(p != null){
			if(p.getOpacity() == 0&& p.isCascadeOpacityEnabled()){
				return false;
			}
			p = p.getParent();
		}
		
		var rect = target.genBox();
		if(rect.x + target.width < 0 || rect.x> gg.width){
			// 横向越界
			return false;
		} else if(rect.y + target.height < 0 || rect.y > gg.height){
			// 纵向越界
			return false;
		}
		return true;
	},
	setEnable:function(enable){
		this.enable = enable;
	},
	flash2:function (){
		var fade1 = cc.fadeTo(0.5, 50);
		var fade2 = cc.fadeTo(0.5, 255);
		var seq = cc.sequence(fade1,fade2);
		var tint1 = cc.tintTo(0.5,170,230,255);
		var tint2 = cc.tintTo(0.5,255,255,255);
		var seq2 = cc.sequence(tint1,tint2);
		var spawn = cc.spawn(seq, seq2);
		var flash = cc.repeatForever(spawn);
		this.runAction(flash);
	},
	stop2:function (){
		this.stopAllActions();
		this.setOpacity(255);
		this.setColor(this.orig_color);
	},
	up:function (standard, margin){
		if(margin != null){
			this.margin = margin;
		}
		var sap = standard.getAnchorPoint();
		var ap = this.getAnchorPoint();
		// 标准物的y + 标准物的高度 * 缩放 * (1-锚点y) + 本身的高度 * 缩放 * 锚点y   +  所需间隔

		var y = standard.y + standard.height * standard.getScaleY() * (1-sap.y)  + this.height * ap.y * this.getScaleY() + this.margin;
		this.setPosition(standard.x, y);
	},	
	down:function (standard, margin){
		if(margin != null){
			this.margin = margin;
		}
		var sap = standard.getAnchorPoint();
		var ap = this.getAnchorPoint();
		// 标准物的y - 标准物的高度 * 缩放 * 锚点y - 本身的高度 * 缩放 * (1-锚点y) -  所需间隔

		var y = standard.y - standard.height * standard.getScaleY() * sap.y  - this.height * (1-ap.y) * this.getScaleY() - this.margin;
		this.setPosition(standard.x, y);
	},	
	left:function (standard, margin){
		if(margin != null){
			this.margin = margin;
		}
		var sap = standard.getAnchorPoint();
		var ap = this.getAnchorPoint();
		// 标准物的x - 标准物的宽度 * 缩放 * 锚点 + 本身的宽度 * 缩放 * (1-锚点x)  -  所需间隔

		var x = standard.x - standard.width * standard.getScaleX() * sap.x  - this.width * (1-ap.x) * this.getScaleX() - this.margin;
		this.setPosition(x, standard.y);
	},	
	right:function (standard, margin){
		if(margin != null){
			this.margin = margin;
		}
		var sap = standard.getAnchorPoint();
		var ap = this.getAnchorPoint();
		// 标准物的x + 标准物的宽度 * 缩放 * (1-锚点x) + 本身的宽度 * 缩放 * 锚点    + 需要间隔

		var x = standard.x + standard.width * standard.getScaleX() * (1-sap.x)  + this.width * ap.x * this.getScaleX() + this.margin;
		this.setPosition(x, standard.y);
	},
})