for (var index = 0; index < 3; index++) {
    console.log(index); // 0 1 2 
    
}
console.log('final');
console.log(index); // 3

/* setTimeout结果 */

for (var index = 0; index < 3; index++) {
    setTimeout(() => {
        console.log(index); //3 3 3
    }, 2000); 
    
}
// setTimeout + 函数自调用  模拟var的伪块作用域
for (var index = 0; index < 3; index++) {
    (function (a) {
        setTimeout(() => {
            console.log(a); //1 2 3 
        }, 2000); 
    })(index)
}