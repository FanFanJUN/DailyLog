#### useState

```
const [state, setState] = useState(initialState)
```
#### useEffect

```
useEffect(fn, array)
```
- useEffect 实现componentDidMount(第二个参数为空数组，useEffect相当于类组件里面componentDidMount)

```
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("我只会在组件初次挂载完成后执行");
  }, []);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Example;

```
- useEffect 实现componentDidUpdate(不传第二个参数，useEffect 会在初次渲染和每次更新时，都会执行)

```
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("我会在初次组件挂载完成后以及重新渲染时执行");
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Example;
```
- useEffect 实现componentWillUnmount(effect 返回一个函数，React 将会在执行清除操作时调用它)

```
useEffect(() => {
    console.log("订阅一些事件");
    return () => {
      console.log("执行清楚操作")
    }
  },[]);
```
- useEffect中使用异步函数

```
方法一（推荐）
const App = () => {
  useEffect(() => {
    (async function getDatas() {
      await getData();
    })();
  }, []);
  return <div></div>;
};
```

```
  useEffect(() => {
    const getDatas = async () => {
      const data = await getData();
      setData(data);
    };
    getDatas();
  }, []);
```
#### useContext

```
const value = useContext(MyContext);
```

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// 创建两个context
export const UserContext = React.createContext();
export const TokenContext = React.createContext();
ReactDOM.render(
  <UserContext.Provider value={{ id: 1, name: "chimmy", age: "20" }}>
    <TokenContext.Provider value="我是token">
      <App />
    </TokenContext.Provider>
  </UserContext.Provider>,
  document.getElementById("root")
);

app.js

import React, { useContext } from "react";
import { UserContext, TokenContext } from "./index";

function Example() {
  let user = useContext(UserContext);
  let token = useContext(TokenContext);
  console.log("UserContext", user);
  console.log("TokenContext", token);
  return (
    <div>
      name:{user?.name},age:{user?.age}
    </div>
  );
}
export default Example;

```
#### useReducer

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```
import React, { useReducer } from "react";
export default function Home() {
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { ...state, counter: state.counter + 1 };
      case "decrement":
        return { ...state, counter: state.counter - 1 };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  return (
    <div>
      <h2>Home当前计数: {state.counter}</h2>
      <button onClick={(e) => dispatch({ type: "increment" })}>+1</button>
      <button onClick={(e) => dispatch({ type: "decrement" })}>-1</button>
    </div>
  );
}
```
#### useCallback

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

```
import React, { useCallback, useState } from "react";
// 子组件
function Childs(props) {
  console.log("子组件渲染了");
  return (
    <>
      <button onClick={props.onClick}>改标题</button>
      <h1>{props.name}</h1>
    </>
  );
}
const Child = React.memo(Childs);

function App() {
  const [title, setTitle] = useState("这是一个 title");
  const [subtitle, setSubtitle] = useState("我是一个副标题");
  const callback = () => {
    setTitle("标题改变了");
  };
  return (
    <div className='App'>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <button onClick={() => setSubtitle("副标题改变了")}>改副标题</button>
      {/* <Child onClick={callback} name='桃桃' /> 子组件渲染 */}
      {/* 子组件不渲染 */}
      <Child onClick={useCallback(callback, [])} name='桃桃' />
    </div>
  );
}

export default App;
```
#### useMemo

```
const cacheSomething = useMemo(create,deps)

```
#### useCallback 和 useMemo 总结

```
useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回就结果。useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存。当然如果只是进行一些简单的计算也没必要使用 useMemo。
```

#### useRef

```
父组件
import React, { 
  useRef
} from 'react'

import { Modal } from 'antd'
import MyForm from './myForm'

const ParentComp = () => {

    const getFormValue = useRef();

    const handleOk = () => {
      const fields = getFormValue.current.formFields;
      console.log(fields)
    }

    return <Modal onOk={handleOk} >
             <MyForm
               wrappedComponentRef={getFormValue}
             />
           </Modal>
}

export default ParentComp 


子组件
import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import { Form } from 'antd'

const MyForm = (props, ref) => {
  const formRef = useRef()

  useImperativeHandle(ref, () => ({
    formFields: props.form.getFieldsValue()
  }))

  return <Form ref={formRef}>
     ...
  </Form>
}

const WrappedForm = Form.create({ name: 'form' })(forwardRef(MyForm))

export default WrappedForm

```