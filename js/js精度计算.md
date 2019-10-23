#### [JS中如何便捷地修复精度误差？](https://juejin.im/post/5dac0ebbe51d45252777a0df?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
### Why

```js
0.1 + 0.2 = 0.30000000000000004
1.0 - 0.9 = 0.09999999999999998
0.105.toFixed(2) = 0.1 // not 0.11
```

### Install

```
npm install fix-precision --save
```

### Methods

```js
const FP = require('fix-precision');
FP(num)         // fix precision for a result
FP.add(num1, num2)   // addition, num + num2
FP.sub(num1, num2)  // subtraction, num1 - num2
FP.mul(num1, num2)  // multiplication, num1 * num2
FP.div(num1, num2) // division, num1 / num2
FP.sum(num1, num2, num3, ...)  // sum, num + num2 + num3 ...
```

### Usage

```js
import NP from 'number-precision'
FP(0.09999999999999998); // = 0.1
FP.add(0.1, 0.2);             // = 0.3, not 0.30000000000000004
FP.add(2.3, 2.4);             // = 4.7, not 4.699999999999999
FP.sub(1.0, 0.9);            // = 0.1, not 0.09999999999999998
FP.mul(3, 0.3);              // = 0.9, not 0.8999999999999999
FP.mul(0.362, 100);          // = 36.2, not 36.199999999999996
FP.div(1.21, 1.1);          // = 1.1, not 1.0999999999999999
```