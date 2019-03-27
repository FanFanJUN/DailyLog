title: ES6绑定this的三种方式
date: 2018-09-11 10:25:52
tags:
- ES6
categories: 
- web前端
---
# 0.React绑定this的三种方式
## 0.1 bind()

    handleClick (name, e) {
        console.log(this.state.message + name)
    }

    render () {
        return (
            <div>
                <button onClick={ this.handleClick.bind(this, '赵四') }>Say Hello</button>
            </div>
        )
    }
## 0.2 构造函数内绑定

    handleClick (e) {
        console.log(this.state.message)
    }

    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }

## 0.3 箭头函数(es6语法，用得最多)

 
    handleClick = (e) => {
        console.log(this.state.message)
    }
 
    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }

## 0.4 箭头函数传参
 
    render () {
        return (
            <div>
                <button onClick={ ()=>this.handleClick('参数') }>Say Hello</button>
            </div>
        )
    }