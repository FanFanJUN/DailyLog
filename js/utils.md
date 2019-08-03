# js工具方法封装

#### [公民身份号码正确性判定及程序实现](https://30ke.cn/doc/id-num-validaty)
```
JS校验地区码
var checkProv = function (val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
    if(pattern.test(val)) {
        if(provs[val]) {
            return true;
        }
    }
    return false;
}
//输出 true，37是山东
console.log(checkProv(37));
//输出 false，16不存在
console.log(checkProv(16));

JS校验出生日期
var checkDate = function (val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if(pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year+"-"+month+"-"+date);
        if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
}
//输出 true
console.log(checkDate("20180212"));
//输出 false 2月没有31日
console.log(checkDate("20180231"));

JS校验校验码
var checkCode = function (val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var code = val.substring(17);
    if(p.test(val)) {
        var sum = 0;
        for(var i=0;i<17;i++) {
            sum += val[i]*factor[i];
        }
        if(parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
}
// 输出 true， 校验码相符
console.log(checkCode("11010519491231002X"));
// 输出 false， 校验码不符
console.log(checkCode("110105194912310021"));

JS完整代码清单
var checkID = function (val) {
    if(checkCode(val)) {
        var date = val.substring(6,14);
        if(checkDate(date)) {
            if(checkProv(val.substring(0,2))) {
                return true;
            }
        }
    }
    return false;
}
//输出 true
console.log(checkID("11010519491231002X"));
//输出 false，校验码不符
console.log(checkID("110105194912310021"));
//输出 false，日期码不符
console.log(checkID("110105194902310026"));
//输出 false，地区码不符
console.log(checkID("160105194912310029"));
```

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
    if(!value || value == null || typeof value === 'undefined' || value === ''){
        return true;
    }
    return false;
}

function isEmptyObject(object){
    if(checkNull(object)){
        return true;
    }
    if(Object.prototype.toString.call(object) ===
    '[object Object]'&& Object.keys(object).length=== 0){
        return true;
    }
    return false;
}

