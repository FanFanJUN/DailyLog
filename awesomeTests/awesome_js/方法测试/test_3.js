/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-08 15:20:41
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-08 15:32:46
 * @Description  : TODO
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/方法测试/test_3.js
 */
function createFunctions(){
    var result = new Array();

    for(var i=0; i < 10; i++){
        result[i] = function(){
            console.log(i);
        }
    }
     return result;
}

var result = createFunctions();

result[0](); // 9 
result[1](); // 9 
result[2](); // 9 
result[3](); // 9 
result[4](); // 9 
result[5](); // 9


// 解决方法
function createFunctions(){
    var result = new Array();

    for(var i=0; i < 10; i++){
        result[i] = (function(num){
            return function(){
                console.log(num);
            }
        })(i);
    }
     return result;
}

var result = createFunctions();

result[0](); // 0 
result[1](); // 1 
result[2](); // 2 
result[3](); // 3 
result[4](); // 4 
result[5](); // 5