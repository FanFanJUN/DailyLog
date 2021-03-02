/* 
执行 10000 次  console.log(2);  不是说还要等待  5000ms 再执行console.log(3);


多个宏任务 优先执行时间短的

先执行
setTimeout(() => {
    console.log(3);
}, 5000);

后执行：
setTimeout(() => {
    console.log(4);  
}, 20000);

主任务时间过长时  虽然宏任务有等待时间 但是当前宏任务时间小于 主任务执行时
主任务完成后  立即执行该宏任务


for (let index = 0; index < 10; index++) {
    console.log(2);
}
执行完后立即执行
setTimeout(() => {
    console.log(3);
}, 5000);
*/
console.log(1);

setTimeout(() => {
    console.log(3);
}, 5000);

setTimeout(() => {
    console.log(4);  
}, 20000);

for (let index = 0; index < 10; index++) {
    console.log(2);
}