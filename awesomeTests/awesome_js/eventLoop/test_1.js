// js的微任务和宏任务
// https://www.cnblogs.com/mmykdbc/p/10401759.html

/*
1、 宏任务需要多次事件循环才能执行完，微任务是一次性执行完的；

2.宏任务macrotask：

（事件队列中的每一个事件都是一个macrotask）

优先级：主代码块 > setImmediate > MessageChannel > setTimeout / setInterval

比如：setImmediate指定的回调函数，总是排在setTimeout前面
3.微任务包括：

优先级：process.nextTick > Promise > MutationObserver */


setTimeout(() => {
    //执行后 回调一个宏事件
    console.log('内层宏事件3')
}, 0)
console.log('外层宏事件1');

new Promise((resolve) => {
  console.log("外层宏事件2");
  resolve();
})
  .then(() => {
    console.log("微事件1");
  })
  .then(() => {
    console.log("微事件2");
  });