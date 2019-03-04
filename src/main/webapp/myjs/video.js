function toMin(s) {
    var s1 = parseInt(s);
    var min = parseInt(s1 / 60) < 10 ? "0" + parseInt(s1 / 60) : parseInt(s1 / 60);
    var s2 = parseInt(s1 % 60) < 10 ? "0" + parseInt(s1 % 60) : parseInt(s1 % 60);
    return min.toString() + ":" + s2.toString();
}

function getdanma() {
    //获得弹幕
    setTimeout(function () {
        $(".danmu_table tbody").empty();
        $.get("https://api.xudazhu.cn/v3/?id=" + dp.danmaku.options.api.id, function (data1) {
            var damnmuList = data1.data;
            $(damnmuList).each(function (index, danma) {
                danma[0] = toMin(danma[0]);
            })
//			damnmuList.sort();
            $(damnmuList).each(function (index, danma) {
                danma[3] = danma[3].substring(danma[3].lastIndexOf('_') + 1, danma[3].length);

                if (danma[3] == "游客") {
//					danma[3] = getUserData(danma[3]) == null ? danma[3] : getUserData(danma[3]).nickname;
                    $(".danmu_table tbody").append("<tr><td><xmp>" + danma[0] + "</xmp></td><td><xmp>" + danma[4] + "</xmp></td><td><xmp>" + danma[3] + "</xmp></td></tr>")
                } else {
                    var temp_int = Math.ceil(Math.random() * 10000);
                    $(".danmu_table tbody").append("<tr id = 'danma_tr_temp" + temp_int + "' ></tr>");
                    $.get("c_user", {"ID": danma[3]}, function (userData1) {
                        $("#danma_tr_temp" + temp_int).append("<td><xmp>" + danma[0] + "</xmp></td><td><xmp>" + danma[4] + "</xmp></td><td><xmp>" + userData1.nickname + "</xmp></td>");
//							$(".danmu_table tbody").append("<tr><td><xmp>"+danma[0] +"</xmp></td><td><xmp>" + danma[4] + "</xmp></td><td><xmp>" + userData1.nickname + "</xmp></td></tr>")
                    }, "json")
                }
            })


        }, "json")
    }, 200);
}

function gettedVideoData(video_data) {
    $(".video_title").text(video_data.title);
    $(".play_num").text(video_data.playNum + "  次播放");
    $(".up_date").text("上传日期 : " + formatDate(new Date(video_data.upDate.time)));
    $(".video_info").text(video_data.info);
    //视频信息获取完成
    $(".video_author_nickname").text(video_data.userBean.nickname);
    $(".video_author_info").text(video_data.userBean.info);
    $(".head_img2 img").attr("src", "https://static.xudazhu.cn/img/head_img/" + video_data.userBean.headImg + ".png");
    $(".head_img2 img").attr("user_id", video_data.userBean.accountId);
}


function show_discuss(discuss_page, discuss_a_page_num) {
    //铺上单页评论
    var requestData = new Object;
    requestData["a_page_num"] = discuss_a_page_num;
    requestData["page_num"] = discuss_page;
    requestData["videoBeanId"] = videoId;
    requestData["condition"] = "add_time";

    $.ajax({
        type: "get",
        async: true,
        url: "c_discuss",
        processData: true,
        data: requestData,
        dataType: "json",
        success: function (data) {
            $(".discuss_num").text("共 " + data.all_num + " 条评论");
            discuss_all_page_num = data.all_page_num;
            $(".discuss_info").empty();
            $(data.discuss_data).each(function (index, discuss) {
                $(".discuss_info").append("<div id='discuss_temp" + discuss.id + "'></div>")
                $("#discuss_temp" + discuss.id).append(format_discuss_html(discuss))
                //是否已赞
                $.get("discuss_praise/has", {"discuss_ID": discuss.id}, function (data) {
                    $("#discuss_button_" + discuss.id).css("color", data);
                })
                //赞的数量
                $.get("discuss_praise/num", {"discuss_ID": discuss.id}, function (data) {
                    $("#discuss_num_" + discuss.id).text(data)
                })
                show_subdiscuss4discuss($("#discuss" + discuss.id));

            })
        }
    });
}

function logined(userData) {
    $("#my_discuss_div_hint").hide();
    $("#my_discuss_div").show();
    navLogined(userData);
}


