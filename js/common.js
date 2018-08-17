/*
 * 以下为app基础配置参数 
 */

var xy = 'http://';	//协议

var domain = 'book.hello-world.ren';//api域名

var port = 80;//端口

var api = xy+domain+':'+port;//完整的api

var tokenKey = 'yyds';//加密请求参数的token key

var storage = window.localStorage;//localStorage对象

var imgUrl = api+'/uploads/';

/*
 * 以下为app需要引入的通用文件 
 */

//MD5.js
var head = document.getElementsByTagName('head')[0];
var scr = document.createElement("script");
scr.src = 'js/utils/md5.js';
head.appendChild(scr)


/*
 * 以下为app中用到的的通用函数 
 */


//加密参数函数
var setData = function(data){
	data['time'] =  String(Math.round(new Date() / 1000));
	
	var token = '';
	for (key in data) {
		token += hex_md5(String(data[key]));
	}
	
	data['token'] = hex_md5(tokenKey+'_'+token+'_'+tokenKey);
	return data;
}

//更新应用资源包（wgt,apk）
function updateApk(){
	
  	mui.getJSON(api+'/Util/getNewVersion',setData({version:plus.runtime.version}),function(res){
		version_server = res;
			if(res.code != 200){
				return false;
			}
			
		layer.open({
		  	title: [
		      '检测到新版本，是否立即更新？',
		      'background-color: #FF4351; color:#fff;'
		    ]
		    ,content: updateDesc('<p>更新说明:</p><br><p>* 修复一些已知的BUG</p><br><p>* 提高程序稳定性</p>')
		    ,btn: ['立即更新', '忽略']
		    ,yes: function(index){
		    	
			  	var path = '_doc/update/';
				var fileName = String(version_server.data.url).split('/');
				fileName = fileName[fileName.length-1];
				
				//删除安装包
				deletePage(path);
				
				mui.toast('开始下载');
	           	var down = plus.downloader.createDownload(imgUrl+version_server.data.url,{method:"GET",filename:path+fileName},
				function(download,status){
					if (status == 200) {
	    				installApk(path+fileName);
					}
				});
				
				down.start();
		    	layer.close(index);
		    }
		    ,no: function(index){
		      	layer.close(index);
		    }
		});
	});
}


// 更新应用资源
var installApk = function(path){
	plus.runtime.install(path,{},function(data){
        console.log("安装文件成功！");
        
    },function(e){
        console.log(JSON.stringify(e));
    	mui.toast('安装失败');
    });
}

//删除安装包资源
var deletePage = function(path){
    plus.io.resolveLocalFileSystemURL(path,
    function(entry){
		entry.removeRecursively(function(s){
			console.log('安装包已删除');
			
		},function(e){
			console.log('安装包删除失败');
		});
    },
    function(e){
    	console.log('io失败');
    });
}

//更新说明HTML文档
function updateDesc(desc) {
	var code = '<html>'+
	'<head>'+
		'<style type="text/css">'+
			'.layui-m-layercont{padding: 15px 15px;line-height: 10px;}'+
			'.update-content{'+
			'	text-align: left;'+
			'}'+
		'</style>'+
	'</head>'+
	'<body>'+
	    '<div class="update-content">'+
	    	desc	
	    +'</div>'+
	'</body>'+
'</html>';

return code;
}


//loading蒙版对象
var loading = 
{
	show:function(){
		load();
	},
	hide:function(){
		plus.nativeUI.closeWaiting();
	},
	
};

//loading蒙版函数
var load = function(){
	plus.nativeUI.showWaiting(
			"加载中",//等待对话框上显示的提示标题内容
			{
				loading:
				{
					icon:"images/system/load.png",
					interval:1000,
					height:'60px',
					display:'block',
				},
			size:"14px",
			textalign:"left",
			background:"rgba(0,0,0,.3)",
			back:'close',
			round:'100px',
			width:'100%',
			height:'100%',
			}
	);
}


//创建并初始化子webview窗口
function loadWebViwe(){
	if(!storage.getItem('user')){
		console.log(storage.getItem('user'));
		return false;
	}
	
	
	// 创建子webview窗口 并初始化
	var aniShow = {};

	util.initSubpage(aniShow);
	var nview = plus.nativeObj.View.getViewById('tabBar'),
		activePage = plus.webview.currentWebview(),
		targetPage,
		subpages = util.options.subpages,
		pageW = window.innerWidth,
		currIndex = 0;
	
		
	/**
	 * 根据判断view控件点击位置判断切换的tab
	 */
	nview.addEventListener('click', function(e) {
		var clientX = e.clientX;
		if(clientX > 0 && clientX <= parseInt(pageW * 0.25)) {
			currIndex = 0;
		} else if(clientX > parseInt(pageW * 0.25) && clientX <= parseInt(pageW * 0.45)) {
			currIndex = 1;
		} else if(clientX > parseInt(pageW * 0.45) && clientX <= parseInt(pageW * 0.8)) {
			currIndex = 2;
		} else {
			currIndex = 3;
		}
		// 匹配对应tab窗口	
		if(currIndex > 0) {
			targetPage = plus.webview.getWebviewById(subpages[currIndex - 1]);
		} else {
			targetPage = plus.webview.currentWebview();
		}

		if(targetPage == activePage) {
			return;
		}

		//底部选项卡切换
		util.toggleNview(currIndex);
		// 子页面切换
		util.changeSubpage(targetPage, activePage, aniShow);
		//更新当前活跃的页面
		activePage = targetPage;
	
	});




/*
 * 以下为app中会触发的通用事件 
 */


//login事件
//window.addEventListener('login',function(event){
//	loadWebViwe();
//});

}
  