function isEmptyArray(array) {
    if(checkNull(array)) {
        return true;
    }
    if(Object.prototype.toString.call(array) === 
     '[object Array]' && array.length === 0) {
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
#### JavaScript常用工具方法封装

1. type 类型判断

```
isString (o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

isNumber (o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

isBoolean (o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

isFunction (o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

isNull (o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

isUndefined (o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

isObj (o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

isDate (o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

isRegExp (o) { //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

isError (o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

isSymbol (o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

isPromise (o) { //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

isSet (o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}

isFalse (o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
        return false
}

isTrue (o) {
    return !this.isFalse(o)
}

isIos () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        return false
    }else{
        return false
    }
}

isPC () { //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

browserType(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) return "IE7"
        else if(fIEVersion == 8) return "IE8";
        else if(fIEVersion == 9) return "IE9";
        else if(fIEVersion == 10) return "IE10";
        else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
}

checkStr (str, type) {
    switch (type) {
        case 'phone':   //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':     //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':    //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal':  //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ':      //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':   //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':   //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':     //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP':      //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':    //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number':  //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':   //小写
            return /^[a-z]+$/.test(str);
        case 'upper':   //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML':    //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }

    // 严格的身份证校验
    isCardID(sId) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
            alert('你输入的身份证长度或格式错误')
            return false
        }
        //身份证城市
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if(!aCity[parseInt(sId.substr(0,2))]) { 
            alert('你的身份证地区非法')
            return false
        }

        // 出生日期验证
        var sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
            d = new Date(sBirthday)
        if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
            alert('身份证上的出生日期非法')
            return false
        }

        // 身份证号码校验
        var sum = 0,
            weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = "10X98765432"
        for (var i = 0; i < sId.length - 1; i++) {
            sum += sId[i] * weights[i];
        }
        var last = codes[sum % 11]; //计算出来的最后一位身份证号码
        if (sId[sId.length-1] != last) { 
            alert('你输入的身份证号非法')
            return false
        }

        return true
    }
}
```
2. Date


```
/**
 * 格式化时间
 * 
 * @param  {time} 时间
 * @param  {cFormat} 格式
 * @return {String} 字符串
 *
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
 */
formatTime(time, cFormat) {
    if (arguments.length === 0) return null
    if ((time + '').length === 10) {
        time = +time * 1000
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(time)
    }

    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        var value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

/**
 * 返回指定长度的月份集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
 * @return {Array} 数组
 * 
 * @example   getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
 */
getMonths(time, len, direction) {
    var mm = new Date(time).getMonth(),
        yy = new Date(time).getFullYear(),
        direction = isNaN(direction) ? 3 : direction,
        index = mm;
    var cutMonth = function(index) {
        if ( index <= len && index >= -len) {
            return direction === 1 ? formatPre(index).concat(cutMonth(++index)):
                direction === 2 ? formatNext(index).concat(cutMonth(++index)):formatCurr(index).concat(cutMonth(++index))
        }
        return []
    }
    var formatNext = function(i) {
        var y = Math.floor(i/12),
            m = i%12
        return [yy+y + '-' + (m+1)]
    }
    var formatPre = function(i) {
        var y = Math.ceil(i/12),
            m = i%12
        m = m===0 ? 12 : m
        return [yy-y + '-' + (13 - m)]
    }
    var formatCurr = function(i) {
        var y = Math.floor(i/12),
            yNext = Math.ceil(i/12),
            m = i%12,
            mNext = m===0 ? 12 : m
        return [yy-yNext + '-' + (13 - mNext),yy+y + '-' + (m+1)]
    }
    // 数组去重
    var unique = function(arr) {
        if ( Array.hasOwnProperty('from') ) {
            return Array.from(new Set(arr));
        }else{
            var n = {},r=[]; 
            for(var i = 0; i < arr.length; i++){
                if (!n[arr[i]]){
                    n[arr[i]] = true; 
                    r.push(arr[i]);
                }
            }
            return r;
        }
    }
    return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function(t1, t2){
        return new Date(t1).getTime() - new Date(t2).getTime()
    }))
}

/**
 * 返回指定长度的天数集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
 * @return {Array} 数组
 *
 * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
 */
getDays(time, len, diretion) {
    var tt = new Date(time)
    var getDay = function(day) {
        var t = new Date(time)
        t.setDate(t.getDate() + day)
        var m = t.getMonth()+1
        return t.getFullYear()+'-'+m+'-'+t.getDate()
    }
    var arr = []
    if (diretion === 1) {
        for (var i = 1; i <= len; i++) {
            arr.unshift(getDay(-i))
        }
    }else if(diretion === 2) {
        for (var i = 1; i <= len; i++) {
            arr.push(getDay(i))
        }
    }else {
        for (var i = 1; i <= len; i++) {
            arr.unshift(getDay(-i))
        }
        arr.push(tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate())
        for (var i = 1; i <= len; i++) {
            arr.push(getDay(i))
        }
    }
    return diretion === 1 ? arr.concat([tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()]) : 
        diretion === 2 ? [tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()].concat(arr) : arr
}

/**
 * @param  {s} 秒数
 * @return {String} 字符串 
 *
 * @example formatHMS(3610) // -> 1h0m10s
 */
formatHMS (s) {
    var str = ''
    if (s > 3600) {
        str = Math.floor(s/3600)+'h'+Math.floor(s%3600/60)+'m'+s%60+'s'
    }else if(s > 60) {
        str = Math.floor(s/60)+'m'+s%60+'s'
    }else{
        str = s%60+'s'
    }
    return str
}

/*获取某月有多少天*/
getMonthOfDay (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var mouth = date.getMonth() + 1
    var days

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
        days = (year%4==0 && year%100==0 && year%400==0) || (year%4==0 && year%100!=0) ? 28 : 29
    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
    } else {
        //其他月份，天数为：30.
        days = 30
    }
    return days
}

/*获取某年有多少天*/
getYearOfDay (time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var lastDayYear = this.getLastDayOfYear(time);
    var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime())/1000;
    return Math.ceil(numSecond/(24*3600));
}

/*获取某年的第一天*/
getFirstDayOfYear (time) {
    var year = new Date(time).getFullYear();
    return year + "-01-01 00:00:00";
}

/*获取某年最后一天*/
getLastDayOfYear (time) {
    var year = new Date(time).getFullYear();
    var dateString = year + "-12-01 00:00:00";
    var endDay = this.getMonthOfDay(dateString);
    return year + "-12-" + endDay + " 23:59:59";
}

/*获取某个日期是当年中的第几天*/
getDayOfYear (time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime())/1000;
    return Math.ceil(numSecond/(24*3600));
}

/*获取某个日期在这一年的第几周*/
getDayOfYearWeek (time) {
    var numdays = this.getDayOfYear(time);
    return Math.ceil(numdays / 7);
}
```
3. Array


```
/*判断一个元素是否在数组中*/
contains (arr, val) {
    return arr.indexOf(val) != -1 ? true : false;
}

/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @return {undefined}
 */
each (arr, fn) {
    fn = fn || Function;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < arr.length; i++) {
        var res = fn.apply(arr, [arr[i], i].concat(args));
        if(res != null) a.push(res);
    }
}

/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @param  {thisObj} this指向
 * @return {Array} 
 */
map (arr, fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for(var i = 0, j = arr.length; i < j; ++i) {
        var res = fn.call(scope, arr[i], i, this);
        if(res != null) a.push(res);
    }
    return a;
}

/**
 * @param  {arr} 数组
 * @param  {type} 1：从小到大   2：从大到小   3：随机
 * @return {Array}
 */
sort (arr, type = 1) {
    return arr.sort( (a, b) => {
        switch(type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}

/*去重*/
unique (arr) {
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr));
    }else{
        var n = {},r=[]; 
        for(var i = 0; i < arr.length; i++){
            if (!n[arr[i]]){
                n[arr[i]] = true; 
                r.push(arr[i]);
            }
        }
        return r;
    }
    // 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能,暂时没找到替代的方法。。。
    /* 正确排重
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr))
    }else{
        var r = [], NaNBol = true
        for(var i=0; i < arr.length; i++) {
            if (arr[i] !== arr[i]) {
                if (NaNBol && r.indexOf(arr[i]) === -1) {
                    r.push(arr[i])
                    NaNBol = false
                }
            }else{
                if(r.indexOf(arr[i]) === -1) r.push(arr[i])
            }
        }
        return r
    }

     */
}

/*求两个集合的并集*/
union (a, b) {
    var newArr = a.concat(b);
    return this.unique(newArr);
}

/*求两个集合的交集*/
intersect (a, b) {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function(o) {
        return _this.contains(b, o) ? o : null;
    });
}

/*删除其中一个元素*/
remove (arr, ele) {
    var index = arr.indexOf(ele);
    if(index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

/*将类数组转换为数组的方法*/
formArray (ary) {
    var arr = [];
    if(Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    };
    return arr;
}

/*最大值*/
max (arr) {
    return Math.max.apply(null, arr);
}

/*最小值*/
min (arr) {
    return Math.min.apply(null, arr);
}

/*求和*/
sum (arr) {
    return arr.reduce( (pre, cur) => {
        return pre + cur
    })
}

/*平均值*/
average (arr) {
    return this.sum(arr)/arr.length
}
```

4. String 字符串操作


```
/**
 * 去除空格
 * @param  {str}
 * @param  {type} 
 *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
trim (str, type) {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
 * @param  {str} 
 * @param  {type}
 *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return {String}
 */
changeCase (str, type) {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map( function(word){
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                }else{
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/*
    检测密码强度
*/
checkPwd (str) {
    var Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}

/*过滤html代码(把<>转换)*/
filterTag (str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
}
```

5. Number


```
/*随机数范围*/
random (min, max) {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ( (max+1) - min ))
    }else{
        return null;
    }

}

/*将阿拉伯数字翻译成中文的大写数字*/
numberToChinese (num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for(var i = a[0].length - 1; i >= 0; i--) {
        switch(k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if(a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if(a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for(var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if(re == '一十')
        re = "十";
    if(re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}

/*将数字转换为大写金额*/
changeToChinese (Num) {
        //判断如果传递进来的不是字符的话转换为字符
        if(typeof Num == "number") {
            Num = new String(Num);
        };
        Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
        Num = Num.replace(/ /g, "") //替换tomoney()中的空格
        Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
        if(isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return "";
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(".");
        var newchar = "";
        //小数点前进行转化
        for(var i = part[0].length - 1; i >= 0; i--) {
            if(part[0].length > 10) {
                return "";
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = ""
            var perchar = part[0].charAt(i);
            switch(perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            switch(part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + "元";
                    break;
                case 1:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "拾";
                    break;
            }
            var newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if(Num.indexOf(".") != -1) {
            if(part[1].length > 2) {
                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)
            }
            for(i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
                switch(perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                if(i == 0) tmpnewchar = tmpnewchar + "角";
                if(i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while(newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
        if(newchar.charAt(newchar.length - 1) == "元") {
            newchar = newchar + "整"
        }
        return newchar;
    }
```

6. Http


```
/**
 * @param  {setting}
 */
ajax(setting){
    //设置参数的初始值
    var opts={
        method: (setting.method || "GET").toUpperCase(), //请求方式
        url: setting.url || "", // 请求地址
        async: setting.async || true, // 是否异步
        dataType: setting.dataType || "json", // 解析方式
        data: setting.data || "", // 参数
        success: setting.success || function(){}, // 请求成功回调
        error: setting.error || function(){} // 请求失败回调
    }

    // 参数格式化
    function params_format (obj) {
        var str = ''
        for (var i in obj) {
            str += i + '=' + obj[i] + '&'
        }
        return str.split('').slice(0, -1).join('')
    }

    // 创建ajax对象
    var xhr=new XMLHttpRequest();

    // 连接服务器open(方法GET/POST，请求地址， 异步传输)
    if(opts.method == 'GET'){
        xhr.open(opts.method, opts.url + "?" + params_format(opts.data), opts.async);
        xhr.send();
    }else{
        xhr.open(opts.method, opts.url, opts.async);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(opts.data);
    }

    /*
    ** 每当readyState改变时，就会触发onreadystatechange事件
    ** readyState属性存储有XMLHttpRequest的状态信息
    ** 0 ：请求未初始化
    ** 1 ：服务器连接已建立
    ** 2 ：请求已接受
    ** 3 : 请求处理中
    ** 4 ：请求已完成，且相应就绪
    */
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
            switch(opts.dataType){
                case "json":
                    var json = JSON.parse(xhr.responseText);
                    opts.success(json);
                    break;
                case "xml":
                    opts.success(xhr.responseXML);
                    break;
                default:
                    opts.success(xhr.responseText);
                    break;
            }
        }
    }

    xhr.onerror = function(err) {
        opts.error(err);
    }
}

/**
 * @param  {url}
 * @param  {setting}
 * @return {Promise}
 */
fetch(url, setting) {
    //设置参数的初始值
    let opts={
        method: (setting.method || 'GET').toUpperCase(), //请求方式
        headers : setting.headers  || {}, // 请求头设置
        credentials : setting.credentials  || true, // 设置cookie是否一起发送
        body: setting.body || {},
        mode : setting.mode  || 'no-cors', // 可以设置 cors, no-cors, same-origin
        redirect : setting.redirect  || 'follow', // follow, error, manual
        cache : setting.cache  || 'default' // 设置 cache 模式 (default, reload, no-cache)
    }
    let dataType = setting.dataType || "json", // 解析方式  
        data = setting.data || "" // 参数

    // 参数格式化
    function params_format (obj) {
        var str = ''
        for (var i in obj) {
            str += `${i}=${obj[i]}&`
        }
        return str.split('').slice(0, -1).join('')
    }

    if (opts.method === 'GET') {
        url = url + (data?`?${params_format(data)}`:'')
    }else{
        setting.body = data || {}
    }

    return new Promise( (resolve, reject) => {
        fetch(url, opts).then( async res => {
            let data = dataType === 'text' ? await res.text() :
                dataType === 'blob' ? await res.blob() : await res.json() 
            resolve(data)
        }).catch( e => {
            reject(e)
        })
    })

}
```

7. DOM

```
$ (selector){ 
    var type = selector.substring(0, 1);
    if (type === '#') {
        if (document.querySelecotor) return document.querySelector(selector)
            return document.getElementById(selector.substring(1))

    }else if (type === '.') {
        if (document.querySelecotorAll) return document.querySelectorAll(selector)
            return document.getElementsByClassName(selector.substring(1))
    }else{
        return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
    }
} 

/*检测类名*/
hasClass (ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
}

/*添加类名*/
addClass (ele, name) {
    if (!this.hasClass(ele, name)) ele.className += " " + name;
}

/*删除类名*/
removeClass (ele, name) {
    if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}

/*替换类名*/
replaceClass (ele, newName, oldName) {
    this.removeClass(ele, oldName);
    this.addClass(ele, newName);
}

/*获取兄弟节点*/
siblings (ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children,eleMatch = []; 
    for(var i = 0, len = chid.length; i < len; i ++){ 
        if(chid[i] != ele){ 
            eleMatch.push(chid[i]); 
        } 
    } 
    return eleMatch;
}

/*获取行间样式属性*/
getByStyle (obj,name){
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    }else{
        return  getComputedStyle(obj,false)[name];
    }
}
```
8. Storage 储存操作

```
class StorageFn {
    constructor () {
        this.ls = window.localStorage;
        this.ss = window.sessionStorage;
    }

    /*-----------------cookie---------------------*/
    /*设置cookie*/
    setCookie (name, value, day) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for (var i in setting) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + day);
                document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
            }
        }else{
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = name + '=' + value + ';expires=' + oDate;
        }

    }

    /*获取cookie*/
    getCookie (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    }

    /*删除cookie*/
    removeCookie (name) {
        this.setCookie(name, 1, -1);
    }

    /*-----------------localStorage---------------------*/
    /*设置localStorage*/
    setLocal(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for(var i in setting){
                this.ls.setItem(i, JSON.stringify(setting[i]))
            }
        }else{
            this.ls.setItem(key, JSON.stringify(val))
        }

    }

    /*获取localStorage*/
    getLocal(key) {
        if (key) return JSON.parse(this.ls.getItem(key))
        return null;

    }

    /*移除localStorage*/
    removeLocal(key) {
        this.ls.removeItem(key)
    }

    /*移除所有localStorage*/
    clearLocal() {
        this.ls.clear()
    }

    /*-----------------sessionStorage---------------------*/
    /*设置sessionStorage*/
    setSession(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for(var i in setting){
                this.ss.setItem(i, JSON.stringify(setting[i]))
            }
        }else{
            this.ss.setItem(key, JSON.stringify(val))
        }

    }

    /*获取sessionStorage*/
    getSession(key) {
        if (key) return JSON.parse(this.ss.getItem(key))
        return null;

    }

    /*移除sessionStorage*/
    removeSession(key) {
        this.ss.removeItem(key)
    }

    /*移除所有sessionStorage*/
    clearSession() {
        this.ss.clear()
    }

}
```
9. Other 其它操作

```
/*获取网址参数*/
getURL(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if(r!=null) return  r[2]; return null;
}

/*获取全部url参数,并转换成json对象*/
getUrlAllParams (url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

/*删除url指定参数，返回url*/
delParamsUrl(url, name){
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(name)>-1) {
        var obj = {}
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }else{
        return url;
    }
}

/*获取十六进制随机颜色*/
getRandomColor () {
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
}

/*图片加载*/
imgLoadAll(arr,callback){
    var arrImg = []; 
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = arr[i];
        img.onload = function(){
            arrImg.push(this);
            if (arrImg.length == arr.length) {
                callback && callback();
            }
        }
    }
}

/*音频加载*/
loadAudio(src, callback) {
    var audio = new Audio(src);
    audio.onloadedmetadata = callback;
    audio.src = src;
}

/*DOM转字符串*/
domToStirng(htmlDOM){
    var div= document.createElement("div");
    div.appendChild(htmlDOM);
    return div.innerHTML
}

/*字符串转DOM*/
stringToDom(htmlString){
    var div= document.createElement("div");
    div.innerHTML=htmlString;
    return div.children[0];
}

/**
 * 光标所在位置插入字符，并设置光标位置
 * 
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
setCursorPosition (dom,val,posLen) {
    var cursorPosition = 0;
    if(dom.selectionStart){
        cursorPosition = dom.selectionStart;
    }
    this.insertAtCursor(dom,val);
    dom.focus();
    console.log(posLen)
    dom.setSelectionRange(dom.value.length,cursorPosition + (posLen || val.length));
}

/*光标所在位置插入字符*/
insertAtCursor(dom, val) {
    if (document.selection){
        dom.focus();
        sel = document.selection.createRange();
        sel.text = val;
        sel.select();
    }else if (dom.selectionStart || dom.selectionStart == '0'){
        let startPos = dom.selectionStart;
        let endPos = dom.selectionEnd;
        let restoreTop = dom.scrollTop;
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
        if (restoreTop > 0){
            dom.scrollTop = restoreTop;
        }
        dom.focus();
        dom.selectionStart = startPos + val.length;
        dom.selectionEnd = startPos + val.length;
    } else {
        dom.value += val;
        dom.focus();
    }
}
```