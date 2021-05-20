Widget = cc.Node.extend({
	func:null,
	ctor:function(){
		this._super();
		this.func = cc.callFunc(this.actionDone, this);
		this.func.retain();
	},
	callback:function(){
		// 子类使用的时候，实现具体功能
	},
	actionDone:function(){
		// 子类使用的时候，实现具体功能
	},
	onExit:function(){
		this._super();
		this.func.release();
	}
});