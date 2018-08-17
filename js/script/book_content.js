window.onload = function(){
	document.addEventListener('swiperight',function(){
			prevPage();
	})
	
//	var ifr = document.getElementsByTagName('iframe');
//	console.log(ifr);
//	console.log(ifr[0]);
//	
	document.addEventListener('swipeleft',function(){
			nextPage();
	})

		//设置内容区域高度
		var he =  window.innerHeight-10;
		document.getElementById("mui-content").style.height = he+'px';

		//渲染内容
		var Book = ePub("data/test.epub");//获得解析图书的实例
	  var rendition = Book.renderTo("content_main",{ restore: true,width:100,height:100});

		Book.getMetadata().then(function(meta){
				console.log(meta)
		});
		
		Book.on('book:pageChanged', function(location){
		    console.log(location.anchorPage, location.pageRange)
		});

	  //跳转到第一章
		Book.getToc().then(function(toc){
			Book.goto(toc[0].href);
			document.getElementById("mu-name").innerText = toc[0].label;
			document.getElementById("foot-ml").innerText = toc[0].label;
			
			var con = document.getElementsByTagName('iframe');
			console.log(JSON.stringify(con))
		
		});
		
		
//		con.on('tap','iframe',function(){
//			alert(1);
////			nextPage();
//		});

	
	//翻到下一页
	function nextPage(){
		Book.nextPage();
	}
	
	//翻到上一页
	function prevPage(){
		Book.prevPage();
	}

	mui.plusReady(function(){
  	var old_back = mui.back;
  	mui.back = function(){
  		// 关闭全屏
    	plus.navigator.setFullscreen(false);
  		old_back();
  	}
  	
  	// 全屏显示
    plus.navigator.setFullscreen(true);
    
	
		//关闭等待框
	    plus.nativeUI.closeWaiting();
	    //显示当前页面
	    mui.currentWebview.show();
	
		
		var height = window.screen.height;
		var width = window.screen.width;
  
  	var top = (height/10)*2;
    var bootom = (height/10)*8;
    
    var left = (width/10)*2;
    var right = (width/10)*8;

		document.onclick=function(ev){                
		    var oEvent=ev||event;
		    var x = oEvent.screenX;
		    var y = oEvent.screenY;
		    
		    if((y>left && y<right)){
		    		document.getElementById("head").setAttribute('style',"display:unset;");
		    		document.getElementById("foot").setAttribute('style',"display:unset;");	
		    }
		    else
		    {
		   			document.getElementById("head").setAttribute('style',"display:none;");
		    		document.getElementById("foot").setAttribute('style',"display:none;");
		    }

		};
		
		//获取元素的纵坐标（相对于窗口）
		function getTop(e){
		  var offset=e.offsetTop;
		  if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
		  return offset;
		}
		
		//获取元素的横坐标（相对于窗口）
		function getLeft(e){
		  var offset=e.offsetLeft;
		  if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
		  return offset;
		}
  });
 
}