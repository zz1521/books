window.onload = function(){
  mui.plusReady(function(){
  		
  		//检测网络环境
  		netWorkStatus(function(info){
  			if(info.status==0){
  				mui.toast('网络异常，请检查网络后重试')
  			}
  		});
  		
  		//是否登录
			if(!storage.getItem('user')){
					mui.openWindow({url:'login.html',id:'login'});
					return false;
			}
			
  		var user = JSON.parse(storage.getItem('user'));
  		
  		//更新用户信息
  		mui.getJSON(api+'/Users/getInfo',setData({id:user.id}),function(res){
					if(res.code == 200)
					{
						var userInfo = res.data;
						userInfo['account'] = userInfo['email'];
						userInfo['nickname'] = userInfo['nickname'] ? userInfo['nickname'] : user['nickname'];		
						userInfo['headImg'] = userInfo['head_img'] ? userInfo['head_img'] : user['headImg'];
						setStorage('user', user);
					}
				}
			);
  		
  		//渲染底部选项卡
  		loadWebViwe();
  		
  		
  		//检测更新
  		if(mui.os.android){
  			updateApk();
			}
  		
  		
  		//调转到阅读页
  		mui('.mui-table-view').on('tap','li',function(){
  				mui.openWindow({
  					url:'book_content.html',
  					id:'book_content'
  				});
  		})
  		
  		//移出书架
  		mui('.mui-slider-right').on('tap','a',function(){
  				document.getElementById(this.getAttribute('data-id')).remove();
  		})
	});
}