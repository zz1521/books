window.onload = function(){
	
  mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var data = self.data;
    console.log(JSON.stringify(self.data));
    
    document.getElementById("book-img").src = data.image;
    document.getElementById("title").innerText = data.name;
    document.getElementById("book-name").innerText = data.name;
    document.getElementById("book-author").innerText = data.author;
    document.getElementById("book-desc").innerText = data.desc;
    document.getElementById("is_end").innerText = data.is_end==1?'已完结':'连载中';
    document.getElementById("types").innerHTML = '<i class="mui-icon iconfont icon-leibie"></i>';
    
    for (let i=0; i<data.types.length; i++) {
    	var span = document.createElement("span");
    	span.innerText = data.types[i];
    	document.getElementById("types").appendChild(span);
    }
    
     document.getElementById("new_list").innerText = data.new_list;
     
     
     //查看全部章节
     document.getElementById("look_all").addEventListener('tap',function(){
     		lookAll();
     });
     document.getElementById("look_all_list").addEventListener('tap',function(){
    		lookAll();
     });
     
     function lookAll(){
    		mui.openWindow({
    			url:'chapter.html',
    			id:'chapter',
    			extras:{bookId:1},
			    show:{autoShow:false}
				});
     }
     
     mui('.new_list').on('tap','li',function(){
//   	if(!this.getAttribute('is_look_all')){
     		mui.toast('跳转到阅读页');	
//   	}
     });
     
     
     //关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
  });
}