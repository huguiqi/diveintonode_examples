
/** 
* process.nextTick属于idle观察者，setImmediate属于check观察者
* 事件循环对观察者的检查先后顺序：idle>IO>check
* nextTick是保存在一个数组里的，而setImmediate是保存在链表里的，所以虽然进入了setImmediate的check观察者，它也不会立即执行第二个setImmediate，而是执行了第一个的setImmediate里的process.nextTick
* 
*/
setImmediate(function () {
  console.log('setImmediate延迟执行1');
  process.nextTick(function () {
    console.log('强势插入');
  });
});
setImmediate(function () {
  console.log('setImmediate延迟执行2');
});

process.nextTick(function () {
  console.log('nextTick延迟执行1');
	setImmediate(function () {
  console.log('setImmediate延迟执行2，这个要高于外面的setImmediate');
});  
});
process.nextTick(function () {
  console.log('nextTick延迟执行2');
});

console.log('正常执行');
