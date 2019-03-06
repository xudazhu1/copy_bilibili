
function show_message( type , page_num , account) {
	var type2 = type;
	if ( !(type.indexOf("_me") === -1) ) {
		type2 =  type.substring(0 , type.length-3);
	} 
		var dataR = new Object;
		dataR[account] = userData.accountId;
		dataR["type"] = type2;
		dataR["a_page_num"] = 15;
		dataR["page_num"] = 1;
		$.get("c_message" , dataR , function ( message_data ) {
			$(".fans_div").hide();
			$(".system_message").show();
			$(".system_message").empty();
			$(".system_message").append("<div class='message_title'>共"+message_data.all_num+"条</div>");
			$(message_data.messages).each(function ( index , message) {
				$(".system_message").append("<div id='message"+message.ID + "'></div>")
				workers_utils("message_string", {"type":type , "account":account ,"message":message } , function(evt){
					$("#message" + message.ID).append(evt.data)
				})
			})
		} , "json")
}

function fomatMessage(type , object) {
//	console.log(object)
	var str = ""
	if ( type ==="message" ) {
		str += "你关注的  <a>" + getUserData(object.from_account).nickname 
		+ "</a>投稿了新作品  <a target='_blank' href='video."+object.path+"'>" + object.video_json.title+"</a> 快去看看吧"
	} else if (type === "discuss_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  对你的作品  <a target='_blank' href='video."+object.video_ID+"'>" 
		+ object.video_json.title+"</a> 发表了评论 " + object.info;
	} else if (type === "discuss_praise_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  赞了你在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a >" 
		+ object.discuss_json.info  +"</a>"
	} else if (type === "subdiscuss_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  对你在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a  >" 
		+ object.discuss_json.info  +"</a>  做出了回复"
		+ "<a>" + object.info  +"</a>"
	} else if (type === "subdiscuss_praise_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  赞了你在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a   >" 
		+ object.subdiscuss_json.info  +"</a>"
	} else if (type === "video_praise_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  赞了你的作品  <a target='_blank' href='video."+object.video_ID+"'>" 
		+ object.video_json.title+"</a> 快去看看吧"
	} else if (type === "video_star_me") {
		str += "<a>" + object.account_json.nickname  + "</a>  收藏了你的作品  <a target='_blank' href='video."+object.video_ID+"'>" 
		+ object.video_json.title+"</a>"
	}    else if (type === "discuss") {
		str += "你对作品  <a target='_blank' href='video."+object.video_ID+"'>" 
		+ object.video_json.title+"</a> 发表了评论  " + object.info;
	} else if (type === "discuss_praise") {
		str += "你赞了  <a>" + object.target_json.nickname  + "</a>  在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a >" 
		+ object.discuss_json.info   +"</a> "
	} else if (type === "subdiscuss") {
		str += "你对  <a>" + object.target_json.nickname  + "</a>  在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a  >" 
		+ object.discuss_json.info   +"</a>做出了回复"
		+ "<a>" + object.info  +"</a>"
	} else if (type === "subdiscuss_praise") {
		str += "你赞了  <a>" + object.target_json.nickname  + "</a>  在 <a target='_blank' href='video."+object.video_json.ID+"'>" 
		+ object.video_json.title+"</a> 发布的评论  <a   >" 
		+ object.subdiscuss_json.info   +"</a>"
	} else if (type === "video_praise") {
		str += "你赞了  <a>" + object.target_json.nickname  + "</a>  的作品  <a target='_blank' href='video."+object.video_ID+"'>" 
		+ object.video_json.title+"</a> "
	}
	return str;
}
	

function flush_message_num() {
	if ( $.isEmptyObject(userData) ) {
		return false;
	}
	
	$(".message_btn").each(function() {
		var message_btn_temp = $(this);
		var id_attr = message_btn_temp.attr("id");
		if ( ! (id_attr.indexOf("_me") === -1) ) {
			
			$.get("c_message/unread_num" , {"target_account":userData.accountId , "type":id_attr.substring(0 , id_attr.length-3)} , function ( returnNum) {
				message_btn_temp.children(".badge").text( returnNum )
			})
			 
		} 
	})
	
}