//布置分页按钮 传入参数是  当前页 总页数
function show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num) {
    $("#video_discuss_pages").empty();
    $("#video_discuss_pages")
        .append(
            "<button class='btn btn-xs btn-default startsPage' type='button'>首页</button>")
    $("#video_discuss_pages")
        .append(
            "<button class='btn btn-xs btn-default lastPage' type='button'>上一页</button>")
    for (var int = 1; int <= discuss_all_page_num; int++) {
        if (int >= discuss_page - 2 && int <= discuss_page + 2) {
            $("#video_discuss_pages").append(
                "<button class='button" + int
                + " pageButton btn btn-xs  btn-default' type='button'>"
                + int + "</button>");
        }
    }
    $("#video_discuss_pages").append(
        "<button class='btn btn-xs  btn-default nextPage' type='button'>下一页</button>"
        + "<button class='btn btn-xs  btn-default endPage' type='button'>末页</button>"
        + "<button class='btn btn-xs  btn-default ' type='button'>共"
        + discuss_all_page_num
        + "页</button>"
        + "<input type='number' style='width: 70px;' class='btn btn-xs  btn-default inputPage' value='"
        + discuss_page
        + "'  >"
        + "<button style='width: 50px;' class='btn btn-xs  btn-default inputPageButton' type='button' >Go!</button>"
        + "<select style='width: 85px; float: right; height: 23px; padding: 0px;' class='form-control aPageNum'>"
        + "<option>"
        + discuss_a_page_num
        + "</option>"
        + "<option>10</option>"
        + "<option>20</option>"
        + "<option>50</option>"
        + "<option>100</option>"
        + "</select>")

    $(".button" + discuss_page).attr("class", "button" + discuss_page + "  btn btn-xs btn-primary");


//		pageBuuton++;
}

//铺单个子评论 传入参数是 .subdiscuss_div 的jQuery对象
function show_subdiscuss4discuss(subdiscuss_div) {
    var name1 = subdiscuss_div.attr("name");
    console.log(name1)
    var discussBeanId = name1.split("&")[0].split("=")[1];
    var data_temp = new Object;
    data_temp["discussBeanId"] = discussBeanId;
    data_temp["a_page_num"] = subdiscuss_a_page_num;
    data_temp["page_num"] = subdiscuss_page;
    $.get("c_subdiscuss", data_temp, function (data) {
        subdiscuss_div.empty();
        $(data.subdiscuss_data).each(function (index, subdiscuss) {
            subdiscuss_div.append(format_subdiscuss_html(subdiscuss))
            //是否已赞
            $.get("subdiscuss_praise/has", {"subDiscuss_ID": subdiscuss.id}, function (data) {
                $("#subdiscuss_button_" + subdiscuss.id).css("color", data);
            })
            //赞的数量
            $.get("subdiscuss_praise/num", {"subDiscuss_ID": subdiscuss.id}, function (data) {
                $("#subdiscuss_num_" + subdiscuss.id).text(data)
            })
//				})
        })
    }, "json")

}


var subdiscuss_condition = "up_date";
var subdiscuss_page = 1;
var subdiscuss_a_page_num = 10;
var subdiscuss_all_page_num = 1;


var condition = "up_date";
var discuss_page = 1;
var discuss_a_page_num = 10;
var discuss_all_page_num = 1;


