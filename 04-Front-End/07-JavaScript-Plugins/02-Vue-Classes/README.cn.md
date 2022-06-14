## 背景和目标

在训练营一开始的时候，在学习Ruby的章节里，我们曾用了一段时间学习了OOP的概念。（有人记得Cookbook嘛？）

但其实JavaScript也是一门面向对象编程语言，并从2015年（ES6）开始，它开始支持[Classes类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes).

在这个小挑战里，你将会被介绍到ES6里类的概念。

## 开始：JavaScript类

你可以用rake来运行这个小型Node练习的测试：

```bash
rake
```

你需要进行3项测试才能变成绿色。所有你需要知道的内容都在[这个MDN页面](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)。我们希望在`lib/user.js`文件里使用`User`类，里面有：

- 一个`firstName`实例变量
- 一个`lastName`实例变量
- 两个实例变量都会在`constructor`里被初始化
- 一个名为`fullName()`的实例方法来返回拼接姓和名的全名

这是大概就需要仅仅几行JS代码，想想你是如何在Ruby中进行面向对象编程的，这些概念在这里是完全一样的！
