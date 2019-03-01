

var dp;
var videoData;
var url = decodeURIComponent(window.location.href);  
var videoId = url.substring(url.lastIndexOf('.')+1, url.length);

$(function() {
	var  user = "游客";
	if( url.indexOf(".") === -1 ) {
		alert("我凑 , 被你发现了")
	}
	$.ajax({
		type : "get",
		async : true,
		url : "c_video?id=" + videoId,
		processData : true,
//		data : data1,
		dataType : "json",
		success : function(data) {
			videoData = data.video_data[0];
			var vplayer_type = videoData.type == 'mp4' ? "auto" : videoData.type;
			gettedVideoData(videoData);
			
			$("title").text(videoData.title + "-视频播放-哔哩哔哩·假");
			dp = new DPlayer({
			    container: document.getElementById('dplayer'),
			    autoplay: false,
			    theme: '#FADFA3',
			    loop: false,
			    screenshot: false, //截屏
			    hotkey: true,
			    video: {
			    	quality: [
//			    	          {
//			            name: '720p',
//			            url: 'https://static.xudazhu.cn/video/让我留在你身边.mp4'
//			        },{
//			            name: '1080p',
//			            url: 'https://static.xudazhu.cn/video/让我留在你身边.mp4'
//			        }, 
			        {
			            name: '原画',
			            url: 'https://static.xudazhu.cn/video/'+videoData.videoId+'.' + videoData.type
			        }],
			        defaultQuality: 0,
			        pic: 'https://static.xudazhu.cn/img/cover/'+videoData.coverId+'.png',
			        type: vplayer_type,
//			        pic: 'demo.jpg',
//			        thumbnails: 'thumbnails.jpg'
			    },
			    subtitle: {
			        url: 'webvtt.vtt'
			    },
			    danmaku: {
			        id: 'easy_copy_bilibili_' + videoId,
			        api: 'https://api.xudazhu.cn/',
			        user: 'easy_copy_bilibili_' + user
			    }
			});
			//设置弹幕作者
			$.get("c_user" , function( userData2 ) {
				if (! $.isEmptyObject(userData2)) {
					dp.danmaku.options.api.user = "easy_copy_bilibili_" + userData2.accountId + "";
				}
			} , "json")
			getdanma();
			//监听弹幕发送事件
			dp.on('danmaku_send', function () {
				getdanma();
			});
			//背景白色(针对png透明优化)
			$(".dplayer-video-current").css("background-color" , "black");
			$(".dplayer-video-current").css("margin" , "0 auto");
//			$(".dplayer-video-current").css("object-fit" , "fill");
//			$(".dplayer-video-current").css("height" , $(".dplayer-video-current").width() * 0.62 + "px");
//			$(".dplayer-comment").hide();
		},
		
		
		error : function (data) {
			dp = new DPlayer({
			    container: document.getElementById('dplayer'),
			    autoplay: false,
			    theme: '#FADFA3',
			    loop: false,
			    screenshot: true, //截屏
			    hotkey: false,
			    video: {
			    	quality: [{
			            name: '720p',
			            url: 'https://static.xudazhu.cn/video/让我留在你身边.mp4'
			        },{
			            name: '1080p',
			            url: 'https://static.xudazhu.cn/video/让我留在你身边.mp4'
			        }, {
			            name: '超清',
			            url: 'https://static.xudazhu.cn/video/让我留在你身边.mp4'
			        }],
			        defaultQuality: 0,
			        pic: '',
			        type: 'auto',
//			        pic: 'demo.jpg',
//			        thumbnails: 'thumbnails.jpg'
			    },
			    subtitle: {
			        url: 'webvtt.vtt'
			    },
			    danmaku: {
			        id: 'xudazhu',
			        api: 'https://api.xudazhu.cn/',
			        user: 'easy_tester'
			    }
			});
			
		}
		
		
	
	});
	setTimeout(function () {
		$(".dplayer-full-in-icon").css({"position": "static", "display": "inline-block"})
	}, 500);
	
	
	
	
	
//	$.get("SelectVideo4ID?ID=" + videoId , function(data) {
//		
//	} , "json")
	
})