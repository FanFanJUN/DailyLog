/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-08 16:05:44
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-08 16:20:02
 * @Description  : TODO
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/方法测试/test_4.js
 */
function a(params) {
    let n = 1;
    return function b(params) {
        console.log(++n);
    }
}
// return 函数出去 被引用  没有被return等于说我还是在自己的空间，里面的东西调用就执行
// 返回一个函数  函数是引用类型 
// 声明新的变量 就开辟了新的内存地址
let c = a();  // 赋值  开辟内存空间  栈存的 地址引用
let d = a(); // 再次开辟新的空间   存的地址
console.log(c === d); // false