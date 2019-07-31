#### echarts图表全屏显示设置
##### [自定义工具栏](https://www.echartsjs.com/option.html#toolbox)
-
```
toolbox: {
    show: true,
    feature: {
      dataView: { show: true },
      dataZoom: { show: true },
      restore: { show: true },
      saveAsImage: { show: true },
      myFull: {
        show: true,
        title: '全屏查看',
        icon: 'image://http://echarts.baidu.com/images/favicon.png',
        onclick: () => {
          const element = document.getElementById('vehicleProvince');
          // IE 10及以下ActiveXObject
          if (window.ActiveXObject) {
            const WsShell = new ActiveXObject('WScript.Shell');
            WsShell.SendKeys('{F11}');
          } else if (element.requestFullScreen) { // HTML W3C 提议
            element.requestFullScreen();
          } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullScreen();
          } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
            element.mozRequestFullScreen();
          }
        },
      },
    },
    top: -5,
  },
```
- 

```
toolbox: {
        feature: {
            myFull: {
                show: true,
                title: '全屏查看',
                icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                onclick: function (e){
                    var opts = e.getOption()
                    opts.toolbox[0].feature.myFull.show=false
                    //window.top表示最顶层iframe  如果在当页面全屏打开 删去window.top即可
                    window.top.layer.open({
                        title:false,
                        type:1,
                        content:'<div class="fullChart" style="height:100%;width:100%;padding:30px 0px"></div>",
                        success:function(){
                            var fullchart = echarts.init(window.top.document.getElementById('fullChart'))
                            fullchart.setOption(opts)
                        }
                    })
                }
            }
        }
    }
```
