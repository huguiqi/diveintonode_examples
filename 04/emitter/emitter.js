
//这两种加载方式唯一不同就是，events是父类，EventEmitter是子类，暂时这么理解吧
// var EventEmitter = require('events').EventEmitter;
var EventEmitter = require('events');
var util = require('util');

var MyEmitter = function (){
	//把EventEmitter的方法和属性绑定到MyEmitter对象上
	return EventEmitter.call(this);
};
//extend events 
util.inherits(MyEmitter,EventEmitter);


var myEmitter = new MyEmitter();
// 订阅事件
 myEmitter.on("event1",function(message,callback){
    try{
    	console.log(message);	
    	callback('done now');
    }catch(e){
    	console.log('error is %s',e.message);	
    }
 });

//发布事件
 myEmitter.emit('event1',"I am message",function(msg){
 	console.log(msg);
 	//这是异步
 	// setTimeout(function () {
  //       throw new Error('async exception'); // 抛出一个异步异常
  //   }, 1000);
	
	//这也是异步
    process.nextTick(function () {
        throw new Error('async exception'); // 抛出一个异步异常
    });

    // 这是同步，同步可以被try catch
 	// throw new Error('async exception');
 });
