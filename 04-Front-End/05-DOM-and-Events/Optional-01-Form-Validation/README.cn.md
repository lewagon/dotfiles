## 背景和目标

JavaScript在客户端验证窗体时非常有用。
当人们填写你的窗体时，如果一个地方填写错误最好尽快给他们反馈。

## 详细说明

和往常一样，你可以启动网页，然后前往[localhost:8080](http://localhost:8080)：

```bash
rake webpack
```

我们希望在用户填写每个输入时验证表单。[`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) 可能是你想要找的。。。

- 所有字段都是必填的
- 确保选中了“服务条款”复选框
- 确保用户输入有效的**法国的邮政编码**
- 验证电子邮件格式
- 验证电话号码**仅限法国手机号码**
- 如果所有字段都已正确填写，启用“提交”按钮

打开 `lib/validation.js` 文件.你会在这里编写验证逻辑。

## 进一步建议

要显示输入是否有效的话，可以在[Bootstrap服务端验证类](https://getbootstrap.com/docs/5.1/forms/validation/#server-side)的 `input`上使用 `.is-valid` 和 `.is-invalid`。像这样：

```html
<input type="text" class="form-control is-valid">
<input type="text" class="form-control is-invalid">
```
