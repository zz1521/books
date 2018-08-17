$(function() {
	! function() {
		var i = {
			aspectRatio: 1 / 1
		};
	}()
});
(function(c) {
	var Cro = function() {}
	c.extend(Cro.prototype, {
		orientation: null,
		simg: null,
		simg2: null,
		urldata: null,
		view: null,
		num: 0,
		sbx: null,
		sby: null,
		n: 0,
		onReady: function() {
			var that = this;
			mui.init();
			that.bindEvent();
			that.view = plus.webview.currentWebview();

			that.simg = document.createElement("img");
			that.simg.setAttribute("id", "simg");
			document.body.appendChild(that.simg);

			var url = that.view.path;
			var img = document.createElement("img");
			img.setAttribute("src", url);
			img.addEventListener("load", function() {
				EXIF.getData(img, function() {
					var orientation = EXIF.getAllTags(this).Orientation;
					$("#im").attr("src", that.loadcopyImg(img, orientation));
					that.cropperImg();
					
					//关闭等待框
				    plus.nativeUI.closeWaiting();
				    //显示当前页面
				    mui.currentWebview.show();
				});
			})
		},
		cropperImg: function() {
			var that = this;
			$('#cropper-example-1 > img').cropper({
				aspectRatio: 1 / 1,
				autoCropArea: 1,
				strict: true,
				background: false,
				guides: false,
				highlight: false,
				dragCrop: false,
				movable: false,
				resizable: false,
				crop: function(data) {
					that.urldata = that.base64(data);
				}
			});
		},
		loadcopyImg: function(img, opt) {
			var that = this;
			var canvas = document.createElement("canvas");
			var square = 500;
			var imageWidth, imageHeight;
			if (img.width > img.height) {
				imageHeight = square;
				imageWidth = Math.round(square * img.width / img.height);
			} else {
				imageHeight = square; //this.width;
				imageWidth = Math.round(square * img.width / img.height);
			}
			canvas.height = imageHeight;
			canvas.width = imageWidth;
			if (opt == 6) {
				that.num = 90;
			} else if (opt == 3) {
				that.num = 180;
			} else if (opt == 8) {
				that.num = 270;
			}
			if (that.num == 360) {
				that.num = 0;
			}

			var ctx = canvas.getContext("2d");
			ctx.translate(imageWidth / 2, imageHeight / 2);
			ctx.rotate(that.num * Math.PI / 180);
			ctx.translate(-imageWidth / 2, -imageHeight / 2);
			ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
			//document.getElementById("test").appendChild(canvas);
			var dataURL = canvas.toDataURL("image/jpeg", 1);
			return dataURL;
		},
		bindEvent: function() {
			document.getElementById("quxiao").addEventListener("click", function() {
				window.cro.view.close();
			});
			document.getElementById("xuanqu").addEventListener("click", function() {
				var base64 = window.cro.urldata;
				var user = JSON.parse(localStorage.getItem('user'));
				user['headImg'] = base64;
				user['head_img'] = base64;
				
				var data = setData({uid:user.id,head_img:base64});
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
						mui.toast(res.msg);
						if(res.code == 200)
						{
							localStorage.setItem('user',JSON.stringify(user));
							var info = plus.webview.getWebviewById('user_info');
							mui.fire(info,'refresh');
						}
						mui.back();
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						loading.hide();
						mui.toast('网络繁忙，请重试');
						mui.back();
						console.log(type);
					}
				});
				
			});
		},
		base64: function(data) {
			var that = this;
			var img = document.getElementById("im");

			var canvas = document.createElement("canvas");
			canvas.height = 200;
			canvas.width = 200;

			var bx = data.x;
			var by = data.y;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, bx, by, data.width, data.height, 0, 0, 200, 200);
			var dataURL = canvas.toDataURL("image/jpeg", 0.5);
			return dataURL;
		},
		getdata: function() {
			var view1 = plus.webview.getWebviewById("modifyInfo.html");
			mui.fire(view1, 'headimg', {});
			window.cro.view.close();
		},
		showFace: function(str) {
			str = str.replace("data:image/jpeg;base64,", "");
			str = str.replace("data:image/png;base64,", ""); //三星手机剪裁后的图片格式为png
			alert(str);
		}
	});
	window.cro = new Cro();
	c.plusReady(function() {
		window.cro.onReady();
	})
})(mui)