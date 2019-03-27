---
title: 文件上传下载
date: 2019-03-10 15:16:36
tags:
- Ant Design Pro 2.0
categories: 
- React技术栈
---

# 文件上传下载

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

