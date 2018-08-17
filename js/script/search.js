window.onload = function(){
  mui.plusReady(function(){
  	
//	//底部选项卡被输入法撑起问题
//		document.getElementById('bottomx').style.top = (plus.display.resolutionHeight - 51) + "px";
//		var parentVebView =self.opener();
//		
//		//防止 父页面选项卡被输入法撑起
//		window.addEventListener('resize', function() {
//			var a=plus.android.invoke(plus.android.currentWebview(),"getHeight") ;
//			var b=plus.navigator.getStatusbarHeight();
//			var c=plus.screen.resolutionHeight ;
//			var d=(c-a-b);
//			console.info('webview高度：'+a+" 状态栏高度："+b+" 屏幕高度："+c+" 输入法高度:"+d)
//			d >0 ? self.setStyle({top: '45px',bottom: '0px'}) : self.setStyle({top: '45px',bottom: '50px'}); 
//	  });
  			
				document.getElementById("search_con").addEventListener('keyup',function(e){
						check_search();	
				})
				
				
				//搜索业务处理
				function check_search(search) {
						var search = search || document.getElementById("search_con").value;
						
						if(!search || search.trim() == ""){
							mui.toast('能不能正经点，什么都不输你让我搜啥');
							document.getElementById("search-jl").style.display = 'unset';
							document.getElementById("search-list").style.display = 'none';
							return;
						}
						
						document.getElementById("search-jl").style.display = 'none';
						document.getElementById("search-list").style.display = 'unset';
						document.getElementById("search-key").innerText = search;
				}
				
				
			mui('.mui-table-view').on('tap','li',function(){
  				var id = this.getAttribute('data-id');
					var data = {id:1,name:'太初',image:'images/images/taichu.jpg',types:['玄幻','修仙'],is_end:0,author:'高楼大厦',desc:'一树生的万朵花，天下道门是一家。法术千般变化，人心却亘古不变',new_list:'866',new_list_name:'去化心魔真仙轮【四更】'};
					mui.openWindow({
						url:'book_info.html',
						id:'book_info',
						extras:{data:data},
					    show:{autoShow:false}
					});
  		})
		
			//跳转到书籍详情
			mui('.djzs-data').on('tap','div',function(){
  				var id = this.getAttribute('data-id');
					var data = {id:1,name:'太初',image:'images/images/taichu.jpg',types:['玄幻','修仙'],is_end:0,author:'高楼大厦',desc:'一树生的万朵花，天下道门是一家。法术千般变化，人心却亘古不变',new_list:'866',new_list_name:'去化心魔真仙轮【四更】'};
					mui.openWindow({
						url:'book_info.html',
						id:'book_info',
						extras:{data:data},
					    show:{autoShow:false}
					});
  		})
			
			document.getElementById("qkls").addEventListener('tap',function(){
					document.getElementById("djzs-data").remove();
					document.getElementById("qkls").innerText = '暂无搜索历史';
			});
  });
}