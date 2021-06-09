var $ = {
	checkNull:/**
				 * 检查是否为空
				 * 
				 * @param str
				 * @returns {Boolean}
				 */
	function(str){
		if(str == null || str == ""){
			return true;
		}
		return false;
	},
	sdf:function(date, format){
		return date.format("yyyyMMddhhmmss"); 
	},
	getQueryString:function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null){
			var result =  decodeURIComponent(r[2]);	
			return result;
		}
		return null;
	},
	getRandom:/**
				 * 取得随机数
				 * 
				 * @param max
				 * @returns {Number}
				 */
	function(max){
		var random = Math.round(Math.random() * max);
		if(random == max){
			random = max - 1;
		}
		return random;
	},
	format:/**
			 * 自动换行
			 * 
			 * @param str
			 * @param width
			 * @param fontSize
			 * @returns
			 */
	function(str, width, fontSize){
		if(str.split("\n").length >1){
			return str;
		}
		// 每行字数
		var size = parseInt(width / fontSize, 10);
		// 行数
		var line = parseInt(str.length / size, 10);
		if(str.length % size != 0){
			line ++;
		}
		var start = 0;
		var lines = "";
		for(var i = 0;i < line;i++){
			lines += str.substr(start, size);
			if((i + 1) < line){
				lines += "\n";
			}
			start += size;
		}
		return lines;
	},
	genBoundingBoxToWorld:/**
							 * 生成相对整个的bound，
							 * 区别于Node.genBoundingBoxToWorld，不涉及子节点
							 * 
							 * @param obj
							 * @returns
							 */
	function(obj){
		var rect = cc.rect(0, 0, obj.width, obj.height);
		var trans = obj.getNodeToWorldTransform();
		var bound = cc.rectApplyAffineTransform(rect, trans);
		return bound;
	},
	runScene:function(scene){
		cc.director.runScene(new cc.TransitionFade(gg.d_time, scene));
		//AngelListener.regListener(scene);
	},
	randomSort:function (a, b) {
		// 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		return Math.random()>.5 ? -1 : 1;
	},
	bezier:function(orig,target,time){
		var pos2 = cc.p(orig.x - (orig.x - target.x) / 2,orig.y - (orig.y - target.y) / 3);
		var pos1 = cc.p(orig.x - (orig.x - target.x) / 3,orig.y - (orig.y - target.y) / 2);
// var pos1 = cc.p((orig.x + target.x) / 3, (orig.y + target.y) / 3);
// var pos2 = cc.p((orig.x + target.x) / 2, (orig.y + target.y) / 2);
		var pos3 = target;
		return cc.bezierTo(time, [pos1, pos2, pos3]);
	},
	calWidthAndHeight:function(designWidth, designHeight){
		// define the design resolution
// var designWidth = 960;
// var designHeight = 640;
		// retrieve device resolution
		var deviceWidth = cc.visibleRect.width;
		var deviceHeight = cc.visibleRect.height;
		var k = 1, x = 0, y = 0;

		k = deviceWidth / designWidth;
		var scaledHeight = designHeight * k;
		if (scaledHeight <= deviceHeight) {
			y = (deviceHeight - scaledHeight);
		} else {
			k = deviceHeight / designHeight;
			var scaledWidth = designWidth * k;
			if (scaledWidth <= deviceWidth) {
				x = (deviceWidth - scaledWidth);
			} else {
				throw new Error("can't fit the screen!");
			}
		}
		// print out parameters
		cc.log("device width:" + deviceWidth);
		cc.log("device height:" + deviceHeight);
		cc.log("k:" + k + " x:" + x + " y:" + y);
		// resize the design resolution
		cc.view.setDesignResolutionSize(
				designWidth + x / k, designHeight + y / k,
				cc.ResolutionPolicy.SHOW_ALL);
		// after screen fitted
		cc.log("view width:" + cc.visibleRect.width + " view height:" + cc.visibleRect.height);
	}
};

Date.prototype.format = function(format){ 
	var o = { 
			"M+" : this.getMonth()+1, // month
			"d+" : this.getDate(), // day
			"h+" : this.getHours(), // hour
			"m+" : this.getMinutes(), // minute
			"s+" : this.getSeconds(), // second
			"q+" : Math.floor((this.getMonth()+3)/3), // quarter
			"S" : this.getMilliseconds() // millisecond
	} 
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 

