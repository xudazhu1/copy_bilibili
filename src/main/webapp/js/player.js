


const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: false,
    theme: '#FADFA3',
    loop: false,
    screenshot: true, //截屏
    hotkey: false,
    video: {
    	quality: [{
            name: '普清',
            url: 'media/200GANA-1785.mp4'
        },{
            name: '高清',
            url: 'media/200GANA-1785.mp4'
        }, {
            name: '超清',
            url: 'media/200GANA-1785.mp4'
        }],
        defaultQuality: 0,
        pic: '',
        type: 'auto',
//        pic: 'demo.jpg',
//        thumbnails: 'thumbnails.jpg'
    },
    subtitle: {
        url: 'webvtt.vtt'
    },
    danmaku: {
        id: 'xudazhu',
        api: 'https://api.prprpr.me/dplayer/'
    }
});

$(function() {
	
})