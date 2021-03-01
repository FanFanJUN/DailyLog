/* 
在这个例子中，通过 forEach 遍历的将每一个数字都执行 multi 操作。
代码执行的结果是：1 秒后，一次性输出1，4，9。这个结果和我们的预期有些区别，
我们是希望每间隔 1 秒，然后依次输出 1，4，9；所以当前代码应该是并行执行了，而我们期望的应该是串行执行。
https://objcer.com/2017/10/12/async-await-with-forEach/
 */
var getNumbers = () => {
  return Promise.resolve([1, 2, 3]);
};
var multi = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num) {
        resolve(num * num);
      } else {
        reject(new Error("num not specified"));
      }
    }, 1000);
  });
};
async function test() {
  var nums = await getNumbers();
  nums.forEach(async (x) => {
    var res = await multi(x);
    console.log(res);
  });
}
test();
