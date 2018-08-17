function isEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}

//本地缓存封装方法
var getStorage = function (name) {
    return JSON.parse(localStorage.getItem(name));
}

var setStorage = function (name, val) {
	if(typeof val == 'object')
		localStorage.setItem(name, JSON.stringify(val));
	else
        localStorage.setItem(name, val);
}
//仅支持对象，数组就别存storage了
var appendStorage = function (name, addVal) {
    let oldVal = getStorage(name);
    let newVal =  Object.assign(oldVal, addVal);
    setStorage(name, newVal);
}

var hasStorage = function (name) {
    let oldVal = getStorage(name);
    return oldVal ? true : false;
}
var clearStorage = function(){
	localStorage.clear();
}
var delStorage = function(name){
	localStorage.removeItem(name);
}

//选择排序章节目录
function selectionSort(arr,flag) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
        	if(!flag){
        		if (arr[j].num > arr[minIndex].num) { 
	                minIndex = j;
	            }
        	}else{
        		if (arr[j].num < arr[minIndex].num) { 
	                minIndex = j;
	            }
        	}
            
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
