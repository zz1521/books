window.onload = function(){
	var appInfo = null;
	mui.getJSON(api+'/Util/getConfig',setData({'location':'reg'}),function(res){
		if(res.code == 200){
			appInfo = res.data;
			document.getElementById("logo-img").src = imgUrl+appInfo.logo;
			document.getElementById("logo-img1").src = imgUrl+appInfo.logo;
		}
	});
	mui.plusReady(function(){
		//点击登录
		document.getElementById("login").addEventListener('tap',function(){
			mui.back();
		})
		
		var flag = true;
		verifyShow();
		
		var account;
		var password;
		var password2;
		
		var userId;
		var verifyCode;
		
		//https://veui.net/document/index
		function verifyShow(){
			$('#verify').slideVerify({
			    type : 1,
			    barSize:{width:'90%',height:'44px'},
			    success : function() {
			     	  	account = document.getElementById("account").value;
						if(!account){
								mui.toast('请输入登录邮箱');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(!isEmail(account)){
								mui.toast('请输入正确的邮箱账号');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						password = document.getElementById("password").value;
						if(!password){
								mui.toast('请输入登录密码');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(password.length < 6){
								mui.toast('登录密码不能小于6位');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						password2 = document.getElementById("password2").value;
						if(password2 != password){
								mui.toast('密码两次输入不一致');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						if(flag){
							flag = false;
							
							var system;
							if(mui.os.ios){
							    system = 'ios';
							 }else if(mui.os.android){
							 	system = 'android';
							 }
							 
							var model = plus.device.model;
							var vendor = plus.device.vendor;
							
							var device = system+'-'+vendor+'-'+model;
							var data = setData({device:device,email:account,password:password,password2:password2});
							
							loading.show();
							mui.ajax(api+'/login/reg',{
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
										verifyCode = res.data.code;
										userId = res.data.id;
										
										$("#one").attr('style','display: none;');
										$("#two").attr('style','display: block;');
										settime($('#send'));
									}
									else
									{
										flag = true;
										$('#verify').empty();
										verifyShow();
									}
								},
								error:function(xhr,type,errorThrown){
									//异常处理；
									loading.hide();
									mui.toast('网络繁忙，请重试');
									flag = true;
									$('#verify').empty();
									verifyShow();
									console.log(type);
								}
							});	
						}
			    }
			});	
		}
		
		document.getElementById("account").addEventListener('blur',function(){
			var account = document.getElementById("account").value;
			if(!account){
					mui.toast('请输入登录邮箱');
			}
			else if(!isEmail(account)){
					mui.toast('请输入正确的邮箱账号');
			}
		});
		
		document.getElementById("password").addEventListener('blur',function(){
			var password = document.getElementById("password").value;
			if(!password){
					mui.toast('请输入登录密码');
			}
			else if(password.length < 6){
					mui.toast('登录密码不能小于6位');
			}
		});
		
		document.getElementById("password2").addEventListener('blur',function(){	
			var password2 = document.getElementById("password2").value;
			var password = document.getElementById("password").value;
			if(password2 != password){
					mui.toast('密码两次输入不一致');
			}
		});
		
		
		//立即注册
		document.getElementById("submit").addEventListener('tap',function(){
			var code = document.getElementById("code").value;
			if(!code){
				mui.toast('请输入邮箱验证码');
				return false;
			}
			
			if(code != verifyCode){
				mui.toast('验证码输入有误');
				return false;
			}
			
			loading.show();
			
			var data = setData({uid:userId,status:"1"});
			mui.ajax(api+'/login/setUserStatus',{
				data:data,
				dataType:'json',
				type:'post',
				timeout:10000,
				headers:{'Content-Type':'application/json'},	              
				success:function(res){
					loading.hide();
					if(res.code != 200){
						mui.toast(res.msg);	
						return false;
					}
					
					mui.toast('注册完成，请登录');
					mui.back();
				},
				error:function(xhr,type,errorThrown){
					loading.hide();
					//异常处理；
					console.log(type);
				}
			});	
						

		});
		
		
		//倒计时
		var countdown = 60;
        var sending = false;
        
        //重新发送
        document.getElementById("send").addEventListener('tap',function(){
        	this.disabled = true;
        	this.value = '发送中';
        	mui.post(api+'/login/reSend',setData({email:account}),function(res){
        		console.log(JSON.stringify(res));
        		
        		mui.toast(res.msg);
        		if(res.code == 200){
        			verifyCode = res.data.code;
					userId = res.data.id;
        			settime($('#send'));        			
        		}
        	},'json')

        });
		
        function settime(obj) { //发送验证码倒计时
            if (countdown == 0) {
                obj.attr('disabled', false);
                obj.val("重新发送");
                countdown = 60;
                sending = false;
                return;
            } else {
                obj.attr('disabled', true);
                obj.val(countdown +"S");
                countdown--;
            }
            setTimeout(function () {
                settime(obj);
            }, 1000)
        }

	});
}
