/**
 * 药品库
 */
Lib = cc.Sprite.extend({
	libArr: [],
	openFlag:false,
	doing:false,
	rm : 5,
	ctor:function(p){
		this._super("#lib_back.png");
		p.addChild(this,30);
		this.setTag(TAG_LIB);
		this.init();
	},
	init:function(){
		this.libArr = [];
		this.openFlag = false;
		this.setPosition(gg.width + this.width * 0.5 + 9,550 + 30);
//
		var cylinder = new LibButton(this, 10, TAG_LIB_CYLINDER,"#cylinder.png", this.callback);
		cylinder.setPosition(30, this.height * 0.5);
//		
		var drop1 = new LibButton(this, 10, TAG_LIB_DROP1,"#bottle3.png", this.callback);
		drop1.right(cylinder, this.rm);
		
		var drop2 = new LibButton(this, 10, TAG_LIB_DROP2,"#bottle4.png", this.callback);
		drop2.right(drop1, this.rm);
		
		var shuiyu = new LibButton(this, 10, TAG_LIB_SHUIYU,"#beaker2.png", this.callback);
		shuiyu.right(drop2, this.rm);
		
		var drop3 = new LibButton(this, 10, TAG_LIB_DROP3,"#bottle2.png", this.callback);
		drop3.right(shuiyu, this.rm);
//		
//		var daoguan = new LibButton(this, 10, TAG_LIB_DAOGUAN,"#daoguan.png", this.callback);
//		daoguan.right(drop, this.rm);
//		
//		var ch4 = new LibButton(this, 10, TAG_LIB_CH4,"#ch4.png", this.callback);
//		ch4.right(daoguan, this.rm);
//		
//		var match  = new LibButton(this, 10, TAG_LIB_MATCH,"#match.png", this.callback);
//		match.right(ch4, this.rm);


	},
	moveLib:function(tag,width){
		width = 75;
		var begin = false;
		for(var i in this.libArr){
			var libTag = this.libArr[i];
			if(tag == libTag){
				begin = true;
			}
			if(begin){
				var lib = this.getChildByTag(libTag);
				if(lib != null){
					lib.runAction(cc.moveBy(0.5,cc.p(-width, 0)));
				}
			}
		}
	},
	callback:function(p){
		var pos = this.getPosition(); 
		var action = gg.flow.flow.action;
		switch(p.getTag()){
			
	    	case TAG_LIB_CYLINDER:
				ll.run.loadCylinder(pos);	
				break;
			case TAG_LIB_DROP1:
			    ll.run.loadDrop1(pos);	
			    break;
			case TAG_LIB_DROP2:
				ll.run.loadDrop2(pos);	
			    break;
			case TAG_LIB_DROP3:
				ll.run.loadDrop3(pos);	
			    break;	
			
			case TAG_LIB_SHUIYU:
				ll.run.loadShuiyu(pos);
			break;
			
			default:
				break;
		}
		if(action == ACTION_NONE){
			this.moveLib(p.getTag(), p.width * p.getScale());
			p.removeFromParent(true);
		}
	},
	isOpen:function(){
		return this.openFlag; 
	},
	open:function(){
		if(this.openFlag || this.doing){
			return;
		}
		this.doing = true;
		var move = cc.moveBy(0.4, cc.p(-this.width,0));
		var func = cc.callFunc(function(){
			this.openFlag = true;
			this.doing = false;
			var tag = gg.flow.flow.tag;
			 if(tag instanceof Array){
				 if(TAG_LIB_MIN < tag[1]){
					 // 显示箭头
					 gg.flow.location();
				 }
			 }
		}, this);
		var seq = cc.sequence(move,func);
		this.runAction(seq);
	},
	close:function(){
		if(!this.openFlag || this.doing){
			return;
		}
		this.doing = true;
		var move = cc.moveBy(0.4, cc.p(this.width,0));
		var func = cc.callFunc(function(){
			this.openFlag = false;
			this.doing = false;
			var tag = gg.flow.flow.tag;
			if(tag instanceof Array){
				if(TAG_LIB_MIN < tag[1]){
					// 隐藏箭头
					//ll.tip.arr.out();
					//ll.tip.arr.setPosition(gg.width-45,455);
					ll.tip.arr.pos(ll.tool.getChildByTag(TAG_BUTTON_LIB));
				}
			}
		}, this);
		var seq = cc.sequence(move,func);
		this.runAction(seq);
	}
});
TAG_LIB_MIN = 30000;

TAG_LIB_CYLINDER = 30001;
TAG_LIB_DROP1=30002;
TAG_LIB_DROP2=30003;
TAG_LIB_DROP3=30004;
TAG_LIB_SHUIYU=30005;

libRelArr = [
     {tag:TAG_LIB_MIN, name:""},   
     {tag:TAG_LIB_CYLINDER, name:"量筒"},
     {tag:TAG_LIB_DROP1,name:"淀粉"},
     {tag:TAG_LIB_DROP2,name:"唾液淀粉酶"},
     {tag:TAG_LIB_DROP3,name:"碘液"},
     {tag:TAG_LIB_SHUIYU,name:"水浴"},
     ];
