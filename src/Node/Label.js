/**
 * 文字按钮基类
 */
Label = cc.LabelTTF.extend({
	p:null,
	callback:null,
	back:null,
	enable:true,
	normalName:null,
	hoverName:null,
	ctor:function (parent, text, callback,back) {
		if(gg.isdemo){
			this.enable = false;
		} else {
			this.enable = true;
		}
		if(gg.fontName == null){
			gg.fontName = "微软雅黑";
		}
		if(gg.fontSize == null){
			gg.fontSize = 25;
		}
		this._super(text, gg.fontName, gg.fontSize);
		this.p = parent;
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
		this.setColor(cc.color(0,0,0,0));
	},
	checkClick:function(pos){
		// 判断触碰 getBoundingBoxToWorld
		if(cc.rectContainsPoint(
			this.getBoundingBoxToWorld(),pos)){
			return true;
		} else {
			return false;
		}
	},
	onTouchBegan:function(touch, event){
		if(!this.enable){
			return false;
		}
		var target = event.getCurrentTarget();
		var pos = cc.p(touch.getLocationX(),touch.getLocationY());
		// 被点击则，更换点击图片
		if(target.checkClick(pos)){
			this.hover = true;
		}
		return true;
	},
	onTouchEnded:function(touch, event){
		var target = event.getCurrentTarget();
		if(this.hover){
			// 点击结束，更换常态图片
			this.hover = false;
			if(target.callback != null){
				// 有回调函数，则调用回调函数
				target.callback.call(target.back,target);
			}
		}
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
	flash:function (){
		var fade1 = cc.fadeTo(0.5, 50);
		var fade2 = cc.fadeTo(0.5, 255);
		var seq = cc.sequence(fade1,fade2);
		var flash = cc.repeatForever(seq);
		this.runAction(flash);
	},
	stop:function (){
		this.stopAllActions();
		this.setOpacity(255);
	},
	setEnable:function(enable){
		this.enable = enable;
	},
	simCallBack:function(){
		if(this.callback != null){
			this.callback.call(this.back,this);	
		}
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