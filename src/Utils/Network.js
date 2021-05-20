var /**
	 * 网络封装类
	 */
net = {
		server_url:'http://121.40.195.52:8080/teach_platform/service',
	saveScore:function(){
		// /expRec/upload/{userId}/{expVer}/{expId}/{isFinished}/{lastStep}/{score}/{level}/{beginTime}/{endTime}/{totalStep}/{rightStep}
		var url = this.server_url;
		url += "/expRec/upload";
		url += "/"+gg.userId;// userId
		url += "/"+gg.expVer;// expVer
		url += "/"+gg.expId;// expId

		url += "/"+1;// isFinished,1已过关
		url += "/"+gg.lastStep;// lastStep
		url += "/"+gg.score;// score
		url += "/"+gg.teach_type;// level
		url += "/"+$.sdf(gg.begin_time,'yyyyMMddhhmmss');// beginTime
		url += "/"+$.sdf(gg.end_time,'yyyyMMddhhmmss');// endTime
		url += "/"+gg.totalStep;// totalStep
		url += "/"+gg.totalStep;// rightStep
		cc.log("提交成绩:" + url);
		this.ajax(url);
	},
	ajax:/**
			 * @param url
			 *            请求的url
			 * @param func
			 *            回调方法
			 * @param method
			 *            请求类型 GET POST
			 */
	function(url,func,method){
		var xhr = cc.loader.getXMLHttpRequest();
		if(method != null){
			xhr.open(method, url);
		} else {
			xhr.open("GET", url);	
		}
		if(func != null){
			xhr.onreadystatechange = func.bind(xhr);	
		}
		xhr.send();
	}
};