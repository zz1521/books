window.onload = function(){
  mui.plusReady(function(){
  		//是否登录
			if(!storage.getItem('user')){
					mui.openWindow({url:'login.html',id:'login'});
					return false;
			}
  		
  		
  		loadWebViwe();
  		
  		if(mui.os.android){
  			updateApk();
			}
  		
  		mui('.mui-table-view').on('tap','li',function(){
  				mui.openWindow({
  					url:'book_content.html',
  					id:'book_content'
  				});
  		})
	});
}