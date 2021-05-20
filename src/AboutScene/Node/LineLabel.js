LineLabel = Label.extend({
	ctor:function(parent, text){
		this._super(parent, text);
		this.indi();
	},
	indi:function(){
		this.setColor(cc.color(255,255,255,0));
		this.setFontSize(30);
	}
})