function show_fans( fans_button ) {
	$(".system_message").hide();
	$(".fans_div").show();
	
	$(".list-group-item").css("background-color" , "")
	fans_button.css("background-color" , "lightblue")
	
	var account = fans_button.attr("name");
	var data_temp1 = new Object;
	data_temp1[account] = userData.accountId;
	$.get("account_star" , data_temp1 , function ( fans_data ) {
		$(".fans_div").empty();
		$(fans_data.account_star_data).each(function ( index , account_star ) {
			if ( account === "account_ID" ) {
				$(".fans_div").append("<img src='https://static.xudazhu.cn/img/head_img/"+account_star.star_account_ID+".png' class='main_head_img head_img_img' user_id='"+account_star.star_account_ID+"' >")
			} else {
				$(".fans_div").append("<img src='https://static.xudazhu.cn/img/head_img/"+account_star.account_ID+".png' class='main_head_img head_img_img' user_id='"+account_star.account_ID+"' >")
			}
		})
	} , "json")
}

//传入消息按钮的jq对象 来显示消息
function message_btn_click( message_btn ) {
	
	flush_message_num();
	
	var id_attr = message_btn.attr("id");
	if ( id_attr.indexOf("_me") === -1 ) {
		show_message(id_attr, 1, "from_account");
	} else {
		show_message(id_attr, 1, "target_account");
	}
	$(".list-group-item").css("background-color" , "")
	message_btn.css("background-color" , "lightblue")
}



function test_message() {
	flush_message_num();
	$("#video_star_me").css("background-color" , "lightblue")
	$(".message_btn").click(function() {
		message_btn_click($(this));
	})
	
	
}


function show_main_message() {
	var get_message1=get_message("video_star", "target_account", 3, 1);
	$(".main_star_my_video").empty();
	$(get_message1.messages).each( function ( index , message ) {
		$(".main_star_my_video").append("<div>"+fomatMessage("video_star_me", message)+"</div>")
	})
}


//布置分页按钮 传入参数是  当前页 总页数
function show_page_button(video_a_page_num , video_page_num , all_page_num) {
	$("#user_video_pages").empty();
	$("#user_video_pages")
			.append(
					"<button class='btn btn-xs btn-default startsPage' type='button'>首页</button>")
	$("#user_video_pages")
			.append(
					"<button class='btn btn-xs btn-default lastPage' type='button'>上一页</button>")
	for (var int = 1; int <= all_page_num; int++) {
		if (int >= video_page_num - 2 && int <= video_page_num + 2) {
			$("#user_video_pages").append(
					"<button class='button" + int
							+ " pageButton btn btn-xs  btn-default' type='button'>"
							+ int + "</button>");
		}
	}
	$("#user_video_pages").append(
					"<button class='btn btn-xs  btn-default nextPage' type='button'>下一页</button>"
							+ "<button class='btn btn-xs  btn-default endPage' type='button'>末页</button>"
							+ "<button class='btn btn-xs  btn-default ' type='button'>共"
							+ all_page_num
							+ "页</button>"
							+ "<input type='number' style='width: 70px;' class='btn btn-xs  btn-default inputPage' value='"
							+ video_page_num
							+ "'  >"
							+ "<button style='width: 50px;' class='btn btn-xs  btn-default inputPageButton' type='button' >Go!</button>"
							+ "<select style='width: 85px; float: right; height: 23px; padding: 0px;' class='form-control aPageNum'>"
							+ "<option>"
							+ video_a_page_num
							+ "</option>"
							+ "<option>10</option>"
							+ "<option>20</option>"
							+ "<option>50</option>"
							+ "<option>100</option>"
							+ "</select>")

	$(".button" + video_page_num).attr("class", "button" + video_page_num + "  btn btn-xs btn-primary");

		
//		pageBuuton++;
}



