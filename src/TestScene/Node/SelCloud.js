/**
 * 选择题界面
 */
TAG_T = 12000;
TAG_S = 12008;
TAG_N = 12009;
SelCloud = Cloud.extend({
	serial:0,
	curSel:null,
	json: null,
	ctor:function (parent, serial) {
		this._super(parent);
		this.serial = serial;
		this.initCloud();
	},
	initCloud:function(){
		this.json = gg.subject[this.serial];
		this.loadTitle();
		this.loadOption();
		this.loadTip();
		this.loadBt();
		this.open();
	},
	loadTitle:function(){
		var title = $.format(this.json.title, 780, gg.fontSize);
		var titleLabel = new Label(this.rootNode, title, this.callback, this);
		titleLabel.setAnchorPoint(0, 0.5);
		titleLabel.setTag(TAG_T);
		titleLabel.setPosition(250, 615); 
	},
	loadOption:function(){
		var posX = 320, posY = 550, m = 10;
		for(var i = 0; i < this.json.option.length; i++){
			var option = this.json.option[i];
			var show = $.format(option.show, 640, gg.fontSize);
			var op = new Label(this.rootNode, show, this.callback, this);
			op.setAnchorPoint(0, 1);
			op.setPosition(posX, posY);
			op.ok = option.right;
			posY -= m;
			posY -= op.height;
		}
	},
	loadTip:function(){
		this.tip = new FlashTip(this.rootNode, "", gg.fontName, gg.fontSize);
		this.tip.setPosition(gg.c_width, 250);
		
		this.tip2 = new FlashTip(this.rootNode, "", gg.fontName, gg.fontSize);
		this.tip2.setAnchorPoint(0.5, 1);
		this.tip2.setPosition(gg.c_width, 200);
	},
	loadBt:function(){
		var sure = new Angel(this.rootNode, "#test_sure.png", this.callback, this);
		sure.setTag(TAG_S);
		sure.setPosition(1032, 126);
	},
	callback:function(p){
		switch(p.getTag()){
			case TAG_S:
				if(this.curSel == null){
					this.tip.doFlash("请选择答案", cc.color(255, 0, 0));
					return;
				} else if(this.curSel.ok){
					this.tip.setString("回答正确");
					this.tip.setColor(cc.color(0, 255, 0));
				} else {
					this.tip.setString("回答错误");
					this.tip.setColor(cc.color(255, 0, 0));
				}
				p.setTag(TAG_N);
				p.setSpriteFrame("test_next.png");
				var result = $.format(this.json.result, 780, gg.fontSize);
				this.tip2.setString(result);
				break;
			case TAG_T:
				break;
			case TAG_N:
				p.setEnable(false);
				this.layer.questionNext();
				this.close();
				break;
			default:		
				if(this.curSel != null){
					this.curSel.stop();
				}
				this.curSel = p;
				this.curSel.flash();
			break;
		}
	}
})
