window.onload = function(){
  mui.plusReady(function(){
    var self = plus.webview.currentWebview();
		var content = self.content;
		var title = self.title;


		var node_title = document.createTextNode(title);
		var node_content = document.createTextNode(content);
		
		document.getElementById("title").appendChild(node_title);
		document.getElementById("content").appendChild(node_content);
  
  	//关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
  });
}