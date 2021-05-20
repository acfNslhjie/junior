Duang = cc.Class.extend({
	ctor:function (node, x, y, name) {
		this.particle = new cc.ParticleSystem(res_game.spark);
		this.particle.setPosition(x,y);
		this.particle.setLocalZOrder(100);
		this.particle.setAutoRemoveOnFinish(true);
		node.addChild(this.particle);
	},
	destory:function(){
		var seq = cc.sequence(cc.delayTime(0.8), this.cleanUp(this.particle));
		this.particle.runAction(seq);		
	},
	cleanUp : function (sprite){  
		return cc.callFunc(function (){
			sprite.cleanuped = true;  
			sprite.removeFromParent(true);  
		});  
	}
});