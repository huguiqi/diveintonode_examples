
var render = function(results){
	console.log('callback done,results is %s',results.toString());
};


var after = function  (times,callback) {
	var results = {};
	var count = 0;
	return function(key,value){
		results[key] = value;
		count ++;
		if(times === count){
			callback(results);
		}
	};
};

var done = after(3,render);

done('key1','value1');
done('key2','value2');
done('key3','value3');



//上述方案可以解决一些多函数判断的问题，比如有些函数的参数过多，但一些参数是在前面的一段逻辑里有用到，其它的在后面的逻辑里有用到，但是它们又同属一个事件里的


//如果随着业务的发展，有很多事件需要绑定到这个上面，还可以结合订阅/发布流程

// 