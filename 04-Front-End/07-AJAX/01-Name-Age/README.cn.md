## 背景与目标

在这个挑战中，你将与[自由词典API](https://dictionaryapi.dev/)互动。这个API将允许你获取特定单词的定义。

为了做到这一点，你将需要实现一个`GET`请求到API，以便检索这个单词的定义并在DOM中显示出来。

## 规格

像往常一样，在终端中使用`serve`启动你的服务器，然后访问`localhost:8000`。

在`lib/index.js`文件中，使用`fetch`在`displayDefinition()`函数中实现对API的`GET`请求。捕捉和存储`word`的逻辑已经实现，所以你可以专注于AJAX请求。

你应该使用以下URL向API发起请求：

%%%
https://api.dictionaryapi.dev/api/v2/entries/zh/单词
%%%

例如，这个URL将为词语“猫”获取定义：

%%%
https://api.dictionaryapi.dev/api/v2/entries/zh/cat
%%%

这个API将为你提供许多不同的词语定义。不用担心，你的目标是**只显示第一个定义**。为了找到这个定义，你需要仔细关注API返回数据的结构 🤔 什么是`数组`；什么是`对象`；什么是键和值？

一旦请求完成，更新页面内容以显示这个定义。结果应该显示在`<p id="definition">`中。

祝你定义愉快！
