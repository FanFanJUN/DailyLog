# [Javascript获取数组中最大和最小值](https://www.cnblogs.com/zhouyangla/p/8482010.html)
#### 1.排序法
```
首先我们给数组进行排序，可以按照从小到大的顺序来排，排序之后的数组中第一个和最后一个就是我们想要获取的最小值和最大值。

排序我们会用到数组的 sort 方法。

var arr = [12,56,25,5,82,51,22];

arr.sort(function (a, b) {
  return a-b;
}); // [5,12,22,25,51,56]

var min = arr[0];  // 5

var max = arr[arr.length - 1];  // 56
```
#### 2.假设法
```
假设当前数组中的第一个值是最大值，然后拿这个最大值和后面的项逐一比较，如果后面的某一个值比假设的值还大，说明假设错了，我们把假设的值进行替换。最后得到的结果就是我们想要的。

// 获取最大值：

var arr = [22,13,6,55,30];
var max = arr[0];

for(var i = 1; i < arr.length; i++) {
   var cur = arr[i];
   cur > max ? max = cur : null
}

console.log(max); // 55

// 获取最小值：

var arr = [22,13,6,55,30];
var min = arr[0];

for(var i = 1; i < arr.length; i++) {
  var cur = arr[i];
  cur < min ? min = cur : null
}
console.log(min)  // 6
```
#### 3. 使用 Math 中的 max/min 方法

```
可以使用apply来实现。apply传入的是一个数组。

var arr = [22,13,6,55,30];

var max = Math.max.apply(null, arr);
var min = Math.min.apply(null, arr);

console.log(max, min) // 55,6

```
#### 4. 使用ES6的扩展运算符

```
var arr = [22,13,6,55,30];
 
 console.log(arr.Math(...arr)); // 55
```
