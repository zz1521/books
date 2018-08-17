window.onload = function(){	
			
	var flag = true;
	  //服务端数据
    var res = [
    	{id:1,name:'大田金鳞元神出',num:1,type:1},
    	{id:2,name:'山中神仙选仙苗',num:2,type:1},
    	{id:3,name:'仙尊真乙太初教',num:3,type:1},
    	{id:4,name:'太初山中绝毒谷',num:4,type:1},
    	{id:5,name:'显灵台上鉴仙眼',num:5,type:1},
    	{id:6,name:'紫气东来惊仙鉴',num:6,type:1},
    	{id:7,name:'淡然明鉴道初心',num:7,type:1},
    	{id:8,name:'灵田谷中引灵种',num:8,type:1},
    	{id:9,name:'道心固来一炷香',num:9,type:1},
    	{id:10,name:'书中自有黄金屋',num:10,type:1},
    ];
    
    res = selectionSort(res,flag);
    flag = false;
    actionDOM(res);

    //渲染页面
    function actionDOM(res){
    		var ul = document.getElementById("list");
    	
    		for (let i=0; i<res.length; i++) {
    				var li = document.createElement("li");
    				li.classList.add('mui-table-view-cell');
    				li.setAttribute('data-index',i);
    				li.setAttribute('data-id',res[i].id);
    				
    				var a = document.createElement("a");
    				a.classList.add('mui-navigate-right');
    				
    				var span = document.createElement("span");
    				span.classList.add('book-list-num');
    				span.innerText = '第'+res[i].num+'章';
    				
    				var span1 = document.createElement("span");
    				span1.classList.add('zxzj');
    				span1.innerText = res[i].name;
    				
    				a.appendChild(span);
    				a.appendChild(span1);
    				
    				li.appendChild(a);
    				
    				ul.appendChild(li);
    		}
    }
    
	
  mui.plusReady(function(){
    //关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
    
    //阅读章节
    mui('.mui-table-view').on('tap','li',function(){
    	mui.toast('当前章节ID为：'+this.getAttribute('data-id')+' 跳转到阅读页')
    });
    
    //切换排序
    document.getElementById("sort").addEventListener('tap',function(){
    		var re = selectionSort(res,flag);
    		flag = flag?false:true;
    		document.getElementById("list").innerHTML = '';
    	 	actionDOM(re);
    })
    
  });
}