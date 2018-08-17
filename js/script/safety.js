window.onload = function(){
  mui.plusReady(function(){
   		//修改密码
	    document.getElementById("change").addEventListener('tap',function(){
	    		mui.openWindow({url:'change.html',id:'change'});
	    })
	    
	    //修改邮箱
	    document.getElementById("account").addEventListener('tap',function(){
	    		mui.openWindow({url:'change_mail.html',id:'change_mail'});
	    })
	    
	    //手势解锁
	    document.getElementById("shoushi").addEventListener('tap',function(){
	    		mui.toast('正在开发ING');
	    });
  });
}