## 背景和目标

在我们开始观影清单Watch list练习之前，我们先来看一些昨天学习高级路由的时候遇到的基本原则。

## 详细说明

先看一下`lib/quiz.rb`文件。你会看到一个有一些方法的小测验，来测试迄今为止你的rails知识。确保每一个方法都返回了正确的信息，并通过了这些测试！

⚠️ 在运行 `rake`命令之前，尝试回答这些问题。

### 问题 1

实现与 `resources：restaurants` 生成的7条CRUD路线相对应的7条常规路线。

提示: 路由遵循这样的模式：`verb "url", to: "controller#action"`

### 问题 2
返回`true` 或者 `false`来回答下面这个问题：

如果你的模型之间有一对多关系，就像`Restaurant` 和 `Review` (belongs_to :restaurant)，是否总是需要把所有`Review`的路由都嵌套进`Restaurant`里面？

### 问题 3

返回一个字符串`String`，内容是Active Record验证（validation），用来确保在没有`name`的情况下不能创建数据库记录。

## 关键学习要点

- 理解在路由里面`resources` 做了什么？
- 理解多对多关系和嵌套路由。
- 如何给我们的模型添加验证来避免数据库出现问题。
