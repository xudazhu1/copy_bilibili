//首先监听input框的变动，选中一个新的文件会触发change事件
//document.querySelector("#file").addEventListener("change", function() {
	function upload() {
	//获取到选中的文件
	var file1 = document.querySelector("#file").files[0];
	var cover = document.querySelector("#cover").files[0];
	var subSection = $("#subSection").text();
	var title = $("#title")[0].value;
	var info = $("#info")[0].value;
	//创建formdata对象
	var formdata = new FormData();
	formdata.append("file", file1);
	formdata.append("cover", cover);
	formdata.append("subSection", subSection);
	formdata.append("title", title);
	formdata.append("info", info);
//	alert(formdata.toLocaleString());
	//创建xhr，使用ajax进行文件上传
	var xhr = new XMLHttpRequest();
	xhr.open("post", "c_video");
	//回调
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.querySelector("#callback").innerText = xhr.responseText;
			alert(xhr.responseText)
			setTimeout(function () {
				if ( xhr.responseText === '视频上传成功') {
					window.location.reload();
				}
			}, 500)
		}
	}
	//获取上传的进度
//	document.querySelector(".progress-item").style.display = "block";
	xhr.upload.onprogress = function(event) {
		if(event.lengthComputable) {
			var percent = event.loaded / event.total * 100;
//			document.querySelector(".progress-item").style.width = percent + "%";
			$("#callback").css("width" , parseInt(percent)+"%" );
			$("#callback").text(parseInt(percent)+"%" );
		}
	}
	//将formdata上传
	xhr.send(formdata);
}


$(function(){
	$("#file").change(function(){
		$(".file_name").text("已选择   " + document.querySelector("#file").files[0].name);
//		alert(document.querySelector("#file").files[0].name.split(".")[0])
		$("#title")[0].value = document.querySelector("#file").files[0].name.split(".")[0];
	})
	
	$("#cover").change(function(){
		$(".cover_name").text("已选择   " + document.querySelector("#cover").files[0].name);
	})
	
	$("#submit").click(function(){
		var file1 = document.querySelector("#file").files[0];
		var cover = document.querySelector("#cover").files[0];
		if ($.isEmptyObject(file1) ) {
			alert("您还没选择要上传的视频")
			return false;
		} else {
			if (file1.size /1024 /1024 > 200 ) {
				alert("视频文件过大")
				return false;
			}
		}
		if ($.isEmptyObject(cover)) {
			alert("您还没选择视频封面")
			return false;
		} else {
			if (cover.size /1024  > 600 ) {
				alert("封面文件过大")
				return false;
			}
		}
		//获取登录用户
		$.get("c_user" , function(data){
//			alert(data)
//			如果发现已登陆
			if ( ! $.isEmptyObject(data)) {
				upload();
			} else  {
				alert("登陆超时 请重新登陆");
				window.location.reload();
			}
		} , "json")
		
		
	})
})