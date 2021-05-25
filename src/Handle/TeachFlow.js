var /**
	 * 仿真流程管理
	 */
TeachFlow = cc.Class.extend({
	step:0,
	flow:null,
	main:null,
	over_flag: false,
	curSprite:null,
	ctor: function(){
		this.init();
	},
	setMain:function(main){
		this.main=main;
	},
	init: function(){
		for(var i in teach_flow){
			teach_flow[i].finish = false;
			teach_flow[i].cur = false;
			if(teach_flow[i].action == null){
				teach_flow[i].action = ACTION_NONE;
			}
		}
	},
	start:/**
			 * 开始流程
			 */
	function(){
		this.over_flag = false;
		this.step = 0;
		
		/* 新标准，开始的时候，执行下一步 */
		this.next();
	},
	over:/**
			 * 流程结束，计算分数，跳转到结束场景，
			 */
	function(){
		this.over_flag = true;
		this.flow = over;
		gg.lastStep = this.step;
		this.main.over();
	},
	checkTag:/**
				 * 检查是否当前步骤
				 * 
				 * @deprecated 使用新Angel类，不再判断是否当前步骤
				 * @param tag
				 * @returns {Boolean}
				 */
	function(tag){
		var cur_flow = teach_flow[this.step - 1];
		if(cur_flow.tag == tag){
			return true;
		} else {
			return false;
		}
	},
	prev:/**
			 * 回退一定步数
			 * 
			 * @deprecated 需结合具体实现，，暂时不再启动
			 * @param count
			 *            步数
			 */
	function(count){
		if(this.curSprite!=null){
			this.curSprite = null;
		}
		if(this.flow!=null){
			this.flow.cur = false;
		}
		this.step = this.step - count;
		this.flow = teach_flow[this.step - 1];
		this.refresh();
		gg.score -= 11;
	},
	next:/**
			 * 执行下一步操作， 定位当前任务
			 */
	function(){
		if(this.over_flag){
			return;
		}
		if(this.curSprite!=null){
			this.curSprite.setEnable(false)
			this.curSprite = null;
		}
		if(this.flow!=null){
			this.flow.cur = false;
			// 标记任务已完成
			this.flow.finish = true;
		}
		this.flow = teach_flow[this.step++];
		if(this.flow.finish){
			// 如果任务已完成，跳过当前步骤
			this.next();
		}
		this.refresh();
	},
	refresh:/**
			 * 刷新当前任务状态，设置闪现，点击等状态
			 */
	function(){
		// 刷新提示
	
		this.flow.cur = true;
		if(this.flow.tip != null){
			ll.tip.tip.doTip(this.flow.tip);
		}
		if(this.flow.flash != null){
			ll.tip.flash.doFlash(this.flow.flash);
		}
		if(this.step > teach_flow.length - 1){
			this.over();
		}
		this.initCurSprite();
		if(this.curSprite!=null){
			this.location();
			this.curSprite.setEnable(true);
		}
	},
	location:/**
				 * 定位箭头
				 */
	function(){
		var tag = gg.flow.flow.tag;
		if(tag instanceof Array){
			if(TAG_LIB_MIN < tag[1]){
				if(ll.run.lib.isOpen()){
					ll.tip.arr.pos(this.curSprite);
				}else{
					//ll.tip.arr.setPosition(gg.width-45,455);
					ll.tip.arr.pos(ll.tool.getChildByTag(TAG_BUTTON_LIB));
				}
			}else{
				ll.tip.arr.pos(this.curSprite);
			}
		}
		else {
			ll.tip.arr.pos(this.curSprite);
		}
				
	},
	getStep:/**
			 * 获取当前步数
			 * 
			 * @returns {Number}
			 */
	function(){
		return this.step;
	},
	initCurSprite:/**
					 * 遍历获取当前任务的操作对象
					 */
	function(){
		var tag = this.flow.tag;
		if(tag == null || tag == undefined){
			return;
		}
		var root = ll.run;
		var sprite = null;
		if(tag == TAG_BUTTON_LIB){
			sprite =ll.tool.getChildByTag(tag);
		}
		else if(tag instanceof Array){
			// 数组
			for (var i in tag) {
				root = root.getChildByTag(tag[i]);
			}
			sprite = root;							
		} else {
			// 单个tag
			var sprite = root.getChildByTag(tag);
		}
		if(sprite != null){
			this.curSprite = sprite;
			
			return ;
		}
	}
});

