const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});

promise.then((res) => {
    console.log('then:', res);
}).catch((err) => {
    console.log('catch:', err);
})

// 'then' 'success1

/* resolve 函数将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject 函数将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

而一旦状态改变，就不会再变。
所以 代码中的reject('error'); 不会有作用。

Promise 只能 resolve 一次，剩下的调用都会被忽略。
所以 第二次的 resolve('success2'); 也不会有作用。 */