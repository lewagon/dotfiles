## 背景和目标

在这个挑战中，你将使用[agify API](https://agify.io/)。这个API将让你可以根据你的名字预测你的年龄。

为了做到这一点，你需要实现一个`GET`请求发送到`agify API`，以便检索预测的年龄并在DOM中显示它。

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/your-age-from-your-name.gif)

## 详细参数

像往常一样，在终端中使用`serve`启动你的服务器，然后打开`localhost:8000`。

在`lib/index.js`文件中，在`displayAge()`函数中使用`fetch`实现对agify API的`GET`请求。捕获和存储`firstName`的逻辑已经写好了，所以你可以专注于ajax请求。

你应该使用以下url来请求API：

```
https://api.agify.io?name=THE_FIRST_NAME
```

例如，这个url将预测`michael`的年龄：

```
https://api.agify.io?name=michael
```

一旦请求完成，更新页面内容来显示年龄。结果应该放在`<p id="your-age">`中。尝试显示一条类似于“你30岁了”的句子。

请求愉快！
