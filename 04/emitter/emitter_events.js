

// 以下系列方法模拟了大并发情况下，因为异步编程同时发sql给数据库导致数据库崩溃的问题
//这个最终的结果是执行了100次，说明在同一时间内，把100条sql同时发给了数据库
var asyncCount = function (){

    var count = 0;
    var select = function(callback){
        count ++;
        console.log('send sql:%s',count);
        setTimeout(function(){
            callback('RESULT'); 
        },1000*Math.random());
    };

    var ciclyCount = 0;
    while(ciclyCount<100){
        console.log('ciclyCount is %s',ciclyCount);
        ciclyCount ++;
        select(function(num){
            console.log('query is :%s',num);
        });
    }

};



// 给每次调用查询加个锁，保证每次只发出一条sql，但是这里的结果却也只返回了一个result,因为有100次请求（这100次不一定是同一个人，所以必须要有回应），只返回一次，是不对的
var resolve1 = function(){
    
    var status ='ready';

    var count = 0;
    var select = function(callback){
        if(status === 'ready'){
            count ++;
            status = 'pending';
            console.log('send sql:%s',count);
            setTimeout(function(){
            
            callback('RESULT');    
        },1000*Math.random());    
        }
        
    };

    var ciclyCount = 0;
    while(ciclyCount<100){
        console.log('ciclyCount is %s',ciclyCount);
        ciclyCount ++;
        select(function(sql){
            status = 'ready';
            console.log('query is :%s',sql);
        });
    }

};


//引入事件队列，对异步进行处理，保证同样的100条请求sql只发出一条，但返回的是100条返回值

var EventEmitter = require('events').EventEmitter;
// var EventEmitter = require('events');
var util = require('util');

var MyEmitter = function (){
 //把EventEmitter的方法和属性绑定到MyEmitter对象上
 return EventEmitter.call(this);
};
//extend events 
util.inherits(MyEmitter,EventEmitter);


var myEmitter = new MyEmitter();

var resolve2 = function(){
    
    var status ='ready';

    var count = 0;
    var select = function(callback){
        //保证事件只执行一次，将回调事件加入到事件队列中
        myEmitter.once("selected",callback);
        //此外将最大监听值限制去除，为了是不被nodejs执行时警告
        myEmitter.setMaxListeners(0);

        if(status === 'ready'){
            count ++;
            status = 'pending';
            console.log('send sql:%s',count);
            setTimeout(function(){
               //触发返回的回调执行，将 result返回，因为之前添加了100次事件，则会执行100次     
               myEmitter.emit("selected",'RESULT');
               status = 'ready';
        },1000*Math.random());    
        }
        
    };

    var ciclyCount = 0;
    while(ciclyCount<100){
        console.log('ciclyCount is %s',ciclyCount);
        ciclyCount ++;
        select(function(num){
            console.log('query  :%s',num);
        });
    }

};


// asyncCount();
resolve1();
// resolve2();

