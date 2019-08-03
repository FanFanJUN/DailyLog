# AntDesign走过的坑

### ==AntD对request.js的封装==

```
原生：
if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
      // 这里可以对请求体封装
      newOptions.body = {
        RequestHeader: {...RequestHeader},
        RequestBody: {
            ...newOptions.body
        }
      };
      newOptions.body = JSON.stringify(newOptions.body);
      //封装
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
 原生request并未对GET请求封装，封装如下
 let urlStr = url;
 if (newOptions.method === 'GET') {
     urlStr = `${url}?`;
     Object.keys(newOptions.body).forEach(key=>{
         const str = (newOptions.body)[key];
         urlStr += `${key}=${str}&`;
     });
     urlStr = urlStr.substr(0,urlStr.length - 1);
     delete newOptions.body;
 }
```
#### ==对AntD model的封装==

```
==page==

在componentDidMount中请求
class test extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
    routeid: createRouteid(),
    };
}
    componentDidMount() {
        const {dispatch} = this.props;
        const {routeid} = this.state;
        dispatch({
          type: 'rule/create',
          routeid,
        });
        dispatch({
          type: 'rule/fetch',
          routeid,
          payload: {},
        }).then(()=>{
            
        });
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
          type: 'rule/clear',
        });
    }
    render() {
        return(
        'test';
        );
    }
}
function mapStateToProps(state) {
    return {
        data : state.rule,
        loading: state.loading.effects[rule/fetch], //监听model里对应的方法
    }
}
export defalt connect(mapStateToProps)(test);

==model==
import { getTableData } from '@/services/api';
import { isRespSucc, showErrorMsg } from '@/utils/utils';

// c测试封装model对数据的获取
const initState = {
  dataSource: [],
};
export default {
  namespace: 'table',

  state: { },

  effects: {
    *create({ routeid }, { put }) {
      yield put({
        type: 'createState',
        routeid,
      });
    },
    *clear({ routeid }, { put }) {
      yield put({
        type: 'clearState',
        routeid,
      });
    },
    *getTableData({ routeid, payload }, { call, put }) {
      // 请求service
      const response = yield call(getTableData, payload);
      if (!isRespSucc(response)) {
        showErrorMsg(response);
        return;
      }
      const { ResponseBody: { dataSource, pagination } } = response;
      yield put({
        type: 'saveState',
        routeid,
        payload: {
          dataSource, // 返回页面的数据
          pagination,
        },
      });
    },
  },

  reducers: {
    createState(_, { routeid }) {
      const newState = {};
      newState[routeid] =
       JSON.prase(JSON.stringify(initState));
      return newState;
    },
    saveState(state, { routeid, payload }) {
      const newState = { ...state };
      newState[routeid] =
       { ...state[routeid], ...payload };
      return newState;
    },
    clearState() {
      return {};
    },
  },
};


```
#### Ant Design Pro内存溢出（out of memory）
[increase-memory-limit](https://www.npmjs.com/package/increase-memory-limit)
```
node_modules/.bin 下umi.cmd 和webpack.cmd加上

node -max-old-space-size=4096
或者修改node内存

npm install increase-memory-limit
npm run fix-memory-limit
// ...
  "scripts": {
    "fix-memory-limit": "cross-env LIMIT=2048 increase-memory-limit"
  },
  "devDependencies": {
    "increase-memory-limit": "^1.0.3",
    "cross-env": "^5.0.5"
  }
// ...

```
#### ==Ant Design table组件分页pagination==

```
<Table
pagination={{
    total: pagination.total,
    pageSize:pagination.pageNum,
    current: pagination.current,
    showTotal:showPaginationMessage.bind(null,pagination.pageSize),
    showQuickJumper: true,
}}

function showPaginationMessage(pageSize=10,pageNum,pageRange) {
    if(!pageRange) {
        return '分页函数调用错误';
    }
    const totalPage = Math.ceil(pageNum/pageSize);
    const currPage = Math.ceil(pageRange[0]/pageSize);
    return `总共${pageNum}条记录`,第${currPage}/${totalPage}页;
    // 对原生AntD Pro分页信息位置处理
    return <div style={{position:'absolute',left:'6px',display:'inline-block'}}>总共{pageNum}条记录,第{currPage}/{totalPage}页</div>
           
}

```
#### Ant Design Table组件defaultExpandAllRows={true} 不起作用
defaultExpandAllRows 
就是像defaultValue那样 只在第一次渲染的时候起作用
而很多时候我们的数据初始是空的
```
 {dataSource && dataSource.length 
    ? <Table columns={columns} dataSource={dataSource} defaultExpandAllRows={true} indentSize={0}/> 
    : '暂无数据' }
//保证有数据的时候再渲染table
// 或者设置一个flag: false,数据返回时置为true
{flag ? 
<Table columns={columns} dataSource={dataSource} defaultExpandAllRows={true} 
indentSize={0}/> 
    : null }
// 第一种方式会有Table没有表头的情况
```

#### Ant Design modal的destroyOnClose属性-关闭时销毁 Modal 里的子元素
#### Ant Design modal的afterClose属性-modal完全关闭后回调

```
##modal里的table多选selectRowkeys可关闭后回调删除已选状态
```

#### 获取文字省略提示

```
/**
*mes:显示titel
*length: 显示长度
**/
export funcion getEllipsis(mes, length) {
    if(!mes) return;
    let lengthTmp = length;
    if(lengthTmp) {
        if(lengthTmp > 7) {
            lengthTmp = 7;
        }
        if(mes.length <= lengthTmp) {
            return mes;
        }
        return (
         <Ellipsis tooltip length={lem=lengthTmp}
           {`${mes}`}
         </Ellipsis>
        );
    }
    return (
    <div style={{width:'100%'}}>
        <Ellipsis tooltip line={1} fullWidthRecognition>
               {mes}
         </Ellipsis>    
     </div>
    );
}
```
#### package文件解析

[为AntD pro配置多个环境](https://umijs.org/zh/guide/env-variables.html)
```
$ npm init // 初始化
{
  "author": "",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npm run start:loc",
    "start:loc": "cross-env UMI_ENV=loc APP_TYPE=site PORT=9999 umi dev",
    "start:sit": "cross-env UMI_ENV=sit APP_TYPE=site PORT=8888 umi dev",
    "start:dev": "cross-env UMI_ENV=dev APP_TYPE=site PORT=7777 umi dev",

    "build": "npm run build:loc",
    "build:loc": "cross-env UMI_ENV=loc COMPRESS=none umi build",
    "build:sit": "cross-env UMI_ENV=sit COMPRESS=none umi build",
    "build:dev": "cross-env UMI_ENV=dev COMPRESS=none umi build"
    // COMPRESS默认压缩 CSS 和 JS，值为 none 时不压缩，build 时有效
  },
  "license": "ISC",
  "main": "index.js",
  "name": "test",
  "description": "ceshi"
}
所有node_modules/.bin/目录下的命令，都可以用npm run[命令]的格式运行。
在命令行下，键入npm run，然后按tab键，就会显示所有可以使用的命令。
```
#### 一个页面多个form会相互影响

```
form.create()(组件)
此方法包住的组件会产生form属性，详见form分离
# form表单分开在两个两面，这样互不干扰、
# 在一个页面一个form使用函数组件方式，另一个使用类组件方式
```
#### form表单中设置initialValue注意

```
子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用
=== 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量))	
```
#### React context高阶运用(父子孙组件传值)

```
React的context就是一个全局变量，可以从根组件跨级别在React的组件中传递
在顶层的Provider中传入value，
在子孙级的Consumer中获取该值，并且能够传递函数，用来修改context

//创建Context组件
import React from 'react';
const ThemeContext = React.createContext();
export ThemeContext;
// 顶层Provider
import ThemeContext from '';
getContext() {
    return{
        color: 'Red',
        theme: 'dark',
    }
}
render() {
    return (
      <ThemeContext.Provider 
      value={this.getContext()}>  // getContext方法返回的对象
      {this.props.children}
      </ThemeContext.Provider>
    );
  }
//底层
import ThemeContext from '';
class Test extends React.Component{
    xxx;
    const color =this.props.color;
    const theme = this.props.theme;
}
const conText=(props) => {
    <ThemeContext.Consumer>
      {(value) => (
        <Test
          color={value.color} //调用回调
          theme={value.theme}}>
          {...props}
        </Test>
      )}
</ThemeContext.Consumer>
}
export defalt conText;
```
#### AntD Tabs标签页如何切换标签时立即更新标签内content内容(而不是带有缓存内容不改变)

```
加判断
<Tabs defaultActiveKey="1" onChange={callback}>
    {key === '1'?<TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>: <div/>}
    {key === '2'?<TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane: <div/>>
    {key === '3'?<TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>: <div/>
  </Tabs>
这样存在于content的组件能及时更新  
```
####  函数式异步请求（request等）返回的Promise对象怎样获取其中的值

```
js Promise中获取[[PromiseValue]]
[[PromiseValue]]是个内部变量，外部无法得到，只能在then中获取
* get().then((result)=>{
    // 通常保存到state里
    this.setState({});
})
```
