window.onload = function(){
	mui.plusReady(function(){
		
		var flag = true;
		var password;
		var account;
		var verifyCode;
		var uid;
		
		verifyShow();
		
		//https://veui.net/document/index
		function verifyShow(){
			$('#verify').slideVerify({
			    type : 1,
			    barSize:{width:'90%',height:'44px'},
			    success : function() {
			     	  	account = document.getElementById("account").value;
						if(!account){
								mui.toast('请输入注册邮箱');
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
						
						var password2 = document.getElementById("password2").value;
						if(password2 != password){
								mui.toast('密码两次输入不一致');
								$('#verify').empty();
								verifyShow();
								return false;
						}
						
						if(flag){
							flag = false;		
							var data = setData({password:password,email:account});
					
							loading.show();
							mui.ajax(api+'/users/forget',{
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
										uid = res.data.uid;
										
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
					mui.toast('请输入注册邮箱');
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
			var data = setData({uid:uid,forget:password});
			mui.ajax(api+'/Users/updateUser',{
				data:data,
				dataType:'json',
				type:'post',
				timeout:10000,
				headers:{'Content-Type':'application/json'},	              
				success:function(res){
					loading.hide();
					mui.toast(res.msg)
					if(res.code == 200){
						mui.back();
					}
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
        	mui.post(api+'/Users/reSend',setData({email:account,title:'重置登录密码',content:'您正在重置登录密码'}),function(res){
        		console.log(JSON.stringify(res));
        		
        		mui.toast(res.msg);
        		if(res.code == 200){
        			uid = res.data.uid;
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
