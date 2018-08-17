window.onload = function(){
  mui.plusReady(function(){
    //关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
    
    var self = plus.webview.currentWebview();
    var type = self.type;
		var title = self.title;
		document.getElementById("title").innerText = title;
		
		//根据type查询向服务器请求数据
		var res = [
				{id:1,name:'太初',image:'images/images/taichu.jpg',types:['玄幻','修仙'],is_end:0,author:'高楼大厦',desc:'一树生的万朵花，天下道门是一家。法术千般变化，人心却亘古不变',new_list:'866',new_list_name:'去化心魔真仙轮【四更】'},
				{id:2,name:'武侠世界轮回者',image:'images/images/wxsj.jpg',types:['科幻','穿越'],is_end:0,author:'墨雨云山',desc:'一个平凡少年，行走在武侠世界，最终成为超凡强者的故事。QQ书友群：718842709',new_list:'866',new_list_name:'去化心魔真仙轮【四更】'}
		];
		
		//榜单列表渲染
		var ul = document.getElementById("list");
		
		for (let i=0; i<res.length; i++) {
			var li = document.createElement("li");
			li.classList.add("mui-table-view-cell");
			li.classList.add("mui-media");
			li.setAttribute('data-id',res[i].id);
			li.setAttribute('data-index',i);
			
			var a = document.createElement("a");
			a.href = "javascript:;";
			
			var img = document.createElement("img");
			img.src = res[i].image;
			img.classList.add("mui-media-object");
			img.classList.add("mui-pull-left");
			
			var div = document.createElement("div");
			div.classList.add("mui-media-body");
			
			var span = document.createElement("span");
			span.classList.add('book-name');
			span.innerText = res[i].name;
			
			var p = document.createElement("p");
			p.classList.add('mui-ellipsis');
			p.classList.add('book-author');
			
			for (let j=0; j<res[i].types.length; j++) {
				var span1 = document.createElement("span");
				span1.innerText = res[i].types[j]+' ';
				p.appendChild(span1);
			}
			
			var span2 = document.createElement("span");
			span2.innerText = res[i].is_end===1 ? '已完结' : '连载中';
			p.appendChild(span2);
			
			var zuozhe = document.createElement("p");
			zuozhe.classList.add('mui-ellipsis');
			zuozhe.classList.add('book-time');
			
			var e_i = document.createElement("i");
			e_i.classList.add('mui-icon')
			e_i.classList.add('iconfont')
			if(type == 'master'){
					e_i.classList.add('icon-huangguan');				
			}else{
					e_i.classList.add('icon-zuozhe1');
			}
			e_i.classList.add('cnm')

		
			var mingzi = document.createTextNode(res[i].author);
			
			zuozhe.appendChild(e_i);
			zuozhe.appendChild(mingzi);
			
			var p2 = document.createElement("p");
			p2.classList.add('mui-ellipsis');
			p2.innerText = '简介：'+res[i].desc;
			
			div.appendChild(span);
			div.appendChild(p);
			div.appendChild(zuozhe);
			div.appendChild(p2);
			
			
			a.appendChild(img);
			a.appendChild(div);
			
			li.appendChild(a);
			
			ul.appendChild(li);
		}
		
		
			//列表点击进入书籍详情页面
			mui('.mui-table-view').on('tap','li',function(){
				var index = this.getAttribute('data-index');
				mui.openWindow({
					url:'book_info.html',
					id:'book_info',
					extras:{data:res[index]},
				    show:{autoShow:false}
				});
			})
  });
}