$(function () {
    $(document).on("mouseenter", ".danmu_table tr", function () {
        $(this).css("background-color", "#00B5E5")
    })
    $(document).on("mouseleave", ".danmu_table tr", function () {
        $(this).css("background-color", "white")
    })


//	getdanma();

    //加载第一页评论
    show_discuss(discuss_page, discuss_a_page_num);
    show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);

    //注册评论翻页按钮
    $(document).on("change", ".aPageNum", function () {
        discuss_a_page_num = parseInt(this.value);
        discuss_page = 1;
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })

    $(document).on("click", ".inputPageButton", function () {
        var inputNum = parseInt($(".inputPage")[0].value);
        if (inputNum > discuss_all_page_num || inputNum < 1) {
            alert("输入的页数不在范围内");
            return;
        }
        discuss_page = inputNum;
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })

    $(document).on("click", ".pageButton", function () {
        discuss_page = parseInt($(this)[0].textContent);
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })
    $(document).on("click", ".startsPage", function () {
        discuss_page = 1;
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })
    $(document).on("click", ".lastPage", function () {
        if (discuss_page == 1) {
            alert("已经是第一页啦 !");
            return;
        }
        discuss_page = parseInt(discuss_page - 1);
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })
    $(document).on("click", ".nextPage", function () {
        if (discuss_page == discuss_all_page_num) {
            alert("已经是最末页啦 !");
            return;
        }
        discuss_page = parseInt(discuss_page + 1);
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })
    $(document).on("click", ".endPage", function () {
        discuss_page = discuss_all_page_num;
        show_discuss(discuss_page, discuss_a_page_num);
        show_page_button1(discuss_a_page_num, discuss_page, discuss_all_page_num);
    })


    //评论翻页按钮注册完毕


    var url1 = decodeURIComponent(window.location.href);
    var login_url = url1.substring(url1.lastIndexOf('?') + 1, url1.length);
    $(".login_hint").attr("href", "login.html?url=video.html?" + login_url);

    //发布评论
    $(".discuss_submit").click(function () {
//		alert($(this).prev("textarea")[0].value)
        var discussData = new Object;
        discussData["info"] = $(this).prev("textarea")[0].value;
        discussData["userBeanId"] = userData.accountId;
        discussData["videoBeanId"] = videoData.id;
        $.post("c_discuss", discussData, function (data) {
            alert(data);
            //提交完评论 调用刷新评论方法
            discuss_page = 1;
            show_discuss(discuss_page, discuss_a_page_num);
        })
    })

//	//铺子评论
//	$(".subdiscuss_div").each(function( index , subdiscuss_div) {
////		alert($(subdiscuss_div).attr("name"))
//		show_subdiscuss4discuss($(subdiscuss_div));
//	})


    //发布子评论
//	$(".addSubdiscuss").click(function(){
    $(document).on("click", ".addSubdiscuss", function () {
        if ($.isEmptyObject(userData)) {
            alert("您还未登陆,不能执行此操作")
            return false;
        }
        $(".my_subdiscuss_div").remove();
//		alert("dianj")
        var account_ID_discuss_ID = $(this).attr("name");
        var subdiscuss_div = $(this).closest(".discuss_info_right").children(".subdiscuss_div");
        subdiscuss_div.append("<div class='subdiscuss_floor my_subdiscuss_div'  >" +
            "<div class='head_img2 '>" +
            "<a><img src='https://static.xudazhu.cn/img/head_img/" + userData.headImg + ".png' user_id='" + userData.accountId + "' class='head_img_img my_head_img subdiscuss_head_img'> </a>" +
            "</div>" +
            "<div class='subdiscuss_info_right ' id='discuss_input1_div'>" +
            "<textarea data-v-5510361a='' name='subdiscuss_input' id='subdiscuss_input' maxlength='400' class='form-control text-area-box-v2-val placeholder-style subdiscuss_input' style='float: left; height: 60px; width: 85%;' placeholder='请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。'></textarea>" +
            "<button type='button' style='float: left; width: 14%; height: 60px; margin-left: 3px;' class='btn btn-info btn-default subdiscuss_submit' name='" + account_ID_discuss_ID + "'>回复</button>" +
            "</div>  " +
            "</div>");

        $("#subdiscuss_input").focus();

//			$(".subdiscuss_div")
    })


    //注册子评论框blur事件
    $(document).on("blur", ".subdiscuss_input", function () {
        if ($(this)[0].value == "" || $(this)[0].value.length === 0) {
            $(this).closest(".my_subdiscuss_div").remove();
        }
    })

    //子评论提交
    $(document).on("click", ".subdiscuss_submit", function () {
        var subdiscuss_submit = $(this);
        var attr_name = $(this).attr("name");
        var discuss_ID = attr_name.split("&")[0].split("=")[1];
        var account_ID = userData.id;
        var obj_ID = attr_name.split("&")[1].split("=")[1];
        var subdiscuss_info = $(this).prev()[0].value;
        if (subdiscuss_info == "" || subdiscuss_info.length === 0) {
            alert("评论框内没有内容");
            return false;
        }
        var subdiscuss_data_temp = new Object;
        subdiscuss_data_temp["discussId"] = discuss_ID;
        subdiscuss_data_temp["userBeanId"] = account_ID;
        subdiscuss_data_temp["targetUserBeanId"] = obj_ID;
        subdiscuss_data_temp["info"] = subdiscuss_info;
//		alert("发送")
        $.post("c_subdiscuss", subdiscuss_data_temp, function (data) {
            alert(data);
            show_subdiscuss4discuss(subdiscuss_submit.closest(".subdiscuss_div"))
            //提交完评论 调用刷新子评论方法
//				discuss_page = 1;
//				show_discuss(discuss_page, discuss_a_page_num);
        })


    })

    //注册评论点赞事件
    $(document).on("click", ".discuss_praise_button", function () {
        if ($.isEmptyObject(userData)) {
            alert("您还未登陆,不能执行此操作")
            return false;
        }
        var button1 = $(this);
        var num = $(this).next();
        var data_temp = new Object;
        data_temp["discuss_ID"] = $(this).attr("discuss_id");
        data_temp["account_ID"] = userData.accountId;
        $.get("discuss_praise/click", data_temp, function (data) {
//			alert(data);
            button1.css("color", data);
            if (data == "lightskyblue") {
                num.text(parseInt(num.text()) + 1);
            } else {
                num.text(parseInt(num.text()) - 1);
            }
        })
    })


    //注册子评论点赞事件
    $(document).on("click", ".subdiscuss_praise_button", function () {
        if ($.isEmptyObject(userData)) {
            alert("您还未登陆,不能执行此操作")
            return false;
        }
        var button1 = $(this);
        var num = $(this).next();
        var data_temp = new Object;
        data_temp["subDiscuss_ID"] = $(this).attr("subdiscuss_id");
        data_temp["account_ID"] = userData.accountId;
        $.get("subdiscuss_praise/click", data_temp, function (data) {
//			alert(data);
            button1.css("color", data);
            if (data == "lightskyblue") {
                num.text(parseInt(num.text()) + 1);
            } else {
                num.text(parseInt(num.text()) - 1);
            }
        })
    })


    //设置视频赞数目
//	var video_praise_num = get_praise_star_num("video_praise/num", {"videoId": videoData.ID});
    $.get("video_praise/num", {"video_ID": videoId}, function (video_praise_num) {
        $(".video_praise_button").next().text(video_praise_num);
    })
    $(".video_praise_button").attr("video_id", videoId);
//	$(".video_praise_button").css("color" , get_praise_star_has("video_praise/has", {"videoId": videoData.ID}));
    $.get("video_praise/has", {"video_ID": videoId}, function (praise_star_has) {
        $(".video_praise_button").css("color", praise_star_has);
    })

    //注册视频赞事件
    $(document).on("click", ".video_praise_button", function () {
        if ($.isEmptyObject(userData)) {
            alert("您还未登陆,不能执行此操作")
            return false;
        }
        var button1 = $(this);
        var num = $(this).next();
        var data_temp = new Object;
        data_temp["videoId"] = $(this).attr("video_id");
        data_temp["account_ID"] = userData.accountId;
        $.get("video_praise/click", data_temp, function (data) {
//			alert(data);
            button1.css("color", data);
            if (data == "lightskyblue") {
                num.text(parseInt(num.text()) + 1);
            } else {
                num.text(parseInt(num.text()) - 1);
            }
        })
    })


    //设置视频收藏数目
//	var video_star_num = get_praise_star_num("video_star/num", {"videoId": videoId});
    $.get("video_star/num", {"video_ID": videoId}, function (video_star_num) {
        $(".video_star_button").next().text(video_star_num);
    })
    $(".video_star_button").attr("video_id", videoId);
//	$(".video_star_button").css("color" , get_praise_star_has("video_star/has", {"videoId": videoId}));
    $.get("video_star/has", {"video_ID": videoId}, function (praise_star_has) {
        $(".video_star_button").css("color", praise_star_has);
    })

    //注册视频收藏事件
    $(document).on("click", ".video_star_button", function () {
        if ($.isEmptyObject(userData)) {
            alert("您还未登陆,不能执行此操作")
            return false;
        }
        var button1 = $(this);
        var num = $(this).next();
        var data_temp = new Object;
        data_temp["videoId"] = $(this).attr("video_id");
        data_temp["account_ID"] = userData.accountId;
        $.get("video_star/click", data_temp, function (data) {
//			alert(data);
            button1.css("color", data);
            if (data == "lightskyblue") {
                num.text(parseInt(num.text()) + 1);
            } else {
                num.text(parseInt(num.text()) - 1);
            }
        })
    })


})
