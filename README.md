# 函数式编程

## 高阶函数

>> 可以使用函数作为参数或者返回值的函数


## 偏函数

>> 创建一个调用已经存在的属性和方法的函数，并生成另一个函数的用法

如：
	var isType = function(type){
		return function (obj){
		return toString.call(obj) == '[object' + type +']';
	};
	}


# nodejs实现异步的编码方式

* nodejs提供的异步函数,如:setTimeout(1000,callback);setinterval()
* setImmediate/process.nextTick 


**注意：
回调函数只是回调函数，是一种编程的写法，与异步没有直接关系，之所以它老是和异步编程一起出现，是因为所以的异步编程都会用回调函数去做异步处理**

# 异步编程带来的问题：

1. 异常处理，对异步方法无法捕捉，依然会导致进程结束
2. 函数嵌套过深，导致回调地狱
3. 无阻塞的同步编码方式，nodejs原生不支持，只能通过settimeout延迟执行的方式
4. 因为nodejs是单线程运行的，无法直接的利用多核多线程的CPU
5. 过多的异步编程导致业务代码分散，代码可读性变差



# 如何解决：

主要解决方案有三种：

* 事件发布/订阅模式
* Promise/Deferred模式
* 流程控制库


## 事件发布/订阅模式

利用events模块的EventEmitter类来处理异步异常处理、分散的业务逻辑、还可以使用事件队列。

主要工作方式就是，先注册一个处理的业务事件，比如'eat','eat'这个过程我们不用管，只管什么时候什么情况'eat'就行了，比如说，到中午12点要'eat', 饿了要'eat',发情时要'eat',悲伤时要'eat'。

我只要在这些地方触发一下发布就可以了。


具体代码:04/emitter

## Promise/Deferred模式




## EventProxy


EventProxy 仅仅是一个很轻量的工具，但是能够带来一种事件式编程的思维变化。有几个特点：

1. 利用事件机制解耦复杂业务逻辑
2. 移除被广为诟病的深度callback嵌套问题
3. 将串行等待变成并行等待，提升多异步协作场景下的执行效率
4. 友好的Error handling
5. 无平台依赖，适合前后端，能用于浏览器和Node.js
6. 兼容CMD，AMD以及CommonJS模块环境
