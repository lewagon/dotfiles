## 背景和目标

正则表达式[RegExp]回归啦！(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 好消息是, 它们和你在第二周学习的表达式是完全一样的🙌

唯一不同的是在JavaScript中测试的内置方式（和Ruby比起来)。

## 详细说明

打开文件 `lib/valid_email.js`. 实现`valid`函数，使用一个`email`参数(属于字符串`String`类型)然后返回一个布尔值[`Boolean`]: 如果邮箱是正确的话返回`true`, 不是的话返回`false`。比如:

- `valid('boris.lewagon.org')` 应返回`false`
- `valid('boris@lewagon.org')` 应返回`true`

**首先** 你要找到一个能够通过所有测试的`RegExp`!

可以先打开文件 `spec/valid_email_spec.js`，在[rubular]上(http://rubular.com/) 复制粘贴`Your test string`中的测试邮箱。

**然后**, 你要想办法用`valid`函数测试这个正则表达式[`RegExp`],然后返回正确的布尔值！

可以多多用`rake`来检查。
