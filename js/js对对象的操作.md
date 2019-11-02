## js对对象的操作
### [javascript，检测对象中是否存在某个属性](https://www.cnblogs.com/kongxianghai/archive/2013/04/12/3015803.html)
- 使用in关键字。该方法可以判断对象的自有属性和继承来的属性是否存在。
```
var o={x:1};
"x" in o;            //true，自有属性存在
"y" in o;            //false
"toString" in o;     //true，是一个继承属性
```
- 使用对象的hasOwnProperty()方法。该方法只能判断自有属性是否存在，对于继承属性会返回false。

```
var o={x:1};
o.hasOwnProperty("x"); 
//true，自有属性中有x
o.hasOwnProperty("y");    　　 //false，自有属性中不存在y
o.hasOwnProperty("toString"); //false，这是一个继承属性，但不是自有属性
```
[禁止直接使用 Object.prototypes 的内置属性 (no-prototype-builtins)](https://cn.eslint.org/docs/rules/no-prototype-builtins)
```
o.hasOwnProperty("x"); 
// 这里这样使用Eslint报错
 do not access object.prototype method 'hasownproperty' from target object
Object.
更改为
Object.prototype.hasOwnProperty.call(foo, "bar");
```
- 用undefined判断
自有属性和继承属性均可判断。


```
var o={x:1};
o.x!==undefined;        //true
o.y!==undefined;        //false
o.toString!==undefined  //true
```

该方法存在一个问题，如果属性的值就是undefined的话，该方法不能返回想要的结果，如下。

```
var o={x:undefined};
o.x!==undefined;        //false，属性存在，但值是undefined
o.y!==undefined;        //false
o.toString!==undefined  //true
```
### Object.keys()

```
这个方法会返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。
```
### delete 操作符用于删除对象的某个属性

```
var Employee = {
  firstname: "John",
  lastname: "Doe"
}

console.log(Employee.firstname);
// expected output: "John"

delete Employee.firstname;

console.log(Employee.firstname);
// expected output: undefined

```


