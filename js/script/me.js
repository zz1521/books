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
  	//自定义事件
  	window.addEventListener('refresh',function(event){
		  	showHead();
		  	showNickname();
		});
  	
  	//退出登录
    document.getElementById("out").addEventListener('tap',function(){
    	delStorage('user');
    	mui.openWindow({url:'login.html',id:'login'});
    	mui.toast('已退出');
    })
    
    //清理缓存
    document.getElementById("clean").addEventListener('tap',function(){
    	mui.toast('缓存已清除');
    })
    
    //关于我们
    document.getElementById("about").addEventListener('tap',function(){
    		mui.openWindow({url:'about.html',id:'about'});
    })
    
    //安全设置
    document.getElementById("safety").addEventListener('tap',function(){
    		mui.openWindow({url:'safety.html',id:'safety'});
    });
    
    //个人设置
    document.getElementById("user_info").addEventListener('tap',function(){
    		mui.openWindow({url:'user_info.html',id:'user_info'});
    });
  });
}