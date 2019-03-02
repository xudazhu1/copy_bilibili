

//封装多线程工具(调用workers.js)

function workers_utils(method , object , function_a){
	var worker =new Worker("workers.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
	 worker.postMessage({"method" : method , "object": object});
	 worker.onmessage =function_a;//接收worker传过来的数据函数
}


//通用get
function get_some(url , object) {
	var dataR1 = new Object;
	$.ajax({
		type : "get",
		async : false,
		url : url,
		processData : true,
		data : object,
		dataType : "json",
		success : function(data) {
			dataR1 = data;
		}
	});
	return dataR1;
}

function get_message(type , account , a_page_num , page_num) {
	if ( $.isEmptyObject(userData) ) {
		return new Object;
	}
	var dataR1 = new Object;
	var dataR = new Object;
	dataR[account] = userData.account_ID;
	dataR["type"] = type;
	dataR["a_page_num"] = a_page_num;
	dataR["page_num"] = page_num;
	$.ajax({
		type : "get",
		async : false,
		url : "c_message",
		processData : true,
		data : dataR,
		dataType : "json",
		success : function(data) {
			dataR1 = data;
		}
	});
	return dataR1;
}

function get_message_unread_num( type , target_account ) {
	var dataR1 = "0";
	var data_message_temp = new Object;
	data_message_temp["target_account"] = target_account;
	if ( type != null && type != "" ) {
		data_message_temp["type"] = type.substring(0 , type.length-3);
	}
	$.ajax({
		type : "get",
		async : false,
		url : "c_message/unread_num",
		processData : true,
		data : data_message_temp,
		dataType : "text",
		success : function(data) {
			dataR1 = data;
		}
	});
	return dataR1;
}


function read_message(type , ID) {
	var dataR1;
	var formData = new FormData();
	formData.append("ID" , ID);
	formData.append("type" , type);
	$.ajax({
		type : "PUT",
		async : false,
		url : "c_message/read",
		processData:false,
		contentType:false,
        data : formData,
		dataType : "text",
		success : function(data) {
			dataR1 = data;
		}
	});
	return dataR1;
}

//判断鼠标是否在某元素内 传入参数是元素的jq对象
function inner(div) {
	var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
	var y1 = div.offset().top;  
	//div上面两个的点的y值
	var y2 = y1 + div.outerHeight();
	//div下面两个点的y值
	var x1 = div.offset().left;  
	//div左边两个的点的x值
	var x2 = x1 + div.outerWidth();  
	//div右边两个点的x的值
	if( x < (x1-2) || x > (x2+2) || y < (y1-4) || y > (y2+4) ) {
//		alert('鼠标不在该DIV中');
		return false;
	}else{
//		alert('鼠标在该DIV中');
		return true;
	};
}


//分页获取video subSection_ID/author_ID 条件二选一 a_page_num : 每页数量 , page_num: 当前请求页 condition : 用来排序的列(默认降序 也就是值越大 越靠前)
function getVideo(object1, a_page_num, page_num , condition) {
	var dataR1 = new Object;
//	var formdata = new FormData();
//	$.each(keys , function ( i , n ) {
//		formdata.append(keys[i], values[i]);
//	})
//	formdata.append("condition", condition);
//	formdata.append("a_page_num", a_page_num);
//	formdata.append("page_num", page_num);
	object1["condition"] = condition;
	object1["a_page_num"] = a_page_num;
	object1["page_num"] = page_num;
	$.ajax({
		type : "get",
		async : false,
		url : "c_video",
		processData : true,
		data : object1,
		dataType : "json",
		success : function(data) {
			dataR1 = data;
		}
	});

	return dataR1;
}


//分页获取video subSection_ID/author_ID 条件二选一 a_page_num : 每页数量 , page_num: 当前请求页 condition : 用来排序的列(默认降序 也就是值越大 越靠前)
// select video   or版本 传入查询条件已$分割 如subSection_ID传入的是 "1$2$3" 会查询subSection_ID=1 或者=3 或者=3的结果
function getVideo_or(object1, a_page_num, page_num , condition) {
	var dataR1 = new Object;
	object1["condition"] = condition;
	object1["a_page_num"] = a_page_num;
	object1["page_num"] = page_num;
	
	$.ajax({
		type : "get",
		async : false,
		url : "c_video/or",
		processData : true,
		data : object1,
		dataType : "json",
		success : function(data) {
			dataR1 = data;
		}
	});

	return dataR1;
}

var timeout2;

var userData  ;

	$(function() {
		$.get("c_user" , function ( data ) {
		    if ( ! $.isEmptyObject(data)) {
                userData = data;
                logined(userData);
            }
		} , "json")
		
			//鼠标停留
		$(document).on("mouseenter",".head_img_img",function(){
			show_user_info($(this));
		})
		//鼠标离开
		$(document).on("mouseleave",".head_img_img",function(){
			hide_user_info($(this));
		})
		$(document).on("mouseleave","#user_info",function(){
			$(this).hide();
		})
		
		$("#user_info_star_button").click(function() {
			if ( $.isEmptyObject(userData)) {
				alert("您还未登录 不能关注哦 ! ")
				return false;
			} else {
				$.get("account_star/click" , {"star_account_ID":$("#user_info_star_button").attr("user_id") , "account_ID": userData.account_ID} , function ( msg ) {
					alert( msg )
				})
			}
		})
		
		
		
	})
	
	
function show_user_info( dom1) {
//		var td1 = $(this);
		timeout2 = setTimeout(function(){
			$.get("c_user" , {"ID": dom1.attr("user_id")} , function ( userData_2 ) {
				$("#user_info_head_img").attr("src" , "https://static.xudazhu.cn/img/head_img/"+userData_2.headImg+".png");
				$("#user_info_name").text(userData_2.nickname);
				$("#user_info_gender").removeClass("gender_img_boy");
				$("#user_info_gender").removeClass("gender_img_girl");
				if ( userData_2.sex == "男" ) {
					$("#user_info_gender").addClass("gender_img_boy");
				} else if ( userData_2.sex == "女" ) {
					$("#user_info_gender").addClass("gender_img_girl");
				} 
				
				$("#user_info_info").text(userData_2.info);
				$("#user_info_title").attr("title" , userData_2.info);
				$("#user_info_star_button").attr("user_id" , userData_2.account_ID);
				if ( ! $.isEmptyObject(userData)) {
					$.get("account_star/has" , {"star_account_ID":$("#user_info_star_button").attr("user_id") , "account_ID": userData.account_ID} , function ( has ) {
						$("#user_info_star_button").text(has)
					})
				}
				var index = dom1.offset();
					$("#nav_temp").stop();
					$("#user_info").append().fadeIn(400);
					$("#user_info").show();
					$("#user_info").css("left" , index.left+"px");
					$("#user_info").css("top" , (index.top-159)+"px");
	//		$("#user_info").css("top" , (index.top+dom1.height())+"px");
			} , "json")
		} , 500);
}
	
function hide_user_info( dom1) {
	if ( !  inner($("#user_info"))) {
		console.log("inner false")
		clearTimeout(timeout2);
		$("#user_info").stop();
		$("#user_info").hide();
	}
}



function getUserData(ID) {
//	alert("aaa")
	var userData_1;
	var url;
	if ( ID != null ) {
		url = "c_user?ID=" + ID;
	} else {
		url = "c_user";
	}
	$.ajax({
		type : "get",
		async : false,
		url : url,
		processData : true,
//		data : data1,
		dataType : "json",
		success : function(data) {
			userData_1 = data;
		}
	});
	return userData_1;
}

// 格式化时间
function formatDate(now) {
	var year = now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();
	var month = now.getMonth() + 1  < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
	var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
	var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
	var minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
	var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":"
			+ second;
}

//获取赞或者收藏 数量 传入参数是请求的url 和参数名 参数值
function get_praise_star_num ( url , object1) {
//	var data_temp = new Object;
//	var data_temp = new FormData();
//	$.each(keys , function ( i , n ) {
//		data_temp.append(keys[i], values[i]);
//	})
	var return1;
	$.ajax({
		type : "get",
		async : false,
		url : url,
		processData : true,
		data : object1,
		dataType : "text",
		success : function(data) {
			return1 = data;
		}
	});
	return return1;
}

//获取 是否赞过/收藏过 传入参数是请求的url 和参数名 参数值
function get_praise_star_has ( url ,object1) {
	if (  $.isEmptyObject(userData) ) {
		return "black";
	}
	var account_ID_temp =userData.account_ID;
//	var data_temp = new FormData();
//	$.each(keys , function ( i , n ) {
//		data_temp.append(keys[i], values[i]);
//	})
//	data_temp.append("account_ID" , account_ID_temp);
	object1["account_ID"] = account_ID_temp;
	var return1;
	$.ajax({
		type : "get",
		async : false,
		url : url,
		processData : true,
		data : object1,
		dataType : "text",
		success : function(data) {
			return1 = data;
		}
	});
	return return1;
}


//根据分区名称 获取子分区的json数据
function getSubSection(sectionName) {
	var subSectionData = null;
	var section_ID = 1;
	$.ajax({
		type : "get",
		async : false,
		url : "c_section?name=" + sectionName,
		processData : true,
//		data : data1,
		dataType : "json",
		success : function(data) {
			console.log(data)
			section_ID = data[0].ID;
//			$(data).each(function ( index , section) {
//				section_ID = section.ID;
//			})
		}
	});
	console.log("GetSection?name=" + "sectionName, 执行完了");
	$.ajax({
		type : "get",
		async : false,
		url : "c_subsection?section_ID=" + section_ID,
		processData : true,
//		data : data1,
		dataType : "json",
		success : function(data) {
			console.log("收到subsection")
			subSectionData = data;
		}
	});
//	$.get("GetSubSection?name=" + sectionName, function(data) {
//		subSectionData = data;
//	}, "json")
	
	return subSectionData;
}



//分页获取video sectionName: 分区名称 a_page_num : 每页数量 , page_num: 当前请求页 condition : 用来排序的列(默认降序 也就是值越大 越靠前)
//获取此分区下的video数据
function selectVideo4section(sectionName, a_page_num, page_num , condition) {
	var subSectionJSON=getSubSection(sectionName);
	var keys = "subSection_ID";
	var values = new Array();
	$(subSectionJSON).each(function(inedx , subSection){
			values.push(subSection.ID);
	})
	var object1 = new Object;
	object1[keys] = values;
//	console.log("qingqiu" + subSection_ID)
	var selectVideo_or_JSON=getVideo_or(object1, a_page_num, page_num, condition);
	return selectVideo_or_JSON;
}


function user_agent_type(){
	/*
	* 智能机浏览器版本信息:
	*
	*/
	 
	  var browser={
	    versions:function(){
	           var u = navigator.userAgent, app = navigator.appVersion;
	           return {//移动终端浏览器版本信息
	                trident: u.indexOf('Trident') > -1, //IE内核
	                presto: u.indexOf('Presto') > -1, //opera内核
	                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
	                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
	                iPad: u.indexOf('iPad') > -1, //是否iPad
	                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	            };
	         }(),
	         language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
//	document.writeln("语言版本: "+browser.language);
//	document.writeln(" 是否为移动终端: "+browser.versions.mobile);
//	document.writeln(" ios终端: "+browser.versions.ios);
//	document.writeln(" android终端: "+browser.versions.android);
//	document.writeln(" 是否为iPhone: "+browser.versions.iPhone);
//	document.writeln(" 是否iPad: "+browser.versions.iPad);
//	document.writeln(navigator.userAgent);
	if( browser.versions.android || browser.versions.iPhone || browser.versions.iPad){
//	window.location.href="http://m.shanmao.me"
		return true;
	}else{
//	alert("不是移动设备");
		return false;
	}
}

function getCookie(name){
	var strcookie = document.cookie;//获取cookie字符串
	var arrcookie = strcookie.split("; ");//分割
	//遍历匹配
	for ( var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if (arr[0] == name){
			return arr[1];
		}
	}
	return "";
}

function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 130 * 24 * 60 * 60 * 1000); //130天过期  
	document.cookie = name + "=" + encodeURIComponent(value)
			+ ";expires=" + exp.toGMTString() + ";path=/";
	return true;
};




