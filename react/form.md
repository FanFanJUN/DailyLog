---
title: ant design form 表单
date: 2018-12-16 21:29:47
tags: Ant Design Pro 2.0
---

# ant design form 表单

#### Form.create 包装的组件将会自带 this.props.form 属性

```
const { form } = this.props

form.resetFields() 用于清空输入空

form.validateFields 用于验证
```
#### 自定义校验

```
<FormItem {...formItemLayout} label="账号名" hasFeedback>
                                {getFieldDecorator('account', {
                                    rules: [{
                                        required: true, message: '账号名不能为空',
                                    },{
                                        validator: this.checkAccount,
                                    }],
                                    initialValue: ''
                                })(
                                    <Input placeholder="手机号或邮箱号"/>
                                )}
 </FormItem>
```

```
checkAccount(rule, value, callback) {
         var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

        if (value.length==11 || re.test(value)) {
            callback();
        } else {
            callback('账号名为邮箱或手机号');
        }
    };
```
#### Input输入框失焦的时候向服务端发送数据validateTrigger

```
<Form.Item
      {...formItemLayout}
      label={HAP.languageChange('名称')}
      hasFeedback
    >
      {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              whitespace: true,
              validator: this.checkName,
            },
          ],
          validateTrigger: 'onBlur',
      })(
        <Input size="default" />,
      )}
    </Form.Item>
```
#### rules限制输入为数字


```
rules: [{
                    required: true,
                    whitespace: true,
                    type:'number',
                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    },
 message: '请输入联系方式' }],
```
