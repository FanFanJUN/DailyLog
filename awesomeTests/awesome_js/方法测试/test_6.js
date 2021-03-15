/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-08 16:27:09
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-08 16:29:58
 * @Description  : TODO
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/方法测试/test_6.js
 */
function fun(a,b) {
    console.log(b)
    return {
        fun: function(c) {
            return fun(c,a);
        }
    };
}

var d = fun(0); 
// {
//     fun: function(c) {
//         return fun(c,0);
//     }
d.fun(1); d.fun(2);
d.fun(3);
// 

var d1 = fun(0).fun(1).fun(2).fun(3);
var d2 = fun(0).fun(1);
d2.fun(2);
d2.fun(3);