//更新用户信息
function upload_user() {
	//获取到选中的文件
	var head_img = document.querySelector("#head_img_file").files[0];
	var sex1 = "男";
	$(".sex").each(function(index) {
		//			alert($(this).parent("label").text())
		if($(this).prop("checked") == true) {
			sex1 = $(this).parent("label").text();
		}
	})
	
	var age1 = $("#user_age")[0].value;
	var info1 = $("#setting_user_info")[0].value;
	var nickname1 = $("#nickname")[0].value;
	//创建formdata对象
	var formdata = new FormData();
	if ( typeof (head_img) != "undefined") {
		console.log("youwenjian")
		formdata.append("headImg", head_img);
		if (head_img.size /1024 > 200 ) {
			alert("头像文件过大")
			return false;
		}
	} else {
		console.log("未选择头像文件")
	}
	formdata.append("sex", sex1);
	formdata.append("age", age1);
	formdata.append("info", info1);
	formdata.append("nickname", nickname1);
	//创建xhr，使用ajax进行文件上传
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "c_user");
//	xhr.setRequestHeader('Content-type','multipart/form-data');
	//回调
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.querySelector("#changed").innerText = xhr.responseText;
		}
	}
	//将formdata上传
	xhr.send(formdata);
}

function get_a_page_video(user_ID , video_a_page_num , video_page_num) {
	//拿到单页video数据
	var data2 = getVideo({"userBeanId": user_ID}, video_a_page_num , video_page_num , "upDate");
	all_page_num = data2.all_page_num;
	$(".video_all_num").text("共 "+data2.all_num+" 个视频");
	$(".video_num").text(data2.all_num);
	$(".videos").empty();
	$(data2.video_data).each(function(index , video) {
		$(".videos").append("<div class='video_a_div'>"
		+ "<div class='video_a_div_img_div'>"
		+"<a target='_blank' href='video."+video.id+"' title='"+video.title+"'>"
		+"<img src='https://static.xudazhu.cn/img/cover/"+video.coverId+".jpg' class='img-rounded video_img1' alt='cover'>"
		+"</a>"
		+"</div>"
		+"<div class='video_a_div_text'>"
		+"<a target='_blank' class='video_title' href='video.html?videoId="+video.id+"'>"+video.title+"</a>"
//		+"<span class='s_line'></span>"
		+"<a class='video_author'>"+video.id+"</a>"
		+"<span class='video_time'>"+formatDate(new Date(video.upDate.time))+"</span>"
		+"</div><div class='video_info'>"+video.info+"</div>"
		+"</div>").fadeIn(500);
	})
}


//显示某块div的方法 传入的是被点击的div的jq对象
function show_div(Adiv) {
	$(".main_div_a").each(function(){
		if ( $(this).attr("name") === Adiv.attr("name") ) {
			$(this).css("border-bottom" , "2px solid blue");
		} else {
			$(this).css("border-bottom" , "0px solid blue");
		}
	})
	
	
	var name = Adiv.prop("name");
	$(".next2").children("div").each(function(){
		if ( $(this).prop("class") == name ) {
			$(this).show();
		} else {
			$(this).hide();
		}
	})
}


//获取文件本地路径
function getObjectURL(file) {  
     var url = null;  
     if (window.createObjcectURL != undefined) {  
         url = window.createOjcectURL(file);  
     } else if (window.URL != undefined) {  
         url = window.URL.createObjectURL(file);  
     } else if (window.webkitURL != undefined) {  
         url = window.webkitURL.createObjectURL(file);  
     }  
     return url;  
 }


 function logined ( userData ) {
     navLogined( userData );

     $(".head_img2").attr("src" , "https://static.xudazhu.cn/img/head_img/"+userData.headImg+".png" );
     $(".icon_uid").next().text(userData.accountId) ;
     $("#user_age")[0].value = userData.age;
     $("#setting_user_info")[0].value = userData.info;
     $("#h-sign")[0].value = userData.info;
     $("#nickname")[0].value = userData.nickname;
     $("#h-name").text(userData.nickname);

     if ( userData.sex == "男") {
         $("#h-gender").css("background-position-y" , "-472px")
     } else if (userData.sex == "女") {
         $("#h-gender").css("background-position-y" , "-404px")
     } else {
         $("#h-gender").css("background-position-y" , "-536px")
     }

     $(".sex").each(function(index) {
//			alert($(this).parent("label").text() + " = " + data.sex )
         if($(this).parent("label").text() == userData.sex ) {
//				alert("true")
             $(this).prop("checked" , "checked");
         } else {
//				alert("false")
//				$(this).prop("checked" , "none");
         }
     })


     $(".user_add_time").text("注册于 " + formatDate(new Date(userData.addTime.time)))
     show_message("video_star_me", 1, "target_account");
     test_message();
     show_main_message();

     // $.get("account_star/get_letter_fans" , function ( fans_data) {
     //     $(".my_fans_num").text(fans_data.my_fans_num);
     //     $(".my_star_num").text(fans_data.my_star_num);
     //     $(fans_data.my_fans).each(function ( index , fans ) {
     //         $(".my_fans_title").after("<img src='https://static.xudazhu.cn/img/head_img/"+fans.account_ID+".png' class='main_head_img head_img_img' user_id='"+fans.account_ID+"'>")
     //     })
     //     $(fans_data.my_star).each(function ( index , star1 ) {
     //         $(".my_star_title").after("<img src='https://static.xudazhu.cn/img/head_img/"+star1.star_account_ID+".png' class='main_head_img head_img_img' user_id='"+star1.star_account_ID+"'>")
     //     })
     // } , "json")

     get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
     show_page_button(video_a_page_num, video_page_num, all_page_num);
 }

