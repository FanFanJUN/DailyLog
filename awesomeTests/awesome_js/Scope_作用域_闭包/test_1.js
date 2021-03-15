/* 使用一次函数   创建一个新的空间
一直在用  一直存在
 */
function a(params) {
    let n = 1;
    function b(params) {
        n = n+1;
        console.log(n);
    }
    b();
}
a(); // 2
a(); // 2
