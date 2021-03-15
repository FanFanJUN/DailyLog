/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-10 09:49:29
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-10 09:50:37
 * @Description  : //使用自执行函数写法
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/Scope_作用域_闭包/test_5.js
 */
 //定义一个闭包 //使用自执行函数写法
 let secretFn=(function (){
    //变量secrent只有secretFn内的getSecret, setSecret 才可以访问，外部无法访问
    let secrent='100';
    let getSecret=function (){
        return secrent;
    }
    let setSecret=function (newSecrent) {
        secrent=newSecrent;
    }
    return {
        getSecret,
        setSecret
    }
})()


console.log(secretFn.getSecret());
secretFn.setSecret(200);
console.log(secretFn.getSecret());
console.log(secretFn.secrent);   //Type error 无法访问