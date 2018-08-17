window.onload = function(){
	mui.plusReady(function(){
		
		var flag = true;
		var email = null;
		var verifyCode = null;
		var password = null;
		
		verifyShow();
		
		//https://veui.net/document/index
		function verifyShow(){
			$('#verify').slideVerify({
			    type : 1,
			    barSize:{width:'90%',height:'44px'},
			    success : function() {
			     	  	password = document.getElementById("password").value;
						if(!password){
								mui.toast('请先输入密码');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(password.length < 6){
								mui.toast('密码不能小于6位');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						email = document.getElementById("email").value;
						if(!email){
								mui.toast('请输入新邮箱账号');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						else if(!isEmail(email)){
								mui.toast('邮箱不符合规则');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						if(flag){
							flag = false;
							var user = JSON.parse(storage.getItem('user'));
							var data = setData({uid:user.id,password:password,email:email,action:'email'});
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
		
		document.getElementById("password").addEventListener('blur',function(){
			var password = document.getElementById("password").value;
			if(!password){
					mui.toast('请先输入密码');
			}
			else if(password.length < 6){
					mui.toast('密码长度最低6位');
			}
		});
		
		document.getElementById("email").addEventListener('blur',function(){
			var email = document.getElementById("email").value;
			if(!email){
				mui.toast('请输入新邮箱账号');
			}
			else if(!isEmail(email)){
				mui.toast('邮箱不符合规则');
			}
		});
		
		var user = storage.getItem('user');
		
		//立即修改
		document.getElementById("submit").addEventListener('click',function(){
			var code = document.getElementById("code").value;
			if(!code){
				mui.toast('请输入新邮箱验证码');
				return false;
			}
			
			if(code != verifyCode){
				mui.toast('验证码输入有误');
				return false;
			}
			
			loading.show();
			var user = JSON.parse(storage.getItem('user'))
			var data = setData({uid:user['id'],email:email});
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
					
					user['account'] = email;
					storage.setItem('user',JSON.stringify(user));
					
					mui.toast('邮箱修改成功');
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
        	mui.post(api+'/Users/reSend',setData({email:email,title:'更换邮箱验证',content:'您正在修改登录邮箱'}),function(res){
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
