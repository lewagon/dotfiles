## 背景和目标

Before we move on to looking beyond CRUD, lets review some of the principles we saw yesterday when we looked at Models & CRUD.
在我们开始增删查改之前，我们先来看一些昨天学习模型Model和增删查改CRUD的时候遇到的基本原则
## Specs
先看一下`lib/quiz.rb`文件。你会看到一个有一些方法的小测验，来测试迄今为止你的rails知识。确保每一个方法都返回了正确的信息，通过这些测试。
Look at the `lib/quiz.rb` file. You will find a quiz with a few methods
to test your rails knowledge so far. Make sure each of the methods returns
the correct information to pass the quiz!
⚠️ Try and answer them before running `rake`.
⚠️ 在运行 `rake`命令之前，尝试回答这些问题。

### 问题 1
数组`Array`有4个元素，组成了`CRUD`的首字母缩写。修改该数组的每一个元素，你需要写出4个描述`CRUD`动作的动词。

The `Array` shown has the four letters that make up the `CRUD`
acronym. Update each element of the array so that you write out the
four verbs that describe the CRUD actions.

### 问题 2
返回一个字符串`String`，该字符串内容是你可以在终端运行的一条命令，这条命令会生成一个有两个字段name(`String`，数据类型是字符串) 和
stars(`Integer`，数据类型是整数)的`Restaurant`模型。
Return a `String` with the command you would run in the terminal to
generate a `Restaurant` model that has two fields: name(`String`) and
stars(`Integer`).

### 问题 3
修改数组`Array`，该数组的2个元素是运行模型生成器生成`Restaurant` 模型（来自上一题）之后创建的两个文件的路径。使用`YYYYMMDDHHMMSS`做为任意的时间戳。
Update the `Array` returned with the paths to the two files created
for you when run the model generator for a `Restaurant` model (from the
question above). Use `YYYYMMDDHHMMSS` for any timestamps.

### 问题 4
我们要把7个增删查改`CRUD`的路由熟记于心。但是我们不想在路由配置文件里把它们全写出来。
返回一个字符串`String`，该字符串内容是我们需要添加到`config/routes.rb`文件里的一行代码，给`Restaurant`模型添加所有的7个增删查改`CRUD`路由。
There are seven `CRUD` routes that we need to know by heart. But
we don't want to write all of them in our routes. Return a `String` with
the single line we would add in `config/routes.rb` to add all seven CRUD
routes for our `Restaurant` model.

### 问题 5
如果我们有7个增删查改`CRUD`的路由，我们也需要在控制器`RestaurantsController`里有7个实例方法。
返回一个数组`Array`，数组元素是与7个增删查改`CRUD`的路由相对应的动作。
If we have all seven CRUD routes, we will also need seven instance
methods in our `RestaurantsController`. Return an `Array` with the seven
controller actions that go along with the CRUD routes.


## 学习点

- 学会增删查改`CRUD`路由的基础知识
- Know the basics of CRUD routing
- 如何在应用里生成模型model？
- How do we generate new models in our application?
