var /**
	 * 音乐封装类
	 */
Music = cc.Class.extend({
		effFlag : true,
		curVolume : 1,
		marign : 0.1,
		playMusic:/**
					 * 播放背景音乐
					 * 
					 * @param music
					 *            音乐资源
					 * @param loop
					 *            是否重复， 默认重复
					 */
		function(music, loop){
			if(this.effFlag && music != null){
				if(loop == null){
					loop = true;
				}
				cc.audioEngine.playMusic(music, loop);
			}
		},
		playEffect:/**
					 * 播放音效
					 * 
					 * @param effect
					 *            音效资源
					 * @param loop
					 *            是否重复，默认不重复
					 */
		function(effect, loop){
			if(this.effFlag && effect != null){
				if(loop == null){
					loop = false;
				}
				cc.audioEngine.playEffect(effect, loop);
			}
		},
		ban:/**
			 * 禁止播放音乐
			 */
			function(){
			this.effFlag = false;
			this.stop();
		},
		lift:/**
				 * 解除禁止
				 */
			function(){
			this.effFlag = true;;
		},
		up:/**
			 * 提高音量
			 * 
			 * @returns {Boolean}
			 */
		function(){
			this.curVolume = cc.audioEngine.getMusicVolume();
			if(this.curVolume == 1){
				return false;
			}
			this.curVolume += this.marign;
			this.setVolume(this.curVolume);
			return true;
		},
		down:/**
				 * 降低音量
				 * 
				 * @returns {Boolean}
				 */
		function(){
			this.curVolume = cc.audioEngine.getMusicVolume();
			if(this.curVolume == 0){
				return false;
			}
			this.curVolume -= this.marign;
			this.setVolume(this.curVolume);
			return true;
		},
		mute:/**
				 * 静音
				 */
		function(){
			this.curVolume = cc.audioEngine.getMusicVolume();
			this.setVolume(0);
		},
		isMute:/**
				 * 是否静音
				 */
		function(){
			var vol = cc.audioEngine.getMusicVolume();
			if(vol == 0){
				return true;
			} else {
				return false;
			}
		},
		noMute:/**
				 * 静音恢复
				 */
		function(){
			this.setVolume(this.curVolume);
		},
		setVolume:/**
					 * 设置音量
					 * 
					 * @param volume
					 *            0 ~ 1, 0静音
					 */
		function(volume){
			cc.audioEngine.setMusicVolume(volume);
			cc.audioEngine.setEffectsVolume(volume);
		},
		stop:/**
				 * 停止音乐
				 */
		function(){
			cc.audioEngine.stopMusic();
			cc.audioEngine.stopAllEffects();
		},
		resume:/**
				 * 恢复
				 */
			function(){
			cc.audioEngine.resumeAllEffects()
			cc.audioEngine.resumeMusic()
		},
		pause:/**
				 * 暂停播放
				 */
		function(){
			cc.audioEngine.pauseMusic();
			cc.audioEngine.pauseAllEffects();
		}
});

/*-
/**
 * 音乐封装示例
var MusicDemo = Music.extend({
	playBg:function(){
		this.playMusic(res.bg_mp3);
	}
});
/**
 * 初始化
var _ = new MusicDemo();
_.playBg();
*/