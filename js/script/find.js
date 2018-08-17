window.onload = function(){

	//轮播数据
	var sliders = [
		{id:1,book_id:1,img:'images/images/lb1.jpg'},
		{id:2,book_id:2,img:'images/images/lb2.jpg'},
		{id:3,book_id:3,img:'images/images/lb3.jpg'}
	];
	
	//轮播渲染
	var slider_list = document.getElementById("slider-list");
	var indicator = document.getElementById("indicator");
	
	for (let i=0; i<sliders.length; i++) {
		var div = document.createElement("div");
		div.classList.add('mui-slider-item');
		div.setAttribute('data-id',sliders[i].id);
		div.setAttribute('data-book-id',sliders[i].book_id);
		div.setAttribute('data-index',i);
		
		var a = document.createElement("a");
		a.href = "javascript:void(0);";
		
		var img = document.createElement("img");
		img.src = sliders[i].img;
		
		a.appendChild(img);
		div.appendChild(a);
		
		slider_list.appendChild(div);
		
		var div_indicator = document.createElement("div");
		div_indicator.classList.add('mui-indicator');
		
		//如果轮播大于2个就默认第二个
		if(i==0){
			div_indicator.classList.add('mui-active');
		}
		
		indicator.appendChild(div_indicator);
	}
	
	//第一个轮播是最后一张
	var len = sliders.length-1;
	var first_div = document.createElement("div");
	first_div.classList.add('mui-slider-item');
	first_div.classList.add('mui-slider-item-duplicate');
	first_div.setAttribute('data-id',sliders[len].id);
	first_div.setAttribute('data-book-id',sliders[len].book_id);
	first_div.setAttribute('data-index',len);
	
	var a = document.createElement("a");
	a.href = "javascript:void(0);";
	
	var img = document.createElement("img")
	img.src = sliders[len].img;
	
	a.appendChild(img);
	first_div.appendChild(a);
	
	var first = slider_list.firstChild;
	slider_list.insertBefore(first_div,first);

	//最后一个轮播是第一张
	var last_div = document.createElement("div");
	last_div.classList.add('mui-slider-item');
	last_div.classList.add('mui-slider-item-duplicate');
	last_div.setAttribute('data-id',sliders[0].id);
	last_div.setAttribute('data-book-id',sliders[0].book_id);
	last_div.setAttribute('data-index',0);
	
	var a = document.createElement("a");
	a.href = "javascript:void(0);";
	
	var img = document.createElement("img")
	img.src = sliders[0].img;
	
	a.appendChild(img);
	last_div.appendChild(a);
	
	slider_list.appendChild(last_div);
	
	//开始轮播
	var slider = mui("#slider");
	slider.slider({
		interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
	});

	//榜单列表数据
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
		
		var p2 = document.createElement("p");
		p2.classList.add('mui-ellipsis');
		p2.innerText = '简介：'+res[i].desc;
		
		div.appendChild(span);
		div.appendChild(p);
		div.appendChild(p2);
		
		a.appendChild(img);
		a.appendChild(div);
		
		li.appendChild(a);
		
		ul.appendChild(li);
	}
	
	
	//5+事件
	mui.plusReady(function(){
		
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
		
		//轮播点击
		mui('#slider-list').on('tap','div',function(){
			var book_id = this.getAttribute('data-book-id');
			//根据ID发异步
			//.....
			var data = {id:1,name:'太初',image:'images/images/taichu.jpg',types:['玄幻','修仙'],is_end:0,author:'高楼大厦',desc:'一树生的万朵花，天下道门是一家。法术千般变化，人心却亘古不变',new_list:'866',new_list_name:'去化心魔真仙轮【四更】'};
			mui.openWindow({
				url:'book_info.html',
				id:'book_info',
				extras:{data:data},
			    show:{autoShow:false}
			});
		})
		
		//分类
		document.getElementById("category").addEventListener('tap',function(){
			mui.openWindow({
				url:'category.html',
				id:'category',
				show:{autoShow:false}
			});
		});
		
		//排行
		document.getElementById("ranking").addEventListener('tap',function(){
			mui.openWindow({
				url:'book_list.html',
				id:'book_list',
				extras:{type:'ranking',title:'排行'},
				show:{autoShow:false}
			});
		});
		
		//完本
		document.getElementById("end").addEventListener('tap',function(){
			mui.openWindow({
				url:'book_list.html',
				id:'book_list',
				extras:{type:'end',title:'完本'},
				show:{autoShow:false}
			});
		});
		
		//大神
		document.getElementById("master").addEventListener('tap',function(){
			mui.openWindow({
				url:'book_list.html',
				id:'book_list',
				extras:{type:'master',title:'大神作品'},
				show:{autoShow:false}
			});
		});
	})
}
