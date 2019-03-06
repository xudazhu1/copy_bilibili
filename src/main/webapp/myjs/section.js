//自适应宽度方法
function auto_width() {
    if ($(window).width() >= 1270) {
        $(".auto_width_div_ms").css("width", "720px")
        $(".auto_width_div_xm").css("width", "900px")
        $(".auto_width_div").css("width", "1180px")
        $(".width_hide").show();
    } else {
        $(".width_hide").hide();
        $(".auto_width_div_ms").css("width", "550px")
        $(".auto_width_div_xm").css("width", "720px")
        $(".auto_width_div").css("width", "1000px")
    }
}

function logined(userData) {

    // $.get("c_message/unread_num" , {"target_account" : data.accountId} , function ( unread_num ) {
    $(".table_right_tr").empty();
    $(".table_right_tr").append("<td class='header1_td'><a target='_blank' href='user.html'><div><img class='head_img' src='https://static.xudazhu.cn/img/head_img/" + userData.headImg + ".png'/></div></a></td>" +
        "<td class='header1_td'><a target='_blank' href='user.html?div=nav_star_div'><div>&nbsp;收藏夹&nbsp;</div></a></td>" +
        "<td class='header1_td'><a class='nav_message' href='user.html?div=nav_dynamic_div'><div>&nbsp;消息" +
        "<span class='badge nav_message_num'>" + 99 + "</span>&nbsp;</div></a></td>" +
        "<td class='header1_td'><a href='history.html'><div>&nbsp;历史&nbsp;</div></a></td>");

    // })

}

function show_video_new() {
    //铺上最新动态


    //获取当前频道名称
//	var url = window.location.search;

    var dataTemp = new Object;
    dataTemp["a_page_num"] = 5;
    dataTemp["page_num"] = 1;
    dataTemp["condition"] = "upDate";
    if (sectionType === "section") {
        dataTemp["sectionId"] = sectionId;

        $.get("c_video/4sectionId", dataTemp, function (videoData1) {
            eachNewVideo(videoData1);
        } , "json")

    } else if (sectionType === "subsection") {
        dataTemp["subsectionBeanId"] = sectionId;
        $.get("c_video/", dataTemp, function (videoData1) {
            eachNewVideo(videoData1);
        } , "json")
    }

    function eachNewVideo(videoData1) {
        //铺上查到的video数据
        var img_xs = $(".video_new").find(".img_xs");
        $(videoData1.video_data).each(function (index, video) {
            console.log("223")
            $(img_xs[index]).attr("src", "https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg");
            $(img_xs[index]).parent().attr("href", "video.html?videoId=" + video.id);
            $(img_xs[index]).parent().attr("target", "_blank");
            $(img_xs[index]).parent().attr("title", video.title);
            $(img_xs[index]).next().attr("title", video.title);
            $(img_xs[index]).next().text(video.title);
        })



    }

}

function show_a_page_video(a_page_num, page_num, condition) {

    var dataTemp = new Object;
    dataTemp["a_page_num"] = a_page_num;
    dataTemp["page_num"] = page_num;
    dataTemp["condition"] = condition;

    //铺上一页
    var videos = $(".videos");
    if (sectionType === "section") {
        dataTemp["sectionId"] = sectionId;
        $.get("c_video/4sectionId", dataTemp, function (videoData1) {
            showVideoPage(videoData1);
        } , "json")
    } else if (sectionType === "subsection") {
        dataTemp["subsectionBeanId"] = sectionId;
        $.get("c_video/", dataTemp, function (videoData1) {
            showVideoPage(videoData1);
        } , "json")
    }

    function showVideoPage(videoData1) {
        //铺上查到的video数据
        if (!$.isEmptyObject(videoData1.video_data)) {
            videos.empty();
            all_page_num = videoData1.all_page_num;
            console.log("112")
            $(videoData1.video_data).each(function (index, video) {
                videos.append("<div class='videos_div'>" +
                    "<div style='float: left; height: 112px;'>" +
                    "<a target='_blank' href='video.html?videoId=" + video.id + "' title='" + video.title + "'>" +
                    "<img src='https://static.xudazhu.cn/img/cover/" + video.coverId + ".jpg' class='img-rounded img_xs' alt='cover'>" +
                    "</a>" +
                    "</div>" +
                    "<div class='auto_width_div_ms' style='width: 550px; float: left;'>" +
                    "<a class='videoTitle' target='_blank'	 href='video." + video.ID + "' title='" + video.title + "' ><xmp>" + video.title + "</xmp></a>" +
                    "<span class='video_date'>" + formatDate(new Date(video.upDate.time)) + "</span>" +
                    "<span class='s-line' style='margin: 3px; float: right;'></span>" +
                    "<a class='video_author'><xmp>" + video.userBean.nickname + "</xmp></a>" +
                    "</div>" +
                    "<div class='video_info'><xmp>" + video.info + "</xmp></div></div>")
            })
            auto_width();
            //加载按钮
            show_page_button(a_page_num, page_num, all_page_num);
        }

    }


}




