const a  = '【采购信息记录号-行号:】LSC0000152704-00040';
console.log(a.indexOf('】'));


const b = '】';
const subLenth = a.indexOf(b) + 1;
console.log(a.substring(subLenth, subLenth+13));
console.log(a.substring(0,subLenth));
console.log(a.substring(subLenth+13));


const code = 'IMC0007';
console.log(code.substring(0,3));