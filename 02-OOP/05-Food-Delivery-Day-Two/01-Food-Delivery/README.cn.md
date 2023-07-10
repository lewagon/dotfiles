确保执行上述命令👆

**重要提示** 👇

复制上一个课题的代码：

```bash
cp -r ../../04-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # 尾随点很重要
```

然后，在开始之前，通过启动应用程序检查它是否仍然有效：

```bash
ruby app.rb
```

最后，你可以运行：

```bash
rake
```

现在继续使用你自己的代码，继续向路由添加特性/使 `rake` 拥有更多绿色。

让我们添加更多的功能

以下是我们应用程序的所有 **用户操作**：
[ ] 作为员工，我可以登录
[X] 作为一个经理，我可以再加一个餐meal
[X] 作为经理，我可以列出所有的餐meals
[X] 作为经理，我可以添加新顾客customer
[X] 作为经理，我可以列出所有的顾客customers
[ ] 作为经理，我可以添加新订单order
[ ] 作为经理，我可以列出所有未交付的订单orders
[ ] 作为一名骑手rider，我可以将我的一个订单order标记为已送达
[ ] 作为一名骑手rider，我列出了所有未送达的订单orders

因此，有两个新的组成部分：
- **雇员** **Employees**
- **订单** **Orders**

## 1 - `雇员 Employees`

### 1.1 - `雇员 Employee` 模型

我们餐厅有两种员工，**经理 manager** 和 **骑手 rider**。两者都有一个id、username和password，但根据角色roles的不同，它们拥有不同的权限。

编写一些代码来实现这一点，并在 `irb` 上进行崩溃测试。然后通过运行 `rake employee`来测试代码。

都是绿色的？很好！是时候 `git add`, `commit` 和 `push` 了。

### 1.2 - `雇员 Employee` 存储库

现在我们有了一个代表员工的模型，我们需要一个存储库来存储他们。

此存储库使用CSV文件路径初始化。它有一个 **只读** 逻辑，因为只有我们应用程序的管理员才能创建帐户（不需要`add`方法）。此存储库的界面允许：
- 从存储库拿到所有骑手riders
- 根据其id查找特定员工Employees
- 通过用户名username查找特定员工Employees

编写一些代码来实现这一点，并在 `irb` 中对存储库进行崩溃测试。你应该在 `data` 文件夹中创建自己的 `employees.csv` CSV文件。然后通过运行 `rake employee` 来测试代码。

都是绿色的？很好！是时候 `git add`, `commit` 和 `push` 了。

### 1.3 - `Session` controller

让我们在应用程序中实现 **登录login** 逻辑。

我们希望在路由中显示两个菜单：一个可以列出管理者manager的任务，另一个可以列出骑手rider的任务。我们还希望将把员工的选择匹配到控制器的相应操作。

为了解决这个问题，我们将引入**会话session**的概念。在路由级别，我们将在会话中存储登录的用户。

登录顺序如下：

```bash
> username?
paul
> password?
blablabla
Wrong credentials... Try again!
> username?
paul
> password?
secret
Welcome Paul!
```

登录后，你看到的菜单应该 **取决于你的角色role**。

编写一些代码来实现这个行为。

这部分没有rake。通过在终端中运行以下命令启动应用程序：

```bash
ruby app.rb
```

一切正常吗？很好！是时候 `git add`, `commit` 和 `push` 了。

## 2 - `订单Order`

### 2.1 - `订单Order`模型

我们的餐厅接受订单orders，所以我们需要一种方式来表示订单order是什么。

订单order是把一切联系在一起的东西。每个订单order都有一个id、一顿餐 meal、一个顾客customer、一个员工employee以及一个 `delivered` 布尔值来记录订单order是否已交付。

都是绿色的？很好！是时候 `git add`, `commit` 和 `push` 了。

### 2.2 - `订单Order` 存储库

现在我们有了一个表示订单orders的模型，我们需要一个存储库来存储它们。
此存储库使用CSV文件路径初始化。它从CSV文件读取/写入订单orders并将其存储在内存中。此存储库的界面允许：
- 向存储库添加新订单order
- 从存储库获取所有未送达的订单orders

因为一个订单order有一个 `餐meal`、一个 `顾客customer` 和一个 `员工employee` **实例**，我们还需要用一个餐meal储存库、一个顾客customer储存库和一个员工employee储存库初始化我们的订单order储存库。
编写一些代码来实现这一点，并在 `irb` 中对存储库进行崩溃测试。你应该在 `data` 文件夹中创建自己的 `orders.csv` CSV文件。然后通过运行 `rake order` 来测试代码。

**重要提示**：`rake` `order_repository` 测试 **只有在按照测试** 中相同的顺序定义`initialize`中的参数时才能正常运作：

```ruby
class OrderRepository
  def initialize(orders_csv_path, meal_repository, customer_repository, employee_repository)
    # [...]
  end

  # [...]
end
```

都是绿色的？很好！是时候 `git add`, `commit` 和 `push` 了。

### 2.3 - `订单Order` 控制器

让我们转到控制器controller。下面是我们要实现的 **用户操作**：

- 作为经理manager，我可以添加新订单order
- 作为经理manager，我可以列出所有未交货的订单orders
- 作为一名骑手rider，我可以将我的一个订单order标记为已交付
- 作为一名骑手rider，我列出了所有未送达的订单orders

请记住，控制器的角色是将工作委派给应用程序的其他组件（模型、存储库和视图）并进行协调！

首先编写 **伪代码**，将每个用户操作分解为基本步骤，并将每个步骤委托给一个组件（模型、存储库或视图）。然后编写代码来实现每个步骤。创建视图并逐步编写代码。

要测试你的控制器，请通过在 `app.rb` 中实例化它并将其传递给路由器，将它链接到你的应用程序。然后，你可以通过启动应用程序对代码进行崩溃测试：

```bash
ruby app.rb
```

`rake order` 也会帮助你完成所有这些步骤。跟着你的向导走！

在继续下一个功能之前，请确保你的四个用户操作正常。

**重要提示**：`rake`**运行的 `orders_controller` 测试只有在按照与测试** 相同的顺序定义 `#initialize` 中的参数时才能工作：

```ruby
class OrdersController
  def initialize(meal_repository, customer_repository, employee_repository, order_repository)
    # [...]
  end

  # [...]
end
```

**警告**：由于**id**不一定从1开始，也不一定是连续的，所以向用户索要**id**会是一个比较糟糕的用户体验。

假设我们有三道菜，分别有着id`1234`,`4242`和`987654`。我们**不想**显示：

```bash
1234 - pizza
4242 - burger
987654 - salad

Please choose an id:
>
```

取而代之的，我们可以使用**索引indexes**来优化用户体验：

```bash
1 - pizza
2 - burger
3 - salad

Please choose an index:
>
```

测试都是绿色的？很好！是时候 `git add`, `commit` 和 `push` 了。

## 3 - 选做部分

### 3.1 - 对订单orders执行 `编辑` 和 `删除` 操作

在我们的应用程序中，经理manager不能编辑或删除现有订单orders。

实现这些附加用户操作：

- 作为经理manager，我可以编辑现有订单orders
- 作为一个经理manager，我可以删除现有的订单orders

完成了？很好！是时候 `git add`, `commit` 和 `push` 了。

### 3.2 - 隐藏用户密码

目前，用户的密码直接存储在CSV中，任何人都可以看到。这是个好主意吗？我们能做些什么呢？

完成了？很好！是时候 `git add`, `commit` 和 `push` 了。

你完成送餐程序啦！
