Hand = cc.Class.extend({
	addlefthand:function(obj,str,pos,scale,num){
		var hand = new cc.Sprite(str+".png");
		hand.setPosition(pos);


		obj.addChild(hand,1,TAG_HAND_LEFT);		
		var hand1= new cc.Sprite(str+"_part1.png");
		hand1.setPosition(pos);
		

		obj.addChild(hand1,20,TAG_HAND_LEFT1);
		if (num==null){
			hand.setRotation(0);
			hand1.setRotation(0);
		}else{
			hand.setRotation(num);
			hand1.setRotation(num);
		}
		if (scale==null){
			hand.setScale(0.5);
			hand1.setScale(0.5);
		}else{
			hand.setScale(scale);
			hand1.setScale(scale);
		}
	},
	addrighthand:function(obj,str,pos,scale,num){
		var hand = new cc.Sprite(str+".png");		
		hand.setPosition(pos);
		
		obj.addChild(hand,1,TAG_HAND_RIGHT);
		var hand1= new cc.Sprite(str+"_part1.png");
		hand1.setPosition(pos);
		
		obj.addChild(hand1,20,TAG_HAND_RIGHT1);
		if (num==null){
			hand.setRotation(0);
			hand1.setRotation(0);
		}else{
			hand.setRotation(num);
			hand1.setRotation(num);
		}
		if (scale==null){
			hand.setScale(0.5);
			hand1.setScale(0.5);
		}else{
			hand.setScale(scale);
			hand1.setScale(scale);
		}
	},
	handmove:function(obj,action,num){
		if(num==1){
			
			obj.getChildByTag(TAG_HAND_LEFT).runAction(action);
			obj.getChildByTag(TAG_HAND_LEFT1).runAction(action.clone());
		}
		else if(num==2){
			obj.getChildByTag(TAG_HAND_RIGHT).runAction(action);
			obj.getChildByTag(TAG_HAND_RIGHT1).runAction(action.clone());

		}

	},
	handmove1:function(obj,action,num){
	    if(num==1){
	       var seq = cc.sequence(action,cc.callFunc(function(){
	    	   obj.getChildByTag(TAG_HAND_LEFT).removeFromParent();
	       },this));
	       var seq1 = cc.sequence(action.copy(),cc.callFunc(function(){
	    	   obj.getChildByTag(TAG_HAND_LEFT1).removeFromParent();
	       },this));
	    	obj.getChildByTag(TAG_HAND_LEFT).runAction(seq);
	    	obj.getChildByTag(TAG_HAND_LEFT1).runAction(seq1);
		}
		else if(num==2){
			var seq = cc.sequence(action,cc.callFunc(function(){
				obj.getChildByTag(TAG_HAND_RIGHT).removeFromParent();
			},this));
			var seq1 = cc.sequence(action.copy(),cc.callFunc(function(){
				obj.getChildByTag(TAG_HAND_RIGHT1).removeFromParent();
			},this));
			obj.getChildByTag(TAG_HAND_RIGHT).runAction(seq);
			obj.getChildByTag(TAG_HAND_RIGHT1).runAction(seq1);
			
		}
		
	},
	removehand:function(obj,num,num1){
		if(num==null&&num1==null){
			obj.getChildByTag(TAG_HAND_LEFT).removeFromParent();
			obj.getChildByTag(TAG_HAND_LEFT1).removeFromParent();
			obj.getChildByTag(TAG_HAND_RIGHT).removeFromParent();
			obj.getChildByTag(TAG_HAND_RIGHT1).removeFromParent();
		}
		else if(num==1&&num1==1){
			obj.getChildByTag(TAG_HAND_LEFT).removeFromParent();
			obj.getChildByTag(TAG_HAND_LEFT1).removeFromParent();
		}
		else if(num==1&&num1==2){
			obj.getChildByTag(TAG_HAND_RIGHT).removeFromParent();
			obj.getChildByTag(TAG_HAND_RIGHT1).removeFromParent();
			cc.log("去除成功");
		}


	},
})