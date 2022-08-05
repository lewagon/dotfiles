## Airbnb周

接下来的几天，你将和你的项目组一起做Airbnb克隆版（你不必出租**公寓**，可以任意发挥你的创意！）

### 演示

你将演示你的作品（在Heroku上，不是在`localhost`上演示！）在**地理编码**和**AJAX in Rails**课上期间。在最后期限前完成很重要！

### 第一部分

在创建Rails应用程序并进入第二部分之前，请完成以下步骤，并在刚上课时让老师验证下。相信我们，这样做可以节省很多时间。

#### 1 - 用户故事

复制这个[表格](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (需要VPN 🛡) (每组1份) 并邀请你的队友合作。

![复制](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/duplicate.png)
![重命名](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/rename.png)

先想想演示中你们将展示的 **用户旅程**。像Airbnb这样的产品有很多可能的使用案例，但要尽量把它们缩小到产品所需的最小化的可行用户旅程。

<details><summary markdown='span'>View solution
</summary>

- 一个用户旅程让用户创建订单。
- 一个用户旅程让用户预订订单。
- 一个用户旅程让业主接受或拒绝预订请求。

</details>

每个用户旅程包含几个**用户故事**：用正确的术语将它们写在表格中。完成后，写一个新的ticket，找老师验证一下。

你可以用纸和笔快速画出不同屏幕的草图和它们所包含的大致的元素。这可以帮你可视化你的用户旅程。小心，在这一点上不需要太具体！这是冲刺阶段，你需要明智地分配你的时间和资源。

#### 2 - 数据库模式

使用[我们的数据库工具](https://kitt.lewagon.com/db/new)画出数据库模式 然后 **写一个ticket来找老师验证**. 仅仅画出你的应用程序需要的最小化可行。使用正确的编程规范（表格列要用复数名称...等等 - 参见db的课程).

#### 3 - 路线

回到你的用户故事表格并添加以下信息：
- 路线: 动词 + 路径
- 行动
- 控制器

创建一个新的ticket，找老师验证。一切都正确？`rails new` 的时间到了!

### 第二部分

在团队分配任务之前，你们先一起完成项目设定。**开发主管** (并且只有她/他) 应该:

#### 1. 使用Postgres配置创建Rails项目

使用Le Wagon的极简模板，这个模板已经有不错的前端设置：

```bash
cd ~/code/<user.github_nickname>
rails new \
  -d postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/vue/minimal.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
```

再一次说明, 只有 **开发主管** 一个人做这个! 不是团队里的所有人...

#### 2. 把项目上传到Github

```bash
cd rails-airbnb-clone
gh repo create --public --source=.
git push origin master
```

#### 3. 把你的队友作为合作者添加到Github仓库(repo)

前往[你的 Github repo 设定](https://github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration) 并把你的队友加为仓库的**合作者**。

其他队友可以**克隆** 项目. ⚠️**小心, 要使用 `SSH` url**⚠️

然后, 队友可以运行:

```bash
bundle install
rails db:create db:migrate
```

#### 4.在Heroku上部署

即使它只是一个框架程序，**从第一天开始**就在Heroku上部署也是很重要的，然后每天不断地部署每一个新功能。

```bash
heroku create airbnb-<user.lower_github_nickname> --region=REPLACE_WITH_REGION # (eu, us, or any region available in `heroku regions` list)
git push heroku master
heroku run rails db:migrate
```

从这里开始你可以开始拆分任务 **花点时间在安装上，因为如果你一开始就做对了，一切都会变得简单。**

### 一些关于项目管理的指南

#### 开始

当你试图在团队中分配工作时，你会意识到许多任务依赖于其他任务...
如果没有 `User` 模型，如何整合facebook connect？如果没有 `Flat` 模型，如何实现预订？以下是一些帮助你组织工作的指南：

你需要始终从应用程序中的**核心模型**开始，所有未来功能都会依赖于这些模型。在Airbnb的例子中，它们显然是 `User` 和 `Flat`. 一旦整合了这些模型，就可以更容易地对其余的功能进行任务分配。因此在启动阶段，你可以将两个主要任务分开：

**第1组-模型启动**:
- 用Devise登录/注册来整合 `User`。
- 用列表(`index`)和创建(`new/create`) 来整合 `Flat`。

**第2组-前端启动**:
- 使用导航栏/页脚打造干净的布局
- 建立一个简单，有吸引力的主页。

当两个组都完成了（每个组需要大概2个小时），并且在Github上完成了所有的合并工作，你可以继续为剩余的功能拆分任务了。

#### 任务组织

以下是要在Airbnb项目上实现的不同用户情景的列表：

- 作为一个用户，我可以从导航栏在网站上导航（带有功能链接，例如“登录/登出”、“我的预订”、“发布公寓”等）
- 作为一个用户，我可以查看公寓的页面
- 作为一个用户，我可以预订公寓
- 作为一个用户，我可以为我的公寓添加图片
- 作为一个用户，我可以为我住过的公寓添加评论
- 作为一个用户，我可以在地图上找到公寓
- 作为一个用户，我用Facebook账号登录
- 作为一个用户，当有人预订我的公寓时，我可以收到一封电子邮件
- ...

**其中一些功能比其他功能更重要**。你需要优先考虑它们，这样可以在周末前完成MVP！

#### 功能示例：预订公寓

当你在写一个功能时，**从数据库到HTML/CSS都要很认真**. 以“预订”功能为例：

*模型*
- 我会创建一个 `Booking` 模型和与其相关的迁移。
- 然后我会编写一个包含关联和验证的模型。
- 然后，我将从 `rails console` 对我的模型进行崩溃测试，确保模型中的所有都正常。

*路线*:
- 我会在 `routes.rb` 添加预订路线。

*控制器*:
- 我会创建一个新的 `BookingsController`，用 `create` 和 `index` 动作.
- 我会实施这两项动作。

*视图修改*:
- 我会把预订表嵌入现有的 `views/flats/show.html.erb`
- 我会在一个新页面 `views/bookings/index.html.erb`上列出当前用户的所有预订。

*链接*:
- 我会在导航栏中添加一个指向 `bookings#index`页面的链接。

*HTML/CSS*:
- 我的预订表是简洁干净的，输入部分和按钮有正确的Bootstrap类。
- 我的新预订页面是一个干净的 `container` 来把内容放于中央, 明确的标题, 每个预订都有干净的设计.
- 如果我的HTML代码太长且难以阅读，我会花时间用片段重构我的HTML。

**从模型到视图，完美地编码**

- 在rails控制台中对所有模型关联和验证进行崩溃测试。
- 不要忽视视图。如果你添加了一个表单，请使它成为一个漂亮的、居中的、有响应的Bootstrap表单。如果你编写了一个公寓列表，那就构建一个好的Bootstrap网格（例如，左边是公寓图片，右边是公寓信息……）。
- 用片段（partials）重构你的HTML，使它更具可读性并且容易维护。
