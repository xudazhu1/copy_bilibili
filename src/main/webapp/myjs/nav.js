
// var userData ;

function navLogined( userData ) {
    $(".my_head_img").attr("src" ,"https://static.xudazhu.cn/img/head_img/"+userData.headImg+".png" );
    $(".table_right_tr").empty();
    $(".table_right_tr").append("<td class='header1_td'><a target='_blank' href='user.html'><div><img class='head_img' src='https://static.xudazhu.cn/img/head_img/"+userData.headImg+".png'/></div></a></td>" +
        "<td class='header1_td'><a href='user.html?div=nav_star_div'><div>&nbsp;收藏夹&nbsp;</div></a></td>" +
        "<td class='header1_td'><a class='nav_message' href='user.html?div=nav_dynamic_div'><div>&nbsp;消息" +
        "<span class='badge nav_message_num'>0</span>&nbsp;</div></a></td>" +
        "<td class='header1_td'><a href='history.html'><div>&nbsp;历史&nbsp;</div></a></td>");
    $.get( "c_message/unread_num" , {"target_account" : userData.accountId} , function ( unread_data) {
        $(".nav_message_num").text(unread_data)
    })
}


$(function(){

	var timeout = 1;
	$("#nav_temp").mouseenter(function(){
	}).mouseleave(function(){
		clearTimeout(timeout);
		$("#nav_temp").stop();
		$("#nav_temp").hide();
	})
	
	//鼠标停留
	$(document).on("mouseenter",".head_img",function(){
//	$(".header1_td ").mouseenter(function(){
		var td1 = $(this);
		var index = td1.offset();
		timeout = setTimeout(function(){
			$("#nav_temp").stop();
		$("#nav_temp").append().fadeIn(400);
		$("#nav_temp").css("position" , "absolute");
		$("#nav_temp").css("border-radius" , "6px");
		$("#nav_temp").css("margin-top" , "5px");
		$("#nav_temp").show();
		$("#nav_temp").css("border-color" , "#ccc");
		$("#nav_temp").css("left" , index.left+"px");
		$("#nav_temp").css("top" , (index.top+td1.height())+"px");
		$("#nav_temp").css("background-color" , "white");
		} , 500);
		
	})
	//鼠标离开
	
	$(document).on("mouseleave",".header1_td",function(){
//	.mouseleave(function(){
		//调用方法判断鼠标是否在新出现的div里
		if ( !  inner($("#nav_temp"))) {
			clearTimeout(timeout);
			$("#nav_temp").stop();
			$("#nav_temp").hide();
		}
		
		
	})
	
	
	
	//注册登出按钮
	$(document).on("click" , "#logout" , function(){
		$.post("c_account/logout" , function(data) {
			alert(userData.nickname + " : " + data)
			userData = null;
			window.location.reload();
		})
	})
	
	
	
	
	
	
	
})


