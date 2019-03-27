# js工具方法封装


#### ==form表单删除空字符串==

```
function filterEmptyFileds(filedsValue){
    if(!filedsValue) {
        throw new Error('请传入表单数据！');
    } else {
        let serchObj = {};
        Object.keys(filedsValue).forEach(key => {
          if(key && filedsValue[key]) {
              serchObj[key] = filedsValue[key];
          }  
        });
        return serchObj;
    }
}
```
#### ==form表单转换对象元素数组为字符串==

```
function arrayFiledsToString(filedsValue){
    if(!filedsValue) {
        return;
    } 
        let serchObj = {};
        Object.keys(filedsValue).forEach(key => {
          if(key && filedsValue[key]&& isArray(filedsValue[key]) {
              serchObj[key] = filedsValue[key].join(',')
          }  
        });
        return { ...filedsValue, serchObj };
}
isArray方法见如何判断元素是否为数组......
function isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'；
}
```
#### ==js判空函数==

```
function checkNull(value){
    if(!value || value == null || typeof value === 'undefined') || value === ''{
        return true;
    }
    return false;
}

function isEmptyObject(object){
    if(checkNull(object)){
        return true;
    }
    if(Object.prototype.toString.call(object) ===
    '[Object Object]'&& Object.keys(object).length=== 0){
        return true;
    }
    return false;
}

function isEmptyArray(array) {
    if(checkNull(array)) {
        return true;
    }
    if(Object.prototype.toString.call(array) === 
     '[Object Array]' && array.length === 0) {
         return true;
    }
    return false;
    }
```
#### ==树形结构数据删除空的子级节点==


```
数据
const nodeData = [
    {id: 1, label: '1-1', children: 
        [
            {id: 2, label: '1-2'， children: []},
            {id: 3, label: '1-3'， children: []},
        ]
    },
    {id: 4, label: '2-1', children: []},
];
函数
 getSelectedNode(nodeData) {
  nodeData.forEach(item => {
    const node = item;
    if ('children' in item && item.children.length === 0) {
      delete item.children
    } else if ('children' in item && item.children.length) {
      getSelectedNode(item.children);
    }
  });
  return nodeData;
}
const newnodeData = this.getSelectedNode(data);
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
}

```
#### ==百分数与小数互相转换==

```
        //1.先去掉百分号
        //2.再除以100
        //3.返回出去
        
     function toPoint(percent){
            let str=percent.replace("%","");
            str= str/100;
            return str;
        }
        //小数转化为分数
        //1.先转化为number类型
        //2.再乘以100
        //3.保留小数位
    function toPercent(point){
            let percent = Number(point*100).toFixed(2);
            percent+="%";
            return percent;
        }
```
#### ==金钱格式化三位分==

```
 function toThousands(value) {
    const formatMoney = 
    `$(value)`.replace(/\B(?=(\d{3})+(?!\d))/g,',');
    return formatMoney;
}
```
#### ==随机生成16位==

```
function createRouteid() {
    return guid();
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g, c =>{
        const r = (Math.random()*16) | 0;
        const v = c=== 'x' ?r: (r& 0x3) |0x8;
        return v.toString(16);
    });
}
```
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
        loading: state.loading.effects[rule/fetch],
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
