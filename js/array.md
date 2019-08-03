# js对数组的操作

#### 

#### [JavaScript indexOf()方法](http://www.w3school.com.cn/jsref/jsref_indexOf.asp)

```
stringObject.indexOf(searchvalue,fromindex)

注释：indexOf() 方法对大小写敏感！

注释：如果要检索的字符串值没有出现，则该方法返回 -1。
```
#### [JavaScript slice()截取字符串方法](http://www.w3school.com.cn/js/jsref_slice_array.asp)

```
ArrayObject.slice(start,end)
```
#### Array.join()

```
join()方法将数组中的所有元素转换成字符串，然后连接起来
join()默认是使用“,”作为分隔符，也可以在方法中指定分隔符
const arr =  ['aaa', 'bbb', 'ccc'];
const str = arr.join(',') // 'aaa,bbb,ccc'
```
#### Array.split()

```
const str = 'aaa,bbb,ccc';
const arr = str.split(',') // ['aaa', 'bbb', 'ccc']
```

#### Array.pop()

```
pop()方法用于删除并返回数组的最后一个元素
const arr = [1,2,3];
const arrpop = arr.pop() // 3
console.log(arr); //[1,2]
```
#### Array.shift()

```
pop()方法用于删除并返回数组的第一个元素
const arr = [1,2,3];
const arrpop = arr.shift() // 1
console.log(arr); //[2,3]
```