function format_discuss_html( discuss ) {
//	var user_temp = getUserData(discuss.account_ID);
	return "<div class='discuss_floor' name='"+discuss.id+"'>" +
												"<div class='head_img1'>" +
													"<a>" +
														"<img src='https://static.xudazhu.cn/img/head_img/"+discuss.userBean.headImg+".png' user_id='"+discuss.userBean.accountId+"'  id='discuss_head_img_"+discuss.id+"'   class='head_img_img'>" +
													"</a>" +
												"</div>" +
												"<div class='discuss_info_right'>" +
													"<p><a><xmp>"+discuss.userBean.nickname+"</xmp></a></p>" +
													"<span><xmp >"+ discuss.info + "</xmp></span>" +
													"<div class='discuss_add_time' >  " +
														"<span>"+formatDate(new Date(discuss.addTime.time))+"</span>" +
														"<div style='font-size: 17px; margin: 0px 10px; color: black;' discuss_id='"+discuss.id+"' id='discuss_button_"+discuss.id+"'  class='glyphicon glyphicon-thumbs-up discuss_praise_button ' ></div>" +
//														"<div style='font-size: 17px; margin: 0px 10px; color: "+get_praise_star_has("discuss_praise/has", {"discuss_ID": discuss.id})+";' discuss_ID='"+discuss.id+"' class='glyphicon glyphicon-thumbs-up discuss_praise_button'  id ='discuss_button_"+discuss.id+"'></div>" +
														"<span class='discuss_praise_num' id ='discuss_num_"+discuss.id+"'>0</span>" +
//														"<span class='praise_num'>"+get_praise_star_num("discuss_praise/num", {"discuss_ID": discuss.id})+"</span>" +
														"<button  class='btn btn-default btn-xs addSubdiscuss' name='discuss_ID="+discuss.id+"&account_ID="+discuss.userBean.accountId+"'>回复</button>" +
													"</div>" +
													"<div class='subdiscuss_div' id='discuss"+discuss.id+"' name='discuss_ID="+discuss.id+"&account_ID="+discuss.userBean.accountId+"'></div>" +
												"</div>" +
											"</div>";
}

