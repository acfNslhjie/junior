var /**
	 * 
	 */
net = {
		server_url:md.server_url,
	saveScore:function(){
		// /expRec/upload/{userId}/{expVer}/{expId}/{isFinished}/{lastStep}/{score}/{level}/{beginTime}/{endTime}/{totalStep}/{rightStep}
		var url = this.server_url;
		url += "/expRec/upload";
		url += "/"+gg.userId;// userId
		url += "/"+gg.expVer;// expVer
		url += "/"+md.expId;// expId

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
	getSubject:function(cb){
		var url = "http://teach-platform.oss-cn-hangzhou.aliyuncs.com/experiment/jsonLib/subject.json";
		this.ajax(url, function(a1, a2, a3){
			cc.log(a1);
		});
	},
	ajax:function(url,func,method){
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