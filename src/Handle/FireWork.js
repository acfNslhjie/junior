FireWork = cc.Node.extend({
	node:null,
	arrX:null,
	arrY:null,
	cur:0,
	max:6,
	ctor:function (node) {
		this._super();
		this.node = node;
		this.node.addChild(this);
		this.init();
	},
	init:function(){
		this.arrX = [0.2,0.6,0.3,0.7,0.8,0.5];
		this.arrY = [0.7,0.6,0.8,0.7,0.6,0.9];
		
		this.firework();
		this.schedule(this.firework, 2);
	},
	firework:function (){
		var arrX = this.arrX[this.cur];
		var arrY = this.arrY[this.cur];
		this.cur ++;

		if(arrX == null){
			arrX = 0.2;
		}
		if(arrY == null){
			arrY = 0.7;
		}
		var particle = new cc.ParticleSystem(res_finish.firework_p);
		particle.setPosition(gg.width * arrX, gg.height * arrY);
		particle.setLocalZOrder(100);
		this.node.addChild(particle);
		particle.setAutoRemoveOnFinish(true);
		
		if(this.cur > this.max){
// this.unschedule(this.firework);
			this.cur = 0;
		}
	}
});