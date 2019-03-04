//自适应宽度方法
function auto_width() {
    if ($(window).width() >= 1270) {
        $(".auto_width_div_xm").css("width", "900px")
        $(".auto_width_div").css("width", "1180px")
        $(".width_hide").show();
    } else {
        $(".width_hide").hide();
        $(".auto_width_div_xm").css("width", "710px")
        $(".auto_width_div").css("width", "1000px")
    }
}

function logined ( userData ) {

    // $.get("c_message/unread_num" , {"target_account" : data.accountId} , function ( unread_num ) {
    $(".table_right_tr").empty();
    $(".table_right_tr").append("<td class='header1_td'><a target='_blank' href='user.html'><div><img class='head_img' src='https://static.xudazhu.cn/img/head_img/" + userData.headImg + ".png'/></div></a></td>" +
        "<td class='header1_td'><a target='_blank' href='user.html?div=nav_star_div'><div>&nbsp;收藏夹&nbsp;</div></a></td>" +
        "<td class='header1_td'><a class='nav_message' href='user.html?div=nav_dynamic_div'><div>&nbsp;消息" +
        "<span class='badge nav_message_num'>" + 99 + "</span>&nbsp;</div></a></td>" +
        "<td class='header1_td'><a href='history.html'><div>&nbsp;历史&nbsp;</div></a></td>");

    // })

}

//监听滚动
function window_scroll() {
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            $(".bg2").css("background", "rgba(255, 255, 255, 0.4)")
        } else {
            $(".bg2").css("background", "#F9F9F9")
        }
        if ($(window).scrollTop() >= 145) {
            $(".scrop_hide").show();
            $(".nav-a td").css("padding", "0px 0px")
            var section_out_div = $(".section_out_div");
            section_out_div.removeClass("section_out_div");
            section_out_div.addClass("section_out_div_fixed");
        } else {
            $(".scrop_hide").hide();
            var section_out_div = $(".section_out_div_fixed");
            section_out_div.removeClass("section_out_div_fixed");
            section_out_div.addClass("section_out_div");
            $(".nav-a td").css("padding", "10px 0px")
        }


    });
}


function show_video_a() {
    //
    //铺轮播图和轮播图右边八个
    //先获取所有视频中播放量最大的5个
    // var selectVideoData = getVideo(new Object, 13, 1, "playNum");
    $.get("c_video", {"condition": "playNum", "a_page_num": 13, "page_num": 1}, function (selectVideoData) {
        var take_turns_img = $(".take_turns_img");
        var hot_video_img = $(".hot_video_img");
        $(selectVideoData.video_data).each(function (index, video) {
            if (index < 5) {
                $(take_turns_img[index]).attr("src", "https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg")
                $(take_turns_img[index]).after("<div class='img_hover_big img-rounded' style='display: none;'>	<div class='video_hover_title' >" + video.title + "</div> <div class='video_hover_playNum'> 播放" + video.playNum + "次</div> </div>")
                $(take_turns_img[index]).parent().attr("href", "video.html?videoId=" + video.id);
                $(take_turns_img[index]).parent().attr("title", video.title);
            } else {
                $(hot_video_img[index - 5]).attr("src", "https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg")
                $(hot_video_img[index - 5]).next().remove();
                $(hot_video_img[index - 5]).after("<div class='img_hover img-rounded' style='display: block;'>	<div class='video_hover_title' >" + video.title + "</div> <div class='video_hover_playNum'> 播放" + video.playNum + "次</div> </div>")
                $(hot_video_img[index - 5]).parent().attr("href", "video.html?videoId=" + video.id);
                $(hot_video_img[index - 5]).parent().attr("title", video.title);
            }
        })
    }, "json")
    //轮播图结束

    $.get("c_video", {"condition": "upDate", "a_page_num": 6, "page_num": 1}, function (selectVideoData2) {
    var advertising = $(".advertising");
    $(selectVideoData2.video_data).each(function (index, video) {
        $(advertising[index]).attr("src", "https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg")
        $(advertising[index]).parent().attr("href", "video.html?videoId=" + video.id);
        $(advertising[index]).parent().attr("title", video.title);
        $(advertising[index]).next().attr("title", video.title);
        $(advertising[index]).next().text(video.title);
    })

    } , "json")


}


