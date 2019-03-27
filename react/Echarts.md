---
title: 在Raect中使用Echarts
date: 2018-10-28 16:59:58
tags:
- Ant Design Pro 2.0
categories: 
- React技术栈
---

## 在Raect中使用Echarts

#### 百度旗下出品：可视化数据
[Echarts 2.X官网](http://echarts.baidu.com/echarts2/)

[Echarts 3.X官网](http://echarts.baidu.com/index.html)


#### Echarts的使用

##### npm install echarts --save

##### 添加基本的react组件模型，一个render方法，定义了一个div容器来展示canvas，style初始化容器的宽度和高度，如果不设置，就无法渲染canvas，这里用到了ref来获取节点，而不是id。

##### 在react中，我们需要等到虚拟dom渲染完成了才能通过refs去获取节点，这样我们就可以在组件componentDidMount的时候初始化echarts。


```
import React, {
  Component
} from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/echarts';
// 引入柱状图
import  'echarts/chart/bar';
// 引入提示框和标题组件
import 'echarts/component/tooltip';
import 'echarts/component/title';
// import echarts from 'echarts/lib/echarts';
// // 引入柱状图
// import  'echarts/lib/chart/bar';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';

class EchartsTest2 extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.refs.main);
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);
  }

  render() {
    return ( 
      <div
        ref="main" 
        style={
        {
          width: 400,
          height: 400
        }
      }
      />
    );
  }
}

export default EchartsTest2;
```


```
import React, { Component } from 'react';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件

export class PieReact extends React.Component {
    
    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        this.initPie = this.initPie.bind(this)
    }
    
    initPie() {
        const { data } = this.props //外部传入的data数据
        let myChart = echarts.init(this.refs.pieChart) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setPieOption(data)
        //设置options
        myChart.setOption(options)
    }
    
    componentDidMount() {
        this.initPie()
    }
    
    componentDidUpdate() {
        this.initPie()
    }
    
    render() {
        return (
            <div className="pie-react">
                <div ref="pieReact" style={{width: "100%", height: "200px"}}></div>
            </div>
        )
    }
    
    //一个基本的echarts图表配置函数
    setPieOption(data) {
        return {
            series : [
                {
                    name: '比例',
                    type: 'pie',
                    radius: ['70%', '90%'],
                    avoidLabelOverlap: true,
                    data: data, //传入外部的data数据
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            textStyle: {
                                fontSize: '18'
                            },
                            formatter: "{d}% \n{b}",
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '18',
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    }
                }
            ]
        }
    }
}
```
## echarts-for-react的使用（一个简单的 echarts(v3.0 & v4.0) 的 react 封装）

##### [echarts-for-react的GitHub](https://github.com/hustcc/echarts-for-react)

##### 实现实例

##### 
```
npm install --save echarts-for-react

npm install --save echarts
```


```
import React, {
  Component
  } from 'react';
import ReactEcharts from 'echarts-for-react';
// 引入 ECharts 主模块
// 引入柱状图
import  'echarts/chart/bar';
// 引入提示框和标题组件
import 'echarts/component/tooltip';
import 'echarts/component/title';
// 引入柱状图
// import  'echarts/lib/chart/bar';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
  
  class ReactEchartsTest extends Component {
    getOption=()=>{
      // 指定图表的配置项和数据 option:接收一个对象，该对象为 echarts 的配置项
        const option = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20],
            }]
          };
        return option;
    }

  // notMerge:可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
  // LazyUpdate:可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
  // style:echarts 容器 div 大小
    render() {
      return ( 
        <div>
          <ReactEcharts
            option={this.getOption()}
            style={
              {
                width: 400,
                height: 400
              }
            }
            notMerge
            lazyUpdate
            theme="theme_name"
          />
        </div>
      );
    }
  }
  
  export default ReactEchartsTest;
  
```
