# STUDY-DAY-BY-DAY
记录开发所遇到的点点滴滴
### [开发小技巧](https://github.com/FanFanJUN/STUDY-DAY-BY-DAY/blob/master/%E7%BB%8F%E9%AA%8C%E4%B9%8B%E8%B0%88.md)
#### [AntDesign走过的坑](https://github.com/FanFanJUN/STUDY-DAY-BY-DAY/blob/master/react/AntDesign%E8%B5%B0%E8%BF%87%E7%9A%84%E5%9D%91.md)
#### [js工具方法封装](https://github.com/FanFanJUN/STUDY-DAY-BY-DAY/blob/master/react/ES6%E5%B7%A5%E5%85%B7%E6%96%B9%E6%B3%95.md)
#### [文件上传下载](https://github.com/FanFanJUN/STUDY-DAY-BY-DAY/blob/master/react/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD.md)
### 目录
<!-- TOC -->
| 序号. | 问题 |
| --- | --------- | 
|1 | [AntDesign走过的坑](#AntDesign走过的坑) |
1. ### AntDesign走过的坑
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
import { fetch } from '@/services/api';
const initState = {
   dataSource: [], 
};
export default {
  namespace: 'rule',

  state: { },

  effects: {
    *create({routeid},{put}){
      yiled put({
          type: 'createState',
          routeid,
      })  
    },
    *clear(_,{put}){
      yiled put({
          type: 'clearState',
          routeid,
      })  
    },
    *fetch({ routeid,payload }, { call, put }) {
     // 请求service
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'saveState',
        payload: {
            ...response,// 返回页面的数据
        },
      });
    },
  },

  reducers: {
    createState(_, {routeid}) {
      const newSate = {};
      newState[routeid] = 
      JSON.prase(JSON.stringify(initState));
      return newSate;
    },
    saveState(state, {routeid,payload}) {
      const newSate = {...state};
      newState[routeid] = 
      {...state[routeid],...payload};
      return newSate;
    },
    clearState(){
        return {};
    }
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

```

#### Ant Design table组件modal的destroyOnClose属性-关闭时销毁 Modal 里的子元素

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
**[⬆ 返回顶部](#目录)**
