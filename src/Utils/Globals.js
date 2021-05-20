// 管理相关的layer，利于解耦
var ll = ll || {};
// 管理相关的游戏参数
var gg = gg || {};
gg.d_time = 0.3;
gg.server_url = "http://121.40.195.52:8080/teach_platform/";

gg.login_url = null;
// 教学模式,0 引导模式 1实战模式
gg.teach_type = TAG_LEAD;
// 全局宽度，全局高度
gg.width = 0;
gg.height = 0;
gg.c_p = null;
gg.c_width = 0;
gg.c_height = 0;
gg.d_z_index = 1;
gg.fontSize = 25;
gg.fontName = "微软雅黑";
gg.logo_onclick = true;
gg.synch_l = false;
gg.init = function(){
	// 初始化固定参数
	this.width = cc.winSize.width;
	this.height = cc.winSize.height;
	this.c_width = this.width * 0.5;
	this.c_height = this.height * 0.5;
	this.c_p = cc.p(this.c_width, this.c_height);
	this.login_url = this.server_url + "login/{1}/{2}";
	this.start_load = true;
	this.run_load = false;
	this.finish_load = false;
	this.game_load = false;
	this.test_load = false;
	this.about_load = false;
	this.isdemo = false;
	
	gg.expId = 20;
	gg.lastStep = 1;
	gg.userId = 1;
	gg.expVer = 2;
	gg.version = '';
}
gg.initTeach = function(){
	// 初始化游戏参数
	gg.flow = new TeachFlow();
	gg.begin_time = new Date();
	gg.score = 0;
	gg.errorStep = 0;// 错误步数
	gg.oneSure = 0;// 一次正确的步数
	gg.errFlag = false;
	gg.synch_l = false;
	gg.totalStep = teach_flow.length;
}
gg.over = function(){
	// 游戏结束
	gg.tip_layer = null;
	gg.flow = null;
}