function format_subdiscuss_html( subdiscuss) {
	return "<div class='subdiscuss_div_a'>" +
		"<div class='subdiscuss_floor subdiscuss_div_left'>" +
		"<div class='head_img2 '>" +
		"<a><img src='https://static.xudazhu.cn/img/head_img/"+subdiscuss.userBean.headImg+".png' user_id='"+subdiscuss.userBean.accountId+"' id='subdiscuss_head_img_"+subdiscuss.id+"'  class='head_img_img  subdiscuss_head_img'> </a>" +
		"</div>" +
		"<div class='subdiscuss_info_right ' id='discuss_input1_div'>" +
		"<div class='subdiscuss_name_info'><span class='subdiscuss_account'>"+subdiscuss.userBean.nickname+" 回复 "+subdiscuss.targetUserBean.nickname+" : </span><span>"+subdiscuss.info+"</span></div>" +
		"<div ><span>"+formatDate(new Date(subdiscuss.addTime.time))+"</span>" +
		"<span style='font-size: 17px; margin: 0px 10px; color: black;' subdiscuss_id='"+subdiscuss.id+"'  id ='subdiscuss_button_"+subdiscuss.id+"' class='glyphicon glyphicon-thumbs-up subdiscuss_praise_button'></span>" +
//		"<span style='font-size: 17px; margin: 0px 10px; color: "+get_praise_star_has("subdiscuss_praise/has", {"subDiscuss_ID": subdiscuss.id})+";' subdiscuss_ID='"+subdiscuss.id+"' class='glyphicon glyphicon-thumbs-up subdiscuss_praise_button'></span>" +
		"<span calss='subdiscuss_praise_num ' id ='subdiscuss_num_"+subdiscuss.id+"' subdiscuss_id='"+subdiscuss.id+"'>0</span>" +
//		"<span calss'praise_num'>"+get_praise_star_num("subdiscuss_praise/num", {"subDiscuss_ID":subdiscuss.id})+"</span>" +
		"<button class='btn btn-default btn-xs addSubdiscuss' name='discuss_ID="+subdiscuss.discussBean.id+"&account_ID="+subdiscuss.userBean.accountId+"'>回复</button>" +
		"</div>";
	
}




