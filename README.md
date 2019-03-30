# STUDY-DAY-BY-DAY
记录开发所遇到的点点滴滴
### 目录
<!-- TOC -->
| 序号. | 问题 |
| --- | --------- | 
|1 | [AntDesign走过的坑](#AntDesign走过的坑) |
|2 | [js工具方法封装](#js工具方法封装) |
|3 | [文件上传下载](#文件上传下载) |
|4 | [js对数组的操作](#js对数组的操作) |

1. ### AntDesign走过的坑
- AntD对request.js的封装
<!-- /TOC -->

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
- 对AntD model的封装

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
- Ant Design Pro内存溢出（out of memory）
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
- Ant Design table组件分页pagination

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
- Ant Design Table组件defaultExpandAllRows={true} 不起作用
defaultExpandAllRows 
就是像defaultValue那样 只在第一次渲染的时候起作用
而很多时候我们的数据初始是空的
```
 {dataSource && dataSource.length 
    ? <Table columns={columns} dataSource={dataSource} defaultExpandAllRows={true} indentSize={0}/> 
    : '暂无数据' }
//保证有数据的时候再渲染table

```

- Ant Design table组件modal的destroyOnClose属性-关闭时销毁 Modal 里的子元素

- 获取文字省略提示

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
- package文件解析

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

2. ### js工具方法封装
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

3. ### 文件上传下载
#### 下载服务器端文件,实现excel等文件的下载导出

```
<Button onClick={this.download}>下载</Button>
```
【GET请求接口】使用window.open

```
download = () => {
    window.open(`/react/get/downloadPdf?id=${this.props.id}&name=${this.props.name}`)
};
```
【POST请求接口】动态创建临时form表单

```
//隐藏的div Dom结构，用于存放临时form
//在隐藏的div里面创建临时表单，获取表单，提交表单，在div节点卸载临时表单。


<div id="downloadDiv" style={{ display: 'none' }} />
```

```
// 导出数据处理函数
download = () => {
	const {date} = this.state;
    // 结合隐藏form表单进行react和post接口下载数据
    let divElement = document.getElementById('downloadDiv');
    ReactDOM.render(
      <form action="/api/post/export" method="post" target="_blank">
        <input name="date" type="text" value={date} />     // 变量参数值
        <input name="status" type="text" value="1" />
      </form>,
      divElement
    );
    ReactDOM.findDOMNode(divElement)
      .querySelector('form')
      .submit();
    ReactDOM.unmountComponentAtNode(divElement);
  };
```
#### Upload手动上传解析

```
https://ant.design/components/upload-cn/
```

```
import {
  Upload, Button, Icon, message,
} from 'antd';
import reqwest from 'reqwest';

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      // 接受上传的文件类型,比如接收上传文件格式为xlsx或xls,之间用逗号隔开
      accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      // beforeUpload 返回 false 后，手动上传文件。
      //file对象里有size/type属性可以对上传文件的大小和格式作出限制
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
==accept属性类型如下==：
```
后缀名       MIME名称
*.3gpp    audio/3gpp, video/3gpp
*.ac3    audio/ac3
*.asf       allpication/vnd.ms-asf
*.au           audio/basic
*.css           text/css
*.csv           text/csv
*.doc    application/msword    
*.dot    application/msword    
*.dtd    application/xml-dtd    
*.dwg    image/vnd.dwg    
*.dxf      image/vnd.dxf
*.gif            image/gif    
*.htm    text/html    
*.html    text/html    
*.jp2            image/jp2    
*.jpe       image/jpeg
*.jpeg    image/jpeg
*.jpg          image/jpeg    
*.js       text/javascript, application/javascript    
*.json    application/json    
*.mp2    audio/mpeg, video/mpeg    
*.mp3    audio/mpeg    
*.mp4    audio/mp4, video/mp4    
*.mpeg    video/mpeg    
*.mpg    video/mpeg    
*.mpp    application/vnd.ms-project    
*.ogg    application/ogg, audio/ogg    
*.pdf    application/pdf    
*.png    image/png    
*.pot    application/vnd.ms-powerpoint    
*.pps    application/vnd.ms-powerpoint    
*.ppt    application/vnd.ms-powerpoint    
*.rtf            application/rtf, text/rtf    
*.svf           image/vnd.svf    
*.tif         image/tiff    
*.tiff       image/tiff    
*.txt           text/plain    
*.wdb    application/vnd.ms-works    
*.wps    application/vnd.ms-works    
*.xhtml    application/xhtml+xml    
*.xlc      application/vnd.ms-excel    
*.xlm    application/vnd.ms-excel    
*.xls           application/vnd.ms-excel    
*.xlt      application/vnd.ms-excel    
*.xlw      application/vnd.ms-excel    
*.xml    text/xml, application/xml    
*.zip            aplication/zip    
*.xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```
==beforeUpload属性对上传文件格式及大小的限制==
```
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
```

4. ### js对数组的操作

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

**[⬆ 返回顶部](#目录)**
