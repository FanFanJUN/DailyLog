/*
 * @Author       : LiCai
 * @connect      : 1981824361@qq.com
 * @Date         : 2021-03-10 09:50:46
 * @LastEditors  : LiCai
 * @LastEditTime : 2021-03-10 09:50:56
 * @Description  : TODO
 * @FilePath     : /basic-web/Users/licai/Github/STUDY-DAY-BY-DAY/awesomeTests/awesome_js/Scope_作用域_闭包/test_6.js
 */
//使用new写法
    //定义一个闭包
    let SecretFn=function (){
        //变量secrent只有secretFn内的getSecret, setSecret 才可以访问，外部无法访问
        let secrent='100';
        this.getSecret=function (){
            return secrent;
        }
        this.setSecret=function (newSecrent) {
            secrent=newSecrent;
        }
    }

    const secretOne=new SecretFn();
    console.log(secretOne.getSecret());
    secretOne.setSecret(200);
    console.log(secretOne.getSecret());