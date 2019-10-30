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
#### list转map

```
var list = [
{UUID: "001", LINE_NAME: "84路"},
{UUID: "002", LINE_NAME: "108路"},
{UUID: "003", LINE_NAME: "26路"}];

var map = {};

list.forEach((item,index)=>{
   map[list[index].UUID] = list[index].LINE_NAME; 
})

console.info(map["001"]); //此时得到的值则为“84路”;
```
#### [JavaScript Array includes() 方法](https://www.runoob.com/jsref/jsref-includes.html)

```
includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。


```

#### [JS将有父子关系的数组转换成树形结构数据](https://www.cnblogs.com/eyelly/p/translate_treedata_func.html)
###### 元数据
```
[{
    id: 1,
    name: '1',
}, {
    id: 2,
    name: '1-1',
    parentId: 1
}, {
    id: 3,
    name: '1-1-1',
    parentId: 2
}, {
    id: 4,
    name: '1-2',
    parentId: 1
}, {
    id: 5,
    name: '1-2-2',
    parentId: 4
}, {
    id: 6,
    name: '1-1-1-1',
    parentId: 3
}, {
    id: 7,
    name: '2',
}]
```
###### 方法处理
```
/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 */
function translateDataToTree(data) {
  //没有父节点的数据
  let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null)
 
  //有父节点的数据
  let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)
 
  //定义转换方法的具体实现
  let translator = (parents, children) => {
    //遍历父节点数据
    parents.forEach((parent) => {
      //遍历子节点数据
      children.forEach((current, index) => {
        //此时找到父节点对应的一个子节点
        if (current.parentId === parent.id) {
          //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
          let temp = JSON.parse(JSON.stringify(children))
          //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1)
          //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          translator([current], temp)
          //把找到子节点放入父节点的children属性中
          typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
        }
      }
      )
    }
    )
  }
 
  //调用转换方法
  translator(parents, children)
 
  //返回最终的结果
  return parents
}
```
###### 处理结果

```
[
  {
    "id": 1,
    "name": "1",
    "children": [
      {
        "id": 2,
        "name": "1-1",
        "parentId": 1,
        "children": [
          {
            "id": 3,
            "name": "1-1-1",
            "parentId": 2,
            "children": [
              {
                "id": 6,
                "name": "1-1-1-1",
                "parentId": 3
              }
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "1-2",
        "parentId": 1,
        "children": [
          {
            "id": 5,
            "name": "1-2-2",
            "parentId": 4
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "2"
  }
]
```
#### [JS数组的交集、并集、差集，数组去重，获取两个数组重复的元素，去除两个数组相同的元素](https://www.cnblogs.com/lwming/p/11717396.html)

```
        let arr1=[1,2,3,4,5,6]
        let arr2=[4,5,6,7,8,9]
        // 并集 数组去重 
        let RemoveSame=[...new Set([...arr1,...arr2])]
        console.log(RemoveSame) //[1, 2, 3, 4, 5, 6, 7, 8, 9]

        //数组交集，或得两个数组重复的元素
        let SamePart=arr1.filter(item=>arr2.includes(item))
        console.log(SamePart) //[4, 5, 6]

        //差集=并集-交集  去除两个数组相同的元素
        let Difference=RemoveSame.filter(item=>!SamePart.includes(item))
        console.log(Difference) //[1, 2, 3, 7, 8, 9]
```
#### [树形结构已知子节点找父节点](https://segmentfault.com/q/1010000013483988)
###### 元数据
```
      id: 1,
      label: '一级 2',
      children: [{
        id: 3,
        label: '二级 2-1',
        children: [{
          id: 4,
          label: '三级 3-1-1'
        }, {
          id: 5,
          label: '三级 3-1-2',
          disabled: true
        }]
      }, {
        id: 2,
        label: '二级 2-2',
        disabled: true,
        children: [{
          id: 6,
          label: '三级 3-2-1'
        }, {
          id: 7,
          label: '三级 3-2-2',
          disabled: true
        }]
      }]
    }],
```
处理方法
```
let find = (array, label) =>{
    let stack = [];
    let going = true;
    
    let walker = (array, label) => {
        array.forEach(item => {
            if (!going) return;
            stack.push(item['label']);
            if (item['label'] === label) {
                going = false;
            } else if (item['children']) {
                walker(item['children'], label);
            } else {
                stack.pop();
            }
        });
        if (going) stack.pop();
    }

    walker(array, label);

    return stack.join('-');
}

console.log(find(data, '三级 3-2-2'))
// 一级 2-二级 2-2-三级 3-2-2
```
#### 树形数据转化为数组

```
var list= [];
this.setGridDataFromTree(list, tree, "");

export function setGridDataFromTree(list,dataSource){
        if (!(Array.isArray(dataSource) && dataSource.length >0)) return ;            
        dataSource.forEach((father) => {
            // debugger;
            list.push(father);            
            if (father.children) {                
                setGridDataFromTree(list, father.children);
            }
        });
        // return;
    }
        })
        return list;
    }
```
#### [JavaScript splice() 方法](https://www.w3school.com.cn/jsref/jsref_splice.asp)

```
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

注释：该方法会改变原始数组。
```