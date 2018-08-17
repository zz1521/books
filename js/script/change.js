window.onload = function(){
	mui.plusReady(function(){
		
		var flag = true;
		var email = null;
		var old_password = null;
		var new_password = null;
		var new_password2 = null;
		var verifyCode = null;
		verifyShow();
		
		//https://veui.net/document/index
		function verifyShow(){
			$('#verify').slideVerify({
			    type : 1,
			    barSize:{width:'90%',height:'44px'},
			    success : function() {
			     	  	old_password = document.getElementById("old_password").value;
						if(!old_password){
								mui.toast('请输入原密码');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(old_password.length < 6){
								mui.toast('原密码不能小于6位');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						new_password = document.getElementById("new_password").value;
						if(!new_password){
								mui.toast('请输入新登录密码');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(new_password.length < 6){
								mui.toast('新登录密码不能小于6位');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						new_password2 = document.getElementById("new_password2").value;
						if(new_password2 != new_password){
								mui.toast('新密码两次输入不一致');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						if(flag){
							flag = false;
							
							var user = JSON.parse(storage.getItem('user'));
							var data = setData({uid:user.id,password:old_password,new_pwd:new_password,action:'password'});
							console.log(JSON.stringify(data))
						
							loading.show();
							mui.ajax(api+'/Users/checkUser',{
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
		
		document.getElementById("old_password").addEventListener('blur',function(){
			var old_password = document.getElementById("old_password").value;
			if(!old_password){
					mui.toast('请输入原密码');
			}
			else if(old_password.length < 6){
					mui.toast('原密码长度最低6位');
			}
		});
		
		document.getElementById("new_password").addEventListener('blur',function(){
			var new_password = document.getElementById("new_password").value;
			if(!new_password){
					mui.toast('请输入新登录密码');
			}
			else if(new_password.length < 6){
					mui.toast('新登录密码不能小于6位');
			}
		});
		
		document.getElementById("new_password2").addEventListener('blur',function(){	
			var new_password2 = document.getElementById("new_password2").value;
			var new_password = document.getElementById("new_password").value;
			if(new_password2 != new_password){
					mui.toast('新密码两次输入不一致');
			}
		});
		
		
		//立即修改
		document.getElementById("submit").addEventListener('click',function(){
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
			var user = JSON.parse(storage.getItem('user'))
			var data = setData({uid:user['id'],password:new_password});
			mui.ajax(api+'/Users/updateUser',{
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
					
//					user['account'] = email;
//					storage.setItem('user',JSON.stringify(user));
//					
					mui.toast('密码修改成功');
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
        
        document.getElementById("send").addEventListener('tap',function(){
        	this.disabled = true;
        	this.value = '发送中';
        	mui.post(api+'/Users/reSend',setData({email:JSON.parse(storage.getItem('user'))['account'],title:'账号保护',content:'您正在修改登录密码'}),function(res){
        		console.log(JSON.stringify(res));
        		
        		mui.toast(res.msg);
        		if(res.code == 200){
        			verifyCode = res.data.code;
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
