
importScripts("js/jquery.nodom.js")


//多线程入口  调用格式 { "method" : methodName , "object" : object}
onmessage = function(event){
	console.log(event.data)
//	eval(event.data.method + "('"+event.data.object+"')"); 
	var  func=eval(event.data.method);
//	new func(event.data.object);
	postMessage(func(event.data.object));
}



function format_subdiscuss_html( subdiscuss) {
	return "<div class='subdiscuss_div_a'>" +
		"<div class='subdiscuss_floor subdiscuss_div_left'>" +
		"<div class='head_img2 '>" +
		"<a><img src='https://static.xudazhu.cn/img/head_img/"+subdiscuss.account_json.head_img+".png' user_id='"+subdiscuss.account_json.account_ID+"' class='head_img_img my_head_img subdiscuss_head_img'> </a>" +
		"</div>" +
		"<div class='subdiscuss_info_right ' id='discuss_input1_div'>" +
		"<div class='subdiscuss_name_info'><span class='subdiscuss_account'>"+subdiscuss.account_json.nickname+" 回复 "+subdiscuss.target_json.nickname+" : </span><span>"+subdiscuss.info+"</span></div>" +
		"<div ><span>"+formatDate(new Date(subdiscuss.add_time.time))+"</span>" +
		"<span style='font-size: 17px; margin: 0px 10px; color: black;' subdiscuss_id='"+subdiscuss.ID+"'  id ='subdiscuss_button_"+subdiscuss.ID+"' class='glyphicon glyphicon-thumbs-up subdiscuss_praise_button'></span>" +
//		"<span style='font-size: 17px; margin: 0px 10px; color: "+get_praise_star_has("subdiscuss_praise/has", {"subDiscuss_ID": subdiscuss.ID})+";' subdiscuss_ID='"+subdiscuss.ID+"' class='glyphicon glyphicon-thumbs-up subdiscuss_praise_button'></span>" +
		"<span calss='subdiscuss_praise_num ' id ='subdiscuss_num_"+subdiscuss.ID+"' subdiscuss_id='"+subdiscuss.ID+"'>0</span>" +
//		"<span calss'praise_num'>"+get_praise_star_num("subdiscuss_praise/num", {"subDiscuss_ID":subdiscuss.ID})+"</span>" +
		"<button class='btn btn-default btn-xs addSubdiscuss' name='discuss_ID="+subdiscuss.discuss_json.ID+"&account_ID="+subdiscuss.account_ID+"'>回复</button>" +
		"</div>";
	
}



function message_string( object ) {
	console.log(object)
//	var event = JSON.parse(event1);
	var type = object.type;
	var account = object.account;
	var message = object.message;
	var type2 = type;
	if ( !(type.indexOf("_me") === -1) ) {
		type2 =  type.substring(0 , type.length-3);
	} 
//	console.log(message)
	var message_string1 = "";
	var is_read = "已读";
	if ( ! message.is_read ) {
		is_read = "标记为已读";
	}
	if ( account === "from_account" ) {
		message_string1 = ( "<span class='message'>"+  fomatMessage(type, message) +"</span>" +
				"<span class='add_time'>"+formatDate(new Date(message.add_time.time))+"</span>");
	} else {
		message_string1 = ( "<span class='message'>"+  fomatMessage(type, message) +"</span>" +
				"<a class='is_read' r_type_id='"+type2+"?"+message.ID+"'>"+is_read+"</a ><span class='add_time'>"+formatDate(new Date(message.add_time.time))+"</span>");
	}
//	postMessage(message_string1);
	return  message_string1;
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
	var userData = getUserData(null);
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

function get_message_unread_num( type ) {
	var dataR1 = "0";
	var data_message_temp = new Object;
	var userData = getUserData(null);
	if ( $.isEmptyObject(userData) ) {
		return '0';
	}
	data_message_temp["target_account"] = userData.account_ID;
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
	var y2 = y1 + div.height();
	//div下面两个点的y值
	var x1 = div.offset().left;  
	//div左边两个的点的x值
	var x2 = x1 + div.width();  
	//div右边两个点的x的值

	if( x < x1 || x > x2 || y < (y1-4) || y > y2 ) {
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

//var userData = getUserData(null);

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
	var userData = getUserData(null);
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