// 任务流
teach_flow = [
              {tip:"打开物品库",tag:TAG_BUTTON_LIB},
              {tip:"取出1号量筒",tag:[TAG_LIB,TAG_LIB_CYLINDER],action:ACTION_DO1},
              {tip:"取出1%的淀粉溶液",tag:[TAG_LIB,TAG_LIB_DROP1]},
              {tip:"取出瓶塞",tag:[TAG_DROP_NODE,TAG_LID]},
              {tip:"在量筒中倒入2ml淀粉溶液",tag:[TAG_DROP_NODE,TAG_BOTTLE]},
              {tip:"将量筒中的淀粉溶液倒入1号试管中",tag:[TAG_CYLINDER_NODE,TAG_CYLINDER],action:ACTION_DO1},            
              {tip:"取出2号量筒",tag:[TAG_LIB,TAG_LIB_CYLINDER],action:ACTION_NONE},
              {tip:"取出唾液淀粉酶溶液",tag:[TAG_LIB,TAG_LIB_DROP2]},
              {tip:"取出瓶塞",tag:[TAG_DROP_NODE,TAG_LID]},
              {tip:"在量筒中倒入1ml唾液淀粉酶溶液",tag:[TAG_DROP_NODE,TAG_BOTTLE]},
              {tip:"将量筒中的唾液淀粉酶溶液倒入4号试管中",tag:[TAG_CYLINDER_NODE,TAG_CYLINDER],action:ACTION_DO2},
              {tip:"取出3个水浴装置",tag:[TAG_LIB,TAG_LIB_SHUIYU]},
             
              {tip:"将1号和4号试管分为一组，放到10℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN1_NODE,TAG_SHIGUAN1],action:ACTION_DO1},
              {tip:"将1号和4号试管分为一组，放到10℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN4_NODE,TAG_SHIGUAN4],action:ACTION_DO1},
              {tip:"将2号和5号试管分为一组，放到37℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN2_NODE,TAG_SHIGUAN2],action:ACTION_DO1},
              {tip:"将2号和5号试管分为一组，放到37℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN5_NODE,TAG_SHIGUAN5],action:ACTION_DO1},
              {tip:"将3号和6号试管分为一组，放到60℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN3_NODE,TAG_SHIGUAN3],action:ACTION_DO1},              
              {tip:"将3号和6号试管分为一组，放到60℃水温烧杯中，水浴5分钟",tag:[TAG_SHIGUAN6_NODE,TAG_SHIGUAN6],action:ACTION_DO1},              
              {tip:"将4号试管中的唾液淀粉酶溶液倒入1号试管中，水浴5分钟",tag:[TAG_SHIGUAN4_NODE,TAG_SHIGUAN4],action:ACTION_DO2},
              {tip:"将5号试管中的唾液淀粉酶溶液倒入2号试管中，水浴5分钟",tag:[TAG_SHIGUAN5_NODE,TAG_SHIGUAN5],action:ACTION_DO2},
              {tip:"将6号试管中的唾液淀粉酶溶液倒入3号试管中，水浴5分钟",tag:[TAG_SHIGUAN6_NODE,TAG_SHIGUAN6],action:ACTION_DO2},
              {tip:"取出1号试管",tag:[TAG_SHIGUAN1_NODE,TAG_SHIGUAN1],action:ACTION_DO2},
              {tip:"取出2号试管",tag:[TAG_SHIGUAN2_NODE,TAG_SHIGUAN2],action:ACTION_DO2},
              {tip:"取出3号试管",tag:[TAG_SHIGUAN3_NODE,TAG_SHIGUAN3],action:ACTION_DO2},
//              
//              {tip:"取出碘溶液",tag:[TAG_LIB,TAG_LIB_DROP]},
//              {tip:"往三只试管中分别加入1滴碘液，观察现象",tag:[TAG_DROP_NODE,TAG_DROP]},
//   
           	  {tip:"恭喜过关",over:true}
];
over = {tip:"恭喜过关"};



