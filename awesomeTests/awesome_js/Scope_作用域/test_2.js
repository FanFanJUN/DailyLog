/* 

 */
function a(params) {
    let n = 1;
   return function b(params) {
        console.log(++n);
    }
}
let m = a();
m(); // 2
m(); // 3
// 函数执行之后 创造一个新的空间
let h = a();
h();
h();


