window.onload = function(){
  mui.plusReady(function(){
    //关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
    
    var res = [
    	{id:1,name:'男生',number:0,son:[
    		{id:1,name:'玄幻',number:16898,},
    		{id:1,name:'玄幻',number:16898,},
    		{id:1,name:'玄幻',number:16898,},
    		{id:1,name:'武侠',number:16898,},
    		{id:1,name:'武侠',number:16898,},
    		{id:1,name:'武侠',number:16898,},
    	]},
    	{id:2,name:'女生',number:0,son:[
    		{id:1,name:'言情',number:51540,},
    		{id:1,name:'言情',number:51540,},
    		{id:1,name:'言情',number:51540,},
    		{id:1,name:'纯爱',number:51540,},
    		{id:1,name:'纯爱',number:51540,},
    		{id:1,name:'纯爱',number:51540,},
    	]},
    	{id:3,name:'出版',number:0,son:[
    		{id:1,name:'传记名著',number:5436,},
    		{id:1,name:'传记名著',number:5436,},
    		{id:1,name:'传记名著',number:5436,},
    		{id:1,name:'出版小说',number:5436,},
    		{id:1,name:'出版小说',number:5436,},
    		{id:1,name:'出版小说',number:5436,},
    	]},
    ];
    
    var list = document.getElementById("list");
    for (let i=0; i<res.length; i++) {
    		var son = res[i].son;
//  		console.log(i);
    		var category = document.createElement("div");
    		category.classList.add('category');
    		
    		var jiange = document.createElement("div");
    		jiange.classList.add('jiange');
    		
    		var div = document.createElement("div");
    		var name = document.createTextNode(res[i].name);
  
  			jiange.appendChild(div);
    		jiange.appendChild(name);
  
    		category.appendChild(jiange);
    		
    		var son_element = document.createElement("div");
    		son_element.classList.add('category_row');
    		
    		for (let j=0; j<son.length; j++) {
//  				console.log(j);
    				var div = document.createElement("div");
    				div.setAttribute('data-pindex',i);
    				div.setAttribute('data-index',j);
    				div.setAttribute('data-pid',res[i].id);
    				div.setAttribute('data-id',son[j].id);
    				div.setAttribute('data-name',son[j].name);
    				div.classList.add('category-blok');
    				
    				var span = document.createElement("span");
    				span.innerText = son[j].name;
    				
    				var span2 = document.createElement("span");
    				span2.classList.add('number');
    				span2.innerText = son[j].number+'本';
    				
    				div.appendChild(span);
    				div.appendChild(span2);
    				
    				son_element.appendChild(div);
    		}
    		
    		category.appendChild(son_element);
    		list.appendChild(category);
    }
    
    //点击跳转
    mui('.category_row').on('tap','div',function(){
    	var pid = this.getAttribute('data-pid');
    	var id = this.getAttribute('data-id');
    	
    	var pindex = this.getAttribute('data-pindex');
    	var index = this.getAttribute('data-index');
    	
    	var name = res[pindex].son[index].name;
  
    	mui.openWindow({
    		url:'book_list.html',
    		id:'book_list',
    		extras:{pid:pid,id:id,title:name},
    	});
    });
  });
}