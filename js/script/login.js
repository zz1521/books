window.onload = function(){
  mui.plusReady(function(){
		
		var appInfo = null;
		mui.getJSON(api+'/Util/getConfig',setData({'location':'common'}),function(res){
			if(res.code == 200){
				appInfo = res.data;
				document.getElementById("logo-img").src = imgUrl+appInfo.logo;
			}
		});
		
		var old = mui.back;  
		var first = null;  
		mui.back=function(){
		if(!first){  
		        first = new Date().getTime();  
		        mui.toast('再按一次退出应用');  
		        setTimeout(function(){  
		            first = null;  
		        },2000);  
		    } else {  
		        if(new Date().getTime() - first < 2000){  
		            plus.runtime.quit();  
		        }  
		    }  
		};


		//点击登录
		document.getElementById("login").addEventListener('tap',function(){
			//阻止输入法软键盘弹出
			document.activeElement.blur();
		
			var account = document.getElementById("account").value;
			if(!account){
					mui.toast('请输入登录邮箱');
					return false;
			}
			
			if(!isEmail(account)){
					mui.toast('请输入正确的邮箱');
					return false;
			}
			
			var password = document.getElementById("password").value;
			if(!password){
					mui.toast('请输入登录密码');
					return false;
			}
			
			if(password.length < 6){
					mui.toast('登录密码不能小于6位');
					return false;
			}
			

			var system;
			if(mui.os.ios){
			    system = 'ios';
			 }else if(mui.os.android){
			 	system = 'android';
			 }
			 
			var model = plus.device.model;
			var vendor = plus.device.vendor;
			var device = system+'-'+vendor+'-'+model;
			
			
			var that = this;
			this.innerText = '登录中...';
			this.disabled = true;
			
			mui.ajax(api+'/login/login',{
				data: setData({email:account,password:password,device:device}),	dataType:'json',type:'post',   
				timeout:10000, headers:{'Content-Type':'application/json'},	              
				success:function(res){
					that.disabled = false;
					that.innerText = '登录';
						
					mui.toast(res.msg);
					if(res.code == 200)
					{
						var user = res.data;
						user['account'] = user['email'];
						user['nickname'] = user['nickname'] ? user['nickname'] : appInfo['default_name'];
						
						console.log(user['head_img']);
//						console.log(user['head_img'].indexOf('data:image'));
						if(user['head_img'] && user['head_img'].indexOf('data:image') != -1){
							user['headImg'] = user['head_img'];
						}else{
							user['headImg'] = imgUrl+appInfo['default_head'];
						}
						
						setStorage('user', user);
						old();
					}
					
				},
				error:function(xhr,type,errorThrown){
					that.disabled = false;
					that.innerText = '登录';
					//异常处理；
					mui.toast('网络繁忙，请重试');
					console.log(type);
				}
			});	
						
		})
  
  	//点击注册
  	document.getElementById("reg").addEventListener('tap',function(){
  		mui.openWindow({url:'reg.html',id:'reg'});
  	});
  	
  	//忘记密码
  	document.getElementById("forgetPassword").addEventListener('tap',function(){
  		mui.openWindow({url:'forget.html',id:'forget'});
  	});
  	
  });
}