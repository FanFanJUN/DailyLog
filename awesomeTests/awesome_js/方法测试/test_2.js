/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-08 14:55:15
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-08 15:01:18
 * @Description  : 使用闭包实现每隔一秒打印 1,2,3,4
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/方法测试/test-2.js
 */


for (var index = 1; index < 5; index++) {
    (function (m) {
        setTimeout(() => {
            console.log(m);
        }, m * 1000);
    })(index)
}
// 或者使用 let
for (let index = 1; index < 5; index++) {
    setTimeout(() => {
        console.log(index);
    }, index * 1000);
}