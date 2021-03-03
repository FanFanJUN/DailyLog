/* 

 */
function a(params) {
    let n = 1;
   return function b(params) {
       let h = 1;
       function c(params) {
           console.log(++h);
       }
       c();
    }
}
let m = a();
m();
m();

