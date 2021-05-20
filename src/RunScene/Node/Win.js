Win = cc.Node.extend({
	ctor:function(p, name){
		this._super();
		p.addChild(this, 30, TAG_WIN_NODE);
		this.init(name);
	},
	init:function(name){
		this.setCascadeOpacityEnabled(true);
		this.setPosition(100, 100);
		this.setScale(0);
		var main = new cc.Sprite(name);
		this.addChild(main)
		
		var close = new Button(this, 7, TAG_WIN_CLOSE, "#button/win_close.png",this.close);
		var mp = main.getAnchorPoint();
		var cp = close.getAnchorPoint();
		close.setPosition(main.width * (1 - mp.x) - close.width * (1 - cp.x) - 10, 
				main.height * (1 - mp.y) - close.height * (1 - cp.y) - 5);
	},
	show:function(next){
		var move = cc.moveTo(0.5, gg.width * 0.5, gg.height * 0.5);
		var scale = cc.scaleTo(0.5, 1);
		var spawn = cc.spawn(move, scale);
		var seq = cc.sequence(spawn, cc.callFunc(function(){
			if(next){
				gg.flow.next();
			}
		},this));
		this.runAction(seq);
	},
	close:function(p){
		var seq = cc.sequence(cc.fadeTo(0.5,0),cc.callFunc(function(){
			if(gg.flow.flow.action == ACTION_DO1){
				this.getParent().loadPaper();
			} else if(gg.flow.flow.action == ACTION_DO2){
				gg.flow.next();
			}
			this.removeFromParent(true);
		},this));
		this.runAction(seq);
	}
});