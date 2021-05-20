var PlayMusic = Music.extend({
	bg_flag:false,
	ctor:function(){
		this.bg_flag = false;
		this.effFlag = false;
	},
	clever:function(){
		this.playEffect(res_run.ok_mp3)
	},
	error:function(){
		this.playEffect(res_run.error_mp3)
	},
	playBg:function(){
		this.playMusic(res_start.bg_mp3);
	},
	cPause:function(){
		this.effFlag = false;
		this.pause();
	},
	cResume:function(){
		this.effFlag = true;
		if(!this.bg_flag){
			this.bg_flag = true;
			//this.playBg();
		} else {
			this.resume();
		}
	},
	isStop:function(){
		this.bg_flag = false
		return !this.effFlag;
		return this.Bg_flag;
	},
	clock:function(){
		this.playEffect(res_run.clock_mp3, true);
	},
	stopClock:function(){
		cc.audioEngine.stopAllEffects();
	},
	over:function(){
		this.playEffect(res_finish.over_mp3, true);
	}
});