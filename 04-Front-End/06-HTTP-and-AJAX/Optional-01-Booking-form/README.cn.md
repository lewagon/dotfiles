## 背景和目标

以下是你要在这个挑战创建的内容:

![动态窗体动图](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/booking-form.gif)

在这个挑战中我们不会用AJAX，我们只想当用户点击`-` / `+` 按钮时 **更新表单的UI**”。

提交表单不会产生任何影响。

是时候试着用下[`dataset`s](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)!

## 详细说明

启动本地Web服务器：

```bash
rake webpack
```

在浏览器打开[`localhost:8080`](http://localhost:8080)。

### 添加参与者

页面会显示一个预订窗体，我们希望把它变成**动态的**。当用户单击 `+` / `-` 按钮时，我们希望：

- 更新计数器
- 更新提交按钮上显示的价格
- 更新只读输入的值（单位：美分）

为此，请仔细阅读 `index.html`文件, 特别是 **`data-` 属性** 它可以帮助你！

### 启用减号(`-`)

`-` 按钮不应允许 `0` 或任何负数的值!当你想“禁用”链接时，可以防止链接的默认行为：

```js
button.addEventListener('click', (event) => {
  event.preventDefault();
});

```

可以通过以下方式改进窗体的UX：

- 切换 `-` 链接: 当参与者数量 **`>= 2`**时 **启用**链接, 其他情况**禁用** 它(计数器永远不应该是'0'或负值)!
- 隐藏输入 (你可能想看看[输入类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)),在窗体的最终版本中，用户不应看到它！

这个挑战**非常难**, 请与你的伙伴讨论，并用伪代码一步一步地来！

这个练习没有测试，不过我们还是要检查你的代码风格！所以请运行 `rake`。

## 资源

- 要向/从元素添加/删除HTML属性的话，你可能想看看[`removeAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute) 还有 [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- 你可以通过调用元素的[`.attributes` 属性](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes)来获得HTML元素的所有特性。
