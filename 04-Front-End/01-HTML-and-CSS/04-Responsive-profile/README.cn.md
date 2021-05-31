## 设置

我们现在要对我们的个人资料页面进行最后的润色。如果你还没有把之前的文件复制到这个挑战的文件夹中，运行以下代码，并添加一个CSS文件：

```bash
cp -r ../03-Finishing-profile-design/profile .
```

## 背景和目标

## 使用媒体查询（Media Query）来制作响应式（Responsive）页面

你的个人网站已经完成，但如果重新调整浏览器窗口的大小并使其变小，会发生什么？所以你的页面还不是**响应式**。😱

如果你想要一个响应式设计，你可以在你的CSS中添加媒体查询。要使用媒体查询，你必须在HTML的`<head>`中加入这行👇

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

 这允许你的页面检测你所使用设备的宽度。

 媒体查询的工作原理有点像Ruby中的`if`语句。基本上，**你可以定义只有当窗口小于给定宽度时才适用的CSS规则**。例如，如果你想要一个响应式容器，你可以这样构建：


```css
@media (max-width: 960px) {
  /* 对于屏幕小于960px的情况，这个CSS将被读取 */
  .container {
    width: 700px;
  }
}
@media (max-width: 720px) {
  /* 对于屏幕小于720px的情况，这个CSS将被读取 */
  .container {
    width: 500px;
  }
}
@media (max-width: 540px) {
  /* 对于屏幕小于540px的情况，这个CSS将被读取 */
  .container {
    width: 300px;
  }
}
```

试着调整窗口大小，了解媒体查询的工作原理。

### ⚠️⚠️ 要注意媒体查询（Media Queries）的顺序 ⚠️⚠️。

就像Ruby中的`if`语句一样，顺序很重要！如果几个条件都是`true`，那么只有最后一个CSS规则将被应用。
