---
title: ES6实用性技能
date: 2018-10-16 22:00:26
tags:
- ES6
categories: 
- web前端
---

# ES6实用性技能

#### 函数

js（es5）定义函数三种形式：

```
//语句形式定义函数              
function test1(){ 
        alert("hello function1");
    }
//直接量形式定义函数
var test2=function(){
        alert("hello function2")；
    }
//直接量形式定义函数
var test3=new Function("a","b","return a+b");
//调用函数
test1();//输出hello function1
test2();//输出hello function2
alert(test3(1,2));//输出3
```
es6箭头函数

- 不需要 function 关键字来创建函数
- 省略 return 关键字
- 继承当前上下文的 this 关键字

```
//例如：
    [1,2,3].map(x => x + 1)
//等同于：
    [1,2,3].map((function(x){
        return x + 1
    }).bind(this))
```
# AntD Pro实用性技巧

#### 条件判断加载组件

```
{this.state.xxx ? <Form.Item></Form.Item> ：null}
{this.state.xxxx && <Form.Item>}
```


```
{selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
```


#### form表单下拉选中默认值

```
<FormItem label="证件类型">
              {getFieldDecorator('status',{
                initialValue:"0",
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="0">二代身份证</Option>
                  <Option value="1">港澳通行证</Option>
                  <Option value="2">护照</Option>
                  <Option value="3">居住证</Option>
                </Select>)}
</FormItem>
```

#### 使用ES6的Object.keys()方法判断对象是否为空对象

```
const data = {};
const arr = Object.keys(data);
alert(arr.length === 0);//true
```
#### 对象的扩展（属性名表达式）


```
// 方法一
obj.foo = true;

// 方法二
obj['a'+'bc'] = 123;
```
上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。
但是，如果使用字面量方式定义对象（使用大括号），在ES5中只能使用方法一（标识符）定义属性。



```
var obj = {
  foo: true,
  abc: 123
};
```

ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。



```
let propKey = 'foo';

let obj = {
   [propKey]: true,
   ['a'+'bc']: 123
};
```

下面是另一个例子。

```
var lastWord = "last word";

var a = {
    "first word": "hello",
    [lastWord]: "world"
};

a["first word"] // "hello"
a[lastWord] // "world"
a["last word"] // "world"
```

表达式还可以用于定义方法名。


```
let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};

console.log(obj.hello()); // hi
```
