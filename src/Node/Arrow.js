Arrow = cc.Sprite.extend({
	help:null,
	scene:null,
	ctor:function (scene, fileName, rect, rotated) {
		this._super(fileName, rect, rotated);
		this.scene = scene;
		this.init();
	},
	init:function (){
		var dist = 60,dist2 = 30, dua1 = 0.3,dua2 = 0.1;
		this.setCascadeOpacityEnabled(true);
		this.setOpacity(120);
		var up = new cc.Sprite("#button/arr9.png");
		up.setPosition(0, -dist)
		var seqUp = cc.sequence(cc.moveBy(dua1,cc.p(0, dist2)),cc.moveBy(dua2,cc.p(0, -dist2)));
		var repeatUp = cc.repeatForever(seqUp);
		up.runAction(repeatUp);
		
		var down = new cc.Sprite("#button/arr9.png");
		down.setRotation(180);
		down.setPosition(0, dist);
		var seqDown = cc.sequence(cc.moveBy(dua1,cc.p(0, -dist2)),cc.moveBy(dua2,cc.p(0, dist2)));
		var repeatDown = cc.repeatForever(seqDown);
		down.runAction(repeatDown);
		
		var left = new cc.Sprite("#button/arr9.png");
		left.setRotation(-90);
		left.setPosition(dist, 0);
		var seqLeft = cc.sequence(cc.moveBy(dua1,cc.p(-dist2, 0)),cc.moveBy(dua2,cc.p(dist2, 0)));
		var repeatLeft = cc.repeatForever(seqLeft);
		left.runAction(repeatLeft);
		
		var right = new cc.Sprite("#button/arr9.png");
		right.setRotation(90);
		right.setPosition(-dist, 0);
		var seqRight = cc.sequence(cc.moveBy(dua1,cc.p(dist2, 0)),cc.moveBy(dua2,cc.p(-dist2, 0)));
		var repeatRight = cc.repeatForever(seqRight);
		right.runAction(repeatRight);
		
		this.addChild(up);
		this.addChild(down);
		this.addChild(left);
		this.addChild(right);
		
		var fade = cc.sequence(cc.fadeTo(dua1,255),cc.fadeTo(dua2,120));
		var repeat = cc.repeatForever(fade);
		this.runAction(repeat);
		this.out();
	},
	out:function(){
		this.setPosition(-100,-100);
	},
	pos:function(obj,x,y){
		if(obj == null){
			return;
		}
		x = x == null ? 0.5 : x;
		y = y == null ? 0.5 : y;
		var bound = $.genBoundingBoxToWorld(obj);
		var objP = obj;
		var angle = obj.getRotation();
		for (var i=0;i<10;i++){
			if(objP.getParent() != null){
				angle = angle+ objP.getParent().getRotation();
				objP=objP.getParent();
				//cc.log(i);
			}

		}

		if (obj.getParent() != null){
			//var angle = Math.abs(obj.getRotation() + obj.getParent().getRotation());
			angle = Math.abs(angle);
			var sina = Math.abs(Math.sin(Math.PI*angle/180.0));//转化成角度并去绝对值
			var cosa = Math.abs(Math.cos(Math.PI*angle/180.0));
			if(sina == 0){
				var p = cc.p(bound.x + obj.width * x * obj.getScale(), bound.y + obj.height * y * obj.getScale());
			}else if(sina==1){
				var p = cc.p(bound.x + obj.height * y * obj.getScale(), bound.y + obj.width * x * obj.getScale());
			}
			else {		
				if (obj.width > obj.height){
					var p = cc.p(bound.x + obj.width * x * obj.getScale()*sina + obj.height * y * obj.getScale()*cosa, bound.y + obj.width * x * obj.getScale()*cosa + obj.height * y * obj.getScale()*sina);
				}else {
					var p = cc.p(bound.x + obj.height * y* obj.getScale()*sina + obj.width * x * obj.getScale()*cosa, bound.y + obj.height * y * obj.getScale()*cosa + obj.width * x * obj.getScale()*sina);
				}

			}
		}else {
			var p = cc.p(bound.x + obj.width * x * obj.getScale(), bound.y + obj.height * y * obj.getScale());
		}




		//	var p = cc.p(bound.x + obj.width * x * obj.getScale(), bound.y + obj.height * y * obj.getScale());

		if(gg.teach_type == TAG_REAL){
			this.setVisible(false);
			return;
		}
		this.setPosition(p);
		this.setVisible(true);
	}
});