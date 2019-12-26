# 全屏相关js
#### [React 實現頁面全屏效果](https://www.itread01.com/content/1543369330.html)

```
HTML程式碼：

<a
	onClick={this.fullScreen}
	style={{ margin: "0 6px 0 6px"}}
>全屏</a>

js程式碼：  
state = {   
    isFullScreen: false
    }	
    
fullScreen = () => {
console.log('fullscreen:',this.state.isFullScreen);
    if (!this.state.isFullScreen) {
      this.requestFullScreen();
    } else {
      this.exitFullscreen();
    }
};

//進入全屏requestFullScreen = () => {
 console.log('requestFullScreen')
var de = document.documentElement;
if (de.requestFullscreen) {
	de.requestFullscreen();
} else if (de.mozRequestFullScreen) {
	de.mozRequestFullScreen();
} else if (de.webkitRequestFullScreen) {
	de.webkitRequestFullScreen();
}
};

//退出全屏
exitFullscreen = () => {
console.log('exitFullscreen')
var de = document;
if (de.exitFullscreen) {
	de.exitFullscreen();
} else if (de.mozCancelFullScreen) {
 de.mozCancelFullScreen();
} else if (de.webkitCancelFullScreen) {
	de.webkitCancelFullScreen();
}
};

//監聽fullscreenchange事件
watchFullScreen = () => {
const _self = this;
document.addEventListener(
	"fullscreenchange",
	function() {
  	_self.setState({
    isFullScreen: document.fullscreen
  });
},
false
);

document.addEventListener(
"mozfullscreenchange",
function() {
  _self.setState({
    isFullScreen: document.mozFullScreen
  });
},
false
);

document.addEventListener(
"webkitfullscreenchange",
function() {
  _self.setState({
    isFullScreen: document.webkitIsFullScreen
  });
},
false
);
};

```
#### [使用 Fullscreen API 全屏展示内容](https://github.com/JChehe/blog/issues/17)
#### [js全屏事件fullscreenchange，进入全屏，退出全屏操作](https://blog.csdn.net/qq_36410795/article/details/93723822)
- 进入全屏
```
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

launchFullscreen(document.documentElement) // 整个页面进入全屏
launchFullscreen(document.getElementById("id")) //某个元素进入全屏

```
- 退出全屏
```
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
exitFullscreen()


```
- 全屏事件

```
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    console.log('进入全屏')
  } else {
    console.log('退出全屏')
  }
})

```