//默认每页显示10条上传的video数据
var video_a_page_num = 10 ;
//页数初始值为1
var video_page_num = 1 ;
//所有的页数
var all_page_num = 1;

$(function() {
	// $.get("c_user" , function ( userData1) {
	// 	userData = userData1;
		// $(".user_add_time").text("注册于 " + formatDate(new Date(userData1.addTime.time)))
		// show_message("video_star_me", 1, "target_account");
		// test_message();
		// show_main_message();
		//
		// $.get("account_star/get_letter_fans" , function ( fans_data) {
		// 	$(".my_fans_num").text(fans_data.my_fans_num);
		// 	$(".my_star_num").text(fans_data.my_star_num);
		// 	$(fans_data.my_fans).each(function ( index , fans ) {
		// 		$(".my_fans_title").after("<img src='https://static.xudazhu.cn/img/head_img/"+fans.account_ID+".png' class='main_head_img head_img_img' user_id='"+fans.account_ID+"'>")
		// 	})
		// 	$(fans_data.my_star).each(function ( index , star1 ) {
		// 		$(".my_star_title").after("<img src='https://static.xudazhu.cn/img/head_img/"+star1.star_account_ID+".png' class='main_head_img head_img_img' user_id='"+star1.star_account_ID+"'>")
		// 	})
		// } , "json")
		//
		// get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		// show_page_button(video_a_page_num, video_page_num, all_page_num);
	// } , "json")
	
	$(".fans_button").click(function () {
		show_fans($(this));
	})
	
	
	//注册翻页按钮
	$(document).on("change", ".aPageNum", function() {
		video_a_page_num = parseInt(this.value);
		video_page_num = 1;
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})

	$(document).on("click", ".inputPageButton", function() {
		var inputNum = parseInt($(".inputPage")[0].value);
		if( inputNum > all_page_num || inputNum < 1 ) {
			alert("输入的页数不在范围内");
			return;
		}
		video_page_num = inputNum;
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})

	$(document).on("click", ".pageButton", function() {
		video_page_num = parseInt($(this)[0].textContent);
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})
	$(document).on("click", ".startsPage", function() {
		video_page_num = 1;
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})
	$(document).on("click", ".lastPage", function() {
		if ( video_page_num == 1) {
			alert("已经是第一页啦 !");
			return;
		}
		video_page_num = parseInt(video_page_num - 1);
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})
	$(document).on("click", ".nextPage", function() {
		if ( video_page_num == all_page_num) {
			alert("已经是最末页啦 !");
			return;
		}
		video_page_num = parseInt(video_page_num + 1);
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})
	$(document).on("click", ".endPage", function() {
		video_page_num = all_page_num;
		get_a_page_video(userData.accountId , video_a_page_num , video_page_num);
		show_page_button(video_a_page_num, video_page_num, all_page_num);
	})
	
	
	//头页那儿快捷编辑个性签名
	$("#h-sign").blur(function() {
		$.get("c_user" , function(data){
			data.info = $("#h-sign")[0].value;
			data.add_time = formatDate(new Date(data.add_time.time));
			data._method = "PUT";
			$.post("c_user" , data , function(dataR) {
				alert(dataR)
			})
			
		} , "json")
	})
	
	$("#head_img_file").change(function(){
		var file = this.files[0];
     	var url = getObjectURL(file);
//   	alert(url)
		$(this).next().attr("src" , url );
	})
	
	$("#cover").change(function(){
		var file = this.files[0];
     	var url = getObjectURL(file);
     	$(this).next().attr("src" , url );
	})
	
	//获取网址后面的div属性来决定显示哪儿块div
	var url = decodeURIComponent(window.location.search);  
	var loc = url.substring(url.lastIndexOf('=')+1, url.length);
	
	if ( loc != "" ) {
		show_div($("." + loc ));
	}
	
	//点击某个子页 显示某个div 下面还画条蓝色的底
	$(".main_div_a").click(function(){
		show_div($(this));
	})
	
	
	
	
	
	
// 	//获取登录用户信息
// 	$.get("c_user" , function(data){
// 		$(".head_img2").attr("src" , "https://static.xudazhu.cn/img/head_img/"+data.headImg+".png" );
// 		$(".icon_uid").next().text(data.accountId) ;
// 		$("#user_age")[0].value = data.age;
// 		$("#setting_user_info")[0].value = data.info;
// 		$("#h-sign")[0].value = data.info;
// 		$("#nickname")[0].value = data.nickname;
// 		$("#h-name").text(data.nickname);
//
// 		if ( data.sex == "男") {
// 			$("#h-gender").css("background-position-y" , "-472px")
// 		} else if (data.sex == "女") {
// 			$("#h-gender").css("background-position-y" , "-404px")
// 		} else {
// 			$("#h-gender").css("background-position-y" , "-536px")
// 		}
//
// 		$(".sex").each(function(index) {
// //			alert($(this).parent("label").text() + " = " + data.sex )
// 			if($(this).parent("label").text() == data.sex ) {
// //				alert("true")
// 				$(this).prop("checked" , "checked");
// 			} else {
// //				alert("false")
// //				$(this).prop("checked" , "none");
// 			}
// 		})
//
//
// 	} , "json");
	
	
	
	
	
	
	//上传视频那儿的分区(频道)
	$.get("c_section", function(data) {
		$(".section_li").empty();
		$(data).each(function(index, section) {
			$(".section_li").append("<li>" + section.name + "</li>");
		})
	}, "json")

	$(document).on("mouseenter", ".dropdown-menu li", function() {
		$(this)[0].style.backgroundColor = "cornflowerblue";
	})

	$(document).on("mouseleave", ".dropdown-menu li", function() {
		$(this)[0].style.backgroundColor = "white";
	})

	$(document).on("click", ".subSection_li li", function() {
		$(this).parent().prev().html($(this).text());
	})
	$(document).on("click", ".section_li li", function() {
		$(this).parent().prev().html($(this).text());
		subsection_json = getSubSection($(this).text());
		$(".subSection_li").empty();
		$(subsection_json).each(function(index, section) {
			$(".subSection_li").append("<li>" + section.name + "</li>");
			if(index === 0) {
				$("#subSection").text(section.name);
			}
		})
	})

	$("#setting_submit").click(function(){
		upload_user();
	})
	
	$(document).on("click", ".is_read", function() {
		if ( $(this).text()==="已读" ) {
			return fasle;
		}
		var r_type_id=$(this).attr("r_type_id");
		var type = r_type_id.substring(0 , r_type_id.indexOf("?"));
		var ID = r_type_id.substring(r_type_id.indexOf("?")+1 , r_type_id.length);
		var read_message2 = read_message(type, ID);
		if( read_message2 === "true" ) {
			$(this).text("已读");
			flush_message_num();
		} else {
			alert("错误, 请刷新页面")
		}
	})
		
	//注册主页的消息的更多那块儿的按钮
	$(".show_message_page").click(function () {
		//先切换到消息分页
		show_div($(".nav_dynamic_div"));
		//再显示要显示的消息
		message_btn_click($("#"+$(this).attr("name")));
	})
	
	//注册主页的关注的更多那块儿的按钮
	$(".main_option_info").click(function () {
		//先切换到消息分页
		show_div($(".nav_dynamic_div"));
		//再显示要显示的消息
		show_fans($("#"+$(this).attr("name")));
	})


})