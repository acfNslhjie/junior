Tip = cc.LabelTTF.extend({
	fSize:0,
	d_width:null,
	ctor:function (text, width, fontName,fontSize) {
		this.d_width = width;
		if(fontName == null){
			fontName = gg.fontName;
		}
		if(fontSize == null){
			this.fSize = gg.fontSize;
		} else {
			this.fSize = fontSize;
		}
		text = $.format(text, this.d_width, this.fSize);
		this._super(text, fontName, this.fSize);
		this.setAnchorPoint(0, 0);
// this.setColor(cc.color(0,0,0,0));
	},
	doTip:/**
			 * 更改提示
			 * 
			 * @param text
			 */
	function(text){
		text = $.format(text, this.d_width, this.fSize);
		this.setString(gg.flow.step+"."+text);
	}
});

TipFrame = cc.LayerColor.extend({
	cur : 0,
	tip : [],
	lineMarign:10,
	posX: 0,
	posY: 0,
	open_flag: false,
	tipLayer:null,
	cell:null,
	ctor:function (tipLayer) {
		this._super();
		this.setColor(cc.color(255, 255, 255, 191));
		this.setOpacity(191);
		this.tipLayer = tipLayer;
		this.init();
		qq = this;
	},
	init:function (){
		this.node = new cc.Node();
		this.addChild(this.node);
		this.cur = 0;
		this.posX = 5;
		this.posY = gg.height;
		for(var i = 0;i< teach_flow.length; i++){
			var pre = i - -1 + ".";
			var text = $.format(pre + teach_flow[i].tip, 0.5 * gg.width, 20);
			var tip = new cc.LabelTTF(text, gg.fontName, gg.fontSize);
			tip.setAnchorPoint(0, 0);
			this.posY = this.posY - tip.height - this.lineMarign;
			tip.setPosition(this.posX, this.posY);
			this.tip[i] = tip;
			this.node.addChild(tip);
			if(this.cell == null){
				this.cell = tip.height + this.lineMarign;
			}
		}
	},
	open:function (){
		var move = cc.moveTo(0.5,cc.p(gg.width * 0.5, 0));
		var sequence = cc.sequence(move);
		this.runAction(sequence);
		this.open_flag = true;
	},
	close:function (){
		var move = cc.moveTo(0.5,cc.p(gg.width, 0));
		var sequence = cc.sequence(move);
		this.runAction(sequence);
		this.open_flag = false;
	},
	isOpen:function (){
		return this.open_flag;
	},
	up:function (){
		if(this.cur <= 0){
			return;
		}
		var curTip = this.tip[--this.cur];
		this.node.runAction(cc.moveBy(0.2,cc.p(0, - curTip.height - this.lineMarign)));
	},
	down:function (){
		if(this.cur >= this.tip.length - 1){
			return;
		}
		var curTip = this.tip[this.cur++];
		this.node.runAction(cc.moveBy(0.2,cc.p(0, curTip.height + this.lineMarign)));
	},
	local:function(step){
		var last = this.cur;
		this.cur = step - 1;
		if(this.cur < 0){
			this.cur = 0;
		}
		var result = 0;
		if(this.cur == last){
			return;
		} else if(this.cur > last){
			for(var i = last; i < this.cur; i ++){
				result += this.tip[i].height;
				result += this.lineMarign;
			}
		} else {
			for(var i = this.cur; i < last; i ++){
				result += this.tip[i].height;
				result += this.lineMarign;
			}
			result = -result;
		}
		var pos = this.node.getPosition();
		this.node.setPosition(pos.x,pos.y + result);
	},
	refresh:function (){
		for(var i=0;i<this.tip.length;i++){
			if(teach_flow[i].cur){
				this.tip[i].setColor(cc.color(1,142,70));	
			} else {
				this.tip[i].setColor(cc.color(0,0,0,0));
			}
		}	
	},
	loadSlide:/**
				 * 滑动
				 */
		function(){
		var listener_touch = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			hover: false,
			onTouchBegan:this.onTouchBegan,
			onTouchMoved:this.onTouchMoved,
			onTouchEnded:this.onTouchEnded});
		cc.eventManager.addListener(listener_touch, this);
		if ('mouse' in cc.sys.capabilities){
			var listener_mouse = cc.EventListener.create({
				event: cc.EventListener.MOUSE,
				swallowTouches: false,
				onMouseScroll:UpperLowerSliding.onMouseScroll
			});
			cc.eventManager.addListener(listener_mouse, this);

//			var upArrow = new Angel(this.ver, "#sel_up_arrow.png", this.down, this);
//			upArrow.setLocalZOrder(4);
//			upArrow.setPosition(this.ver.width * 0.5, this.ver.height + 20);

//			var downArrow = new Angel(this.ver, "#sel_down_arrow.png", this.up, this);
//			downArrow.setLocalZOrder(4);
//			downArrow.setPosition(this.ver.width * 0.5, 0 - 20);
		}
	},
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
				var margin = pos.y - this.last.y;
				var t = margin > 0 ? margin / target.cell : -margin / target.cell;
				if(t >= 1 && margin > 0){
					for(var i = 0; i < t; i++){
						target.down();
					}
					this.last = pos;
				} else if(t >= 1 && margin < 0){
					for(var i = 0; i < t; i++){
						target.up();
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
	}
});