$(function () {
    auto_width();
    window_scroll();
    $(window).resize(function () {
        auto_width();
    })


//	鼠标放上视频的图片上显示详情
    $(".take_turns_img").mouseenter(function () {
        $(this).next().fadeIn(300);
    }).mouseleave(function () {
        $(this).next().fadeOut(300);
    })

    $(document).on("mouseenter", ".piece1 .img_xs", function () {
        $(this).next().css("top", "-100px");
        $(this).next().css("height", "100px");
        $(this).next().css("background-color", "black");
        $(this).next().css("opacity", "0.7");
//		background-color: black;
//		opacity: 0.7;
    })

    $(document).on("mouseleave", ".piece1 .img_xs", function () {
//		$(this).next().fadeIn(300);
        $(this).next().css("top", "-19px");
        $(this).next().css("height", "18px");
        $(this).next().css("background", "linear-gradient(to top, black, rgba(0, 0, 0, 0))");
//		$(this).next().css("opacity" , "0.7");


    })


    //注册登出按钮
    $(document).on("click", "#logout", function () {
        $.post("c_account/logout", function (data) {
            alert(userData.nickname + "您已退出")
            userData = null;
            window.location.reload();
        })
    })


    $("#temp1 a").mouseenter(function () {
        $(this).css("background-color", "#269ABC")
    }).mouseleave(function () {
        $(this).css("background-color", "white")
    })


    var i = 1;
    $("#temp1").mouseenter(function () {
    }).mouseleave(function () {
        clearTimeout(i);
        $("#temp1").stop();
        $("#temp1").css("display", "none");
        $(this).css("background", "");
        $("#temp1").empty();
    })

    //鼠标停留
    $(".nav-a td ").mouseenter(function () {
        console.log($(".nav-a").height())
        $(this).css("background", "rgba(255, 255, 255, 0.2)");
        $("#temp1").empty();
//		console.log($(this).attr("name"))
        //先查出section信息
        var sectionId = $(this).attr("sectionId");
        $.get("c_subsection/4sectionId" , {"sectionId" : sectionId } , function (data) {
            $("#temp1").empty();
            $(data).each(function (index, section) {
                $("#temp1").append("<a href='section.s." + section.name + "' name='" + section.name + "' style='margin: 1px 10px;'><p style='margin: 0px 15px; '>&gt;&nbsp;" + section.name + "</p></a>")
            })
        } , "json")
        var index1 = $(this).offset();
        i = setTimeout(function () {
            var tempDiv = $("#temp1");
            tempDiv.stop();
            tempDiv.append();
            tempDiv.css("position", "absolute");
            tempDiv.css("display", "block");
            tempDiv.css("margin-top", "5px");
            tempDiv.css("border-color", "#333");
            tempDiv.css("left", index1.left + "px");
//			tempDiv.css("width" , "110px");
//			tempDiv.css("top" , ($(".nav-a").height() - 8)+"px");
            tempDiv.css("top", (index1.top + $(".nav-a").height() - 6) + "px");
            tempDiv.css("background-color", "white");
        }, 2);

        //鼠标离开
    }).mouseleave(function () {
        if (!inner($("#temp1"))) {
            clearTimeout(i);
            $("#temp1").stop()
            $("#temp1").css("display", "none")
            $("#temp1").empty();
        }


    })


    var timeout = 1;
    $("#nav_temp").mouseenter(function () {
    }).mouseleave(function () {
        clearTimeout(timeout);
        $("#nav_temp").stop();
        $("#nav_temp").hide();
    })

    //鼠标停留
    $(document).on("mouseenter", ".head_img", function () {
//	$(".header1_td ").mouseenter(function(){
        var td1 = $(this);
        var index = td1.offset();
        timeout = setTimeout(function () {
            $("#nav_temp").stop();
            $("#nav_temp").append().fadeIn(400);
            $("#nav_temp").css("position", "absolute");
            $("#nav_temp").css("margin-top", "5px");
            $("#nav_temp").show();
            $("#nav_temp").css("border-color", "#ccc");
            $("#nav_temp").css("left", index.left + "px");
            $("#nav_temp").css("top", (index.top + td1.height()) + "px");
            $("#nav_temp").css("background-color", "white");
        }, 500);

    })
    //鼠标离开

    $(document).on("mouseleave", ".header1_td", function () {
//	.mouseleave(function(){
        //调用方法判断鼠标是否在新出现的div里
        if (!inner($("#nav_temp").closest("#nav_temp"))) {
            clearTimeout(timeout);
            $("#nav_temp").stop();
            $("#nav_temp").hide();
        }

    })


//     //获取登录用户
//     $.get("c_user", function (data) {
//
// //		如果发现已登陆
//         if (!$.isEmptyObject(data)) {
//             // $.get("c_message/unread_num" , {"target_account" : data.accountId} , function ( unread_num ) {
//             $(".table_right_tr").empty();
//             $(".table_right_tr").append("<td class='header1_td'><a target='_blank' href='user'><div><img class='head_img' src='https://static.xudazhu.cn/img/head_img/" + data.headImg + ".png'/></div></a></td>" +
//                 "<td class='header1_td'><a target='_blank' href='user?div=nav_star_div'><div>&nbsp;收藏夹&nbsp;</div></a></td>" +
//                 "<td class='header1_td'><a class='nav_message' href='user?div=nav_dynamic_div'><div>&nbsp;消息" +
//                 "<span class='badge nav_message_num'>" + 99 + "</span>&nbsp;</div></a></td>" +
//                 "<td class='header1_td'><a href='history.html'><div>&nbsp;历史&nbsp;</div></a></td>");
//
//             // })
//         }
//     }, "json")

    //轮播图
    $('#myCarousel').carousel({
        interval: 3000
    });

    show_video_a();


    //铺下面的频道的视频
    $(".piece3").each(function () {

        var img_xs = $(this).find(".img_xs");
        $.get("c_video/4sectionId" , {"sectionId" : $(this).attr("sectionId") , "a_page_num" : 10 , "page_num" : 1 , "condition" : "playNum"} , function (video4sectionJSON ) {
        $(video4sectionJSON.video_data).each(function (index, video) {
            $(img_xs[index]).attr("src", "https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg");
            $(img_xs[index]).parent().attr("href", "video.html?videoId=" + video.id);
            $(img_xs[index]).parent().attr("title", video.title);
            $(img_xs[index]).next().attr("title", video.title);
            $(img_xs[index]).next().text(video.title);
        })
        // var video4sectionJSON = selectVideo4section($(this).attr("name"), 10, 1, "upDate");


        } , "json")


    })


    show_video_a();


})