//布置分页按钮 传入参数是  当前页 总页数
function show_page_button(video_a_page_num, video_page_num, all_page_num) {
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


var url = decodeURIComponent(window.location.href);
var loc = url.substring(url.lastIndexOf('.') + 1, url.lastIndexOf("&sectionId"));
//记录当前是子分区还是分区
var sectionType = url.indexOf("section.s") != -1 ? "subsection" : "section";
var sectionId = url.substring(url.lastIndexOf("sectionId=") + 10, url.length);


var a_page_num = 10;
var page_num = 1;
var all_page_num = 1;
var condition = "up_date";

$(function () {
    auto_width();
    $(window).resize(function () {
        auto_width();
    })

    if (sectionType === "section") {
        $(".nav-a td ").each(function (index, td1) {
            if (loc === $(td1).attr("name")) {
                $(td1).css("border-bottom", "2px solid #00a1d6")
                sectionId = $(td1).attr("sectionId");
            }
        })
        $(".location").empty();
        $(".location").append("<span> </span>"
            + "<a href='index.html'>主站</a> >"
            + "<a href='section.html?type=section." + loc + "'>" + loc + "</a> "
        )

    } else {
        console.log(loc)
        $.get("c_subsection?name=" + loc, function (data) {
            $.get("c_section?id=" + data[0].sectionId, function (section) {
                $(".nav-a td ").each(function (index, td1) {
                    if (section[0].name === $(td1).attr("name")) {
                        $(td1).css("border-bottom", "2px solid #00a1d6")
                    }
                })
                $(".location").empty();
                $(".location").append("<span> </span>"
                    + "<a href='index.html'>主站</a> >"
                    + "<a href='section.html?type=section." + section[0].name + "'>" + section[0].name + "</a> >"
                    + "<a href='section.html?type=section.s." + loc + "'>" + loc + "</a> "
                )
            }, "json")
        }, "json")
    }


    //加载最新视频动态
    show_video_new();
    //加载视频列表
    show_a_page_video(a_page_num, page_num, condition);

    //注册翻页按钮
    $(document).on("change", ".aPageNum", function () {
        a_page_num = parseInt(this.value);
        page_num = 1;
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })

    $(document).on("click", ".inputPageButton", function () {
        var inputNum = parseInt($(".inputPage")[0].value);
        if (inputNum > all_page_num || inputNum < 1) {
            alert("输入的页数不在范围内");
            return;
        }
        page_num = inputNum;
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })

    $(document).on("click", ".pageButton", function () {
        page_num = parseInt($(this)[0].textContent);
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })
    $(document).on("click", ".startsPage", function () {
        page_num = 1;
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })
    $(document).on("click", ".lastPage", function () {
        if (page_num == 1) {
            alert("已经是第一页啦 !");
            return;
        }
        page_num = parseInt(page_num - 1);
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })
    $(document).on("click", ".nextPage", function () {
        if (page_num == all_page_num) {
            alert("已经是最末页啦 !");
            return;
        }
        page_num = parseInt(page_num + 1);
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })
    $(document).on("click", ".endPage", function () {
        page_num = all_page_num;
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
    })


    //按钮注册完毕


    //排序方式
    $(".condition").click(function () {
        $(".condition").parent().css("border-bottom", "0px solid blue");
        $(this).parent().css("border-bottom", "2px solid blue");
//		alert($(this).attr("name"))
        condition = $(this).attr("name");
        show_a_page_video(a_page_num, page_num, condition);
        // show_page_button(a_page_num, page_num, all_page_num);
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
        $("#temp1").empty();
        $(this).css("background", "");
    })

    //鼠标停留
    $(".nav-a td ").mouseenter(function () {
        console.log($(".nav-a").height())
        $(this).css("background", "rgba(255, 255, 255, 0.2)");
        $("#temp1").empty();
//		console.log($(this).attr("name"))
        //先查出section信息
        var sectionId = $(this).attr("sectionId");
        $.get("c_subsection/4sectionId", {"sectionId": sectionId}, function (data) {
            $("#temp1").empty();
            $(data).each(function (index, subSection) {
                $("#temp1").append("<a href='section.html?type=section.s." + subSection.name + "&sectionId=" + subSection.id + "'  name='" + subSection.name + "' style='margin: 1px 10px;'><p style='margin: 0px 15px; '>&gt;&nbsp;" + subSection.name + "</p></a>")
            })
        }, "json")
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


    $(".read-push").mouseenter(function () {
        $(this).css("background-color", "cadetblue");
    }).mouseleave(function () {
        $(this).css("background-color", "white");
    })


})
