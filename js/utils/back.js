mui.ready(function(){
	//首页返回键处理  2秒内，连续两次按返回键，则退出应用
	var first = null;  
	mui.back=function(){
	if(!first){  
	        first = new Date().getTime();  
	        
	        var msg = '再按一次退出应用';
	        
	        mui.toast(msg);  
	        setTimeout(function(){  
	            first = null;  
	        },2000);  
	    } else {  
	        if(new Date().getTime() - first < 2000){  
	            plus.runtime.quit();  
	        }  
	    }  
	};
})