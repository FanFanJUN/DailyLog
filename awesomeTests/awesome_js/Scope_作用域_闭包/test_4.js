/* 
延长函数环境生命周期
 */
function a(params) {
    let n = 1;
   return function b(params) {
       let h = 1;
       return function c(params) {
           console.log(++h);
       }
    }
}
let m = a()();
m();
m();

