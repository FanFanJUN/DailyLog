/* Promise.allSettled  对比 Promise.all 
Promise.allSettled 的优势
我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态（fulfilled 或者 rejected）与结果（业务 value 或者 拒因 reason），
在 then 里面通过 filter 来过滤出想要的业务逻辑结果，
这就能最大限度的保障业务当前状态的可访问性，而 Promise.allSettled 就是解决这问题的。
*/
const a = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      })
    });
  }
  const b = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      })
    });
  }
  const c = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(3);
      })
    });
  }
  // a().then((res) => {
  // console.log(res);
  // })
  // Promise.all([a(), b(), c()]).then((res) => {
  //   console.log(res);
  // })
  Promise.allSettled([a(), b(), c()]).then((res) => {
    console.log(res);
  })