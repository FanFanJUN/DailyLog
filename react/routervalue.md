---
title: React Router跳转及页面传值
date: 2018-09-25 21:03:59
tags:
- React-Router
categories: 
- React技术栈
---

# React Router跳转及页面传值

## <link>

- **to: string**


```
<Link to='/courses?sort=name'>跳转<Link>
```

- **to: object**


```
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```
## this.props.params

1.定义路由


```
<Route path='/user/:id' component={UserPage}></Route>
```

2.跳转前页面


```
<Link to={`/topics/${id}`} >点击跳转</Link>
```

3.获取参数

```
this.props.params
或者react-router v4高版本
this.props.（match）.params.参数名   获取URL中的参数值
```

## state

state方式依然可以传递任意类型的数据，而且可以不以明文方式传输。state传的参数是加密的

- 定义路由

```
<Route path= ' /user' component= {UserPage}></Route>
```
- 使用
```
const data = {id:3,name:sam,age:36};
const path = {pathname: ' /user',state:data,}
```

```
1.<Link to={path}> 用户</Link>
```

```
2.import { hashHistory } from 'react-router'
    hashHistory.push (path); 
//  browserHistory.push(); 表单跳转
//  this.props.history.push();
```
- 获取数据


```
const data = this.props.location.state;
(获取当前路由地址this.props.location.pathname)
const {id, name,age} = data;
```
## 基于 action 进行页面跳转


```
import { routerRedux } from 'dva/router';

// Inside Effects
yield put(routerRedux.push('/logout'));

// Outside Effects
dispatch(routerRedux.push('/logout'));

// With query
routerRedux.push({
  pathname: '/logout',
  query: {
    page: 2,
  },
});
```

## umi官方跳转

### umi/link

```
import Link from 'umi/link';

export default () => {
  <div>
    /* 普通使用 */
    <Link to="/list">Go to list page</Link>

    /* 带参数 */
    <Link to="/list?a=b">Go to list page</Link>

    /* 包含子组件 */
    <Link to="/list?a=b"><button>Go to list page</button></Link>
  </div>
}
```
### umi/router


```
import router from 'umi/router';

// 普通跳转，不带参数
router.push('/list');

// 带参数
router.push('/list?a=b');
router.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});
# 对象且不包含 pathname 会报错
router.push({
  query: {}
});
```
注意：pathname属性不要更改，否则出错
