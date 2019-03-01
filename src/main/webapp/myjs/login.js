

function mobile_move(){
	//滑块div鼠标按下事件
	$(document).on("touchstart" , "#huakuai_button" , function(e) {
		//禁止页面滚动
		document.addEventListener('touchmove', function (event) {
		    window.event.returnValue = false;
		}, false);
		document.addEventListener('touchmove', function (event) {
		    event.preventDefault();
		}, false);
		document.documentElement.style.overflow='hidden';
		document.body.style.overflow='hidden';
		
		//获取div的位置
		var left = parseInt($("#huakuai_button").css("left"));
		var top = parseInt($("#huakuai_button").css("top"));
		//获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY(大写)
		var touch1 = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		var downx =touch1.pageX || touch1.clientX;
		var downy =touch1.pageY || touch1.clientY;
//		console.log("downx =" + downx + "  downy  = " + downy)
		//  鼠标按下时给要移动的div挂事件
		$("#huakuai_button").bind("touchmove", function(es) {
			//es.pageX,es.pageY:获取鼠标移动后的坐标
//			console.log("a")
			var touch1 = es.originalEvent.touches[0] || es.originalEvent.changedTouches[0];
			var endx = touch1.pageX - downx + left; //计算div的最终位置
			var endy = touch1.pageY - downy + top;
//			console.log("b")
			//设置移动的坐标
			$("#heikuai").css("left", endx + "px")
		});
	})
	//滑块div鼠标弹起事件
	$(document).on("touchend" , "#huakuai_button" , function() {
		document.body.style.overflow='auto';
		var a = $("#heikuai_x").offset().left - $("#heikuai").offset().left ;
		if ( a > -3 && a < 3 ) {
			$("#tishi").text("验证通过")
			huakuai =  true;
		} else {
			$("#tishi").text("验证失败")
			$("#heikuai").css("left",  "0px");
			huakuai = false;
		}
		$("#huakuai_button").unbind("mousemove")
	})
	
	$("#huakuai_button").mouseleave(function(){
		$("#huakuai_button").unbind("mousemove");
	})
}

function desktop_move() {
	//滑块div鼠标按下事件
	$("#huakuai_button").mousedown(function(e) {
		//获取div的位置
		var left = parseInt($("#huakuai_button").css("left"));
		var top = parseInt($("#huakuai_button").css("top"));
		//获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY(大写)
		var downx = e.pageX;
		var downy = e.pageY; 
		//  鼠标按下时给要移动的div挂事件
		$("#huakuai_button").bind("mousemove", function(es) {
			//es.pageX,es.pageY:获取鼠标移动后的坐标
			var endx = es.pageX - downx + left; //计算div的最终位置
			var endy = es.pageY - downy + top;
			//设置移动的坐标
			$("#heikuai").css("left", endx + "px")
		});
	})
	//滑块div鼠标弹起事件
	$("#huakuai_button").mouseup(function() {
		
		var a = $("#heikuai_x").offset().left - $("#heikuai").offset().left ;
		if ( a > -3 && a < 3 ) {
			$("#tishi").text("验证通过")
			huakuai =  true;
		} else {
			$("#tishi").text("验证失败")
			$("#heikuai").css("left",  "0px");
			huakuai = false;
		}
		$("#huakuai_button").unbind("mousemove")
	})
	
	$("#huakuai_button").mouseleave(function(){
		$("#huakuai_button").unbind("mousemove");
	})
}


var huakuai =false;
//var mousetype  = user_agent_type() ?  "mouseenter" : "mousedown";
$(function(){
	
//	user_agent_type() ? mobile_move() : desktop_move() ;
	mobile_move();
	desktop_move();
	
	var email = false;
	
	
	$("#email").blur(function(){
		if (! /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test($(this)[0].value)) {
			$(".error_email").text("不是正确的邮箱格式");
			return false;
		} else {
			$(".error_email").text("");
			email = true;
		}
		
		
	})
	
	
	$("#submit").click(function(){
		
		if (! huakuai ) {
			$(".is_login").text("滑动滑块来验证");
			return false;
		}
		var url = decodeURIComponent(window.location.search);  
		var loc = url.substring(url.indexOf('=')+1, url.length);
		if ( email ) {
			var data1 = new Object;
			data1["email"] = $("#email")[0].value;
			data1["password"] = $("#password")[0].value;
			$.post("c_account/login" , data1 , function(data){
				if(data === "true") {
					$(".is_login").text("登陆成功 即将跳转");
					$("#add_cookie").attr("src" , "https://api.xudazhu.cn/add_cookie.html?"+ getCookie("SESSION"));
					setTimeout(function(){
						if ( loc != "" ) {
							window.location.href=loc;
						} else {
							window.location.href="index";
						}
					} , 500 )
				} else {
					$(".is_login").text("邮箱或密码错误");
				}
			})
			
		}
	})
	
	
	
})
	