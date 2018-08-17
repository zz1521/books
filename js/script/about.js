window.onload = function(){
  mui.plusReady(function(){
  	var version = plus.runtime.version;
    document.getElementById("version").innerText = version;
  
  	var version_server;
  	mui.getJSON(api+'/Util/getNewVersion',setData({version:version}),function(res){
  			version_server = res;
				if(res.code == 200){
						document.getElementById("version_span").innerText = '检测到新版本';
				}else{
						document.getElementById("version_span").innerText = '已是最新版';
				}
		});
  
  	var appInfo = null;
		mui.getJSON(api+'/Util/getConfig',setData({'location':'reg'}),function(res){
			if(res.code == 200){
				appInfo = res.data;
				document.getElementById("login-img").src = imgUrl+res.data.logo;
			}
		});
  
	  
	  //使用协议
	  document.getElementById("syxy").addEventListener('tap',function(e){
	  		mui.openWindow({
		    		url:'info.html',
		    		id:'info',
		    		extras:{title:'使用协议',content:appInfo.use_text},
		    		show:{autoShow:false}
		    });
	  });
	  
	  //免责声明
	  document.getElementById("mzsm").addEventListener('tap',function(e){
	  		mui.openWindow({
		    		url:'info.html',
		    		id:'info',
		    		extras:{title:'免责声明',content:appInfo.duty_text},
		    		show:{autoShow:false}
		    });
	  });
	  
	  //检测新版本
	  document.getElementById("rjbb").addEventListener('tap',function(e){
				try{
					updateApk();
					document.getElementById("version_span").innerText = '下载中';
				}catch(e){
					mui.toast('网络繁忙');
				}
	  })
	  
	  var updateSize =  function(down){			
			console.log(JSON.stringify(down));
			setTimeout(function(){
				document.getElementById("version_span").innerText = Number(down.totalSize/(1024*1024)).toFixed(2)+'M : '+Number(down.downloadedSize/(1024*1024)).toFixed(2)+'M';
		  			if(down.totalSize != down.downloadedSize){
		  				updateSize(down);
		  			}
				},1000);
		}
  });
}