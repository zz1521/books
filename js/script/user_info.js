window.onload = function(){
	showHead();
	showNickname();

//页面渲染方法
function showHead(){
	document.getElementById("user_head_img_s").src = getStorage('user').headImg;
}
function showNickname(){
	document.getElementById("user_nickname_s").innerText = getStorage('user').nickname;
}


mui.plusReady(function(){
	window.addEventListener('refresh',function(event){
	  	showHead();
	});
	
	function changeNickname(nickname,callback){
		var user = JSON.parse(storage.getItem('user'));
		var data = setData({uid:user.id,nickname:nickname});
		console.log(JSON.stringify(data))
						
		loading.show();
		mui.ajax(api+'/Users/updateUser',{
			data:data,
			dataType:'json',
			type:'post',   
			timeout:10000,
			headers:{'Content-Type':'application/json'},	              
			success:function(res){
				loading.hide();
				callback(res);
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				loading.hide();
				mui.toast('网络繁忙，请重试');
				console.log(type);
			}
		});	
	}
	
    //修改昵称
    document.getElementById("user_nickname_s").addEventListener('click',function(){
	    mui.prompt('', '给自己换个新昵称吧^_^', '请输入新昵称', ['取消', '确定'], function(e){
	 		console.log(JSON.stringify(e));
	 		if(e.index==1){
	 			if(e.value){
	 				if(e.value.length > 10){
	 					mui.toast('昵称长度不能超过10个字哦');
	 				}
	 				else
	 				{
	 					changeNickname(e.value,function(res){
	 						mui.toast(res.msg);
							if(res.code == 200)
							{
								document.getElementById("user_nickname_s").innerText = e.value;
	 							appendStorage('user',{nickname:e.value})
							}
	 					})	
	 				}
	 			}
	 			else{
		 			mui.toast('昵称不能为空');
		 		}
	 		}
		 },'div');    
    });
    
    document.getElementById("head_img").addEventListener('click',function(){
	  	var btnArray = [
	  		{title: "拍照"}, 
	  		{title: "从相册选择"}
	  	];
		plus.nativeUI.actionSheet({
			title: "选择照片",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			switch (index) {
				case 0:
					break;
				case 1:
					camera();//相机
					break;
				case 2:
					local();//相册
					break;
			}
		});
	});
    
	
	//从相册选取
	function local(){
		plus.gallery.pick(function(url) {
			mui.openWindow({
				url: 'crop.html',
				id: 'crop.html',
				extras: {
					path: url,
					change: "open"
				},
				show:{autoShow:false}
			});
		}, function(error) {
			//关闭相册或者打开失败
		});
	}
	
	//拍照
	function camera(){
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(p) {
			plus.io.resolveLocalFileSystemURL(p, function(entry) {
				mui.openWindow({
					url: 'crop.html',
					id: 'crop.html',
					extras: {
						path: "file:///" + entry.fullPath,
						change: "cem"
					},
					show:{autoShow:false}
				});
			}, function(e) {
				mui.toast(e.message);
			});
		}, function(e) {}, {
			filename: "_doc/camera/"
		});
	}
});
}