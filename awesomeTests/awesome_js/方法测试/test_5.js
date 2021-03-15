/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-08 16:16:12
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-08 16:21:46
 * @Description  : TODO
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/方法测试/test_5.js
 */

function a(params) {
    return function b(params) {
        let m = 1;
       function c(params) {
           console.log(++m);
       }
       c();
    }
}
let d = a()();
d();
d();