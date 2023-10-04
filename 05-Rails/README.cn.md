At last, Rails!

## 第一周 - Rails 101

这个星期是Kitt上每日挑战的“最后一周”。从下周开始，你将开始从事更长的项目，要么是Airbnb克隆，要么是你自己的个人项目。现在我们将深入研究一下Rails应用程序的体系结构,尝试了解掌握着一部分。**我们将每天构建一个Rails应用程序**。

### `01 路由, 控制器 & 视图`

第一天我们会介绍`路由 > 控制器 > 视图`（routing > controller > view）的标准Rails流程，我们还无需考虑添加模型层和解释“params”。今天你会把第一周的ruby挑战转化为Rails应用程序。

### `02 模型与CRUD`

我们的老朋友“Active Record”又来了！**最重要的Rails课程之一。**你的导师将从头开始编写所有7个CRUD操作的代码，并介绍`resources`路由。注意！🤓

### `03 高级路由`

今天，你会在Rails应用程序添加第二个模型，创建一个拥有两个模型的Yelp克隆。应用里包括餐馆和评论模型。上午的讲座是关于**超越CRUD**，在Rails中使用高级路由和验证。

### `04 Rails Assets`

了解实现Bootstrap SASS的最佳设置，并使用Simple Form Bootstrap设置将`form_with`切换到`simple_form_for`。

了解asset pipeline。

你的练习是在两天内构建watch list应用程序。应用需要包含3个模型：`电影`，`书签`和`列表`(`Movie`, `Bookmark`, `List`)。
你必重视前端工作，做出一个好看的应用程序。

### `05 托管和图片上传`

今天上午的讲座分为两部分：
**托管**：部署在[Heroku](http://heroku.com/)

**图片上传**：我们将在[Cloudinary]上上传图片(http://cloudinary.com/)，使用[ActiveStorage](https://guides.rubyonrails.org/v6.0.1/active_storage_overview.html). 本课程还解释了如何使用[dotenv]保护API密钥(https://github.com/bkeepers/dotenv)gem。**请仔细听,避免在Github上泄漏你的银行信息。**

**测验时间**！你的最后一个测试！不要难过呦😢

我们后退一步，检查你是否掌握了Rails的所有核心概念。

## 第二周 - Airbnb

**AirBnB**! 第二周我们会在一个3到4人的团队开始工作。我们的目标是从头开始开发一个AirBnB的MVP。在5天内你可尽你所能建构你的克隆。

-星期三（下午5点）第一次演示
-**周五正式演示(下午5点）**

**本周下午5点没有live-code，**但上午9点还有很酷话题的讲座，所以早起吧！以下是将要介绍的内容的概述：

### `06 Devise`

2-早晨讲座的两部分：

- 使用[Devise]gem进行身份认证(https://github.com/plataformatec/devise)。
- 使用git和Github的协作技术。您将了解在开发团队中工作如何使用“branches”和“pull requests”。这个系统非常重要，接下来在你开发项目中你会每天遇到，所以要注意。

### 07 JavaScript 在 Rails 中
学习如何使用 Stimulus 和 `importmap` 在 Rails 中实现新的 JavaScript 功能，并使用第三方库。

### `08 地理编码`

上午的讲座是关于地理编码（使用`geocoder`gem）以及一些关于使用Google API在地址表单输入中添加自动完成功能的内容。

然后，下午5点，每个小组都要在班级里进行演示他们的Airbnb克隆版的最新版本。

### `09 搜索`

今天的讲座涵盖了搜索主题，从使用Active Record的search 101到ElasticSearch或Algolia等更强大的解决方案。

### `10 Pundit`

接下来，我们将教你如何在Rails应用程序中处理**授权**，并确保只有餐厅创建者才能更改或删除它！

### 项目准备 (周末)

你到现在所得的成就真的是很了不起-我们真的为你感到骄傲！

现在，到了大结局的时候了-你的项目。周末花点时间想想你的项目：

-写你的用户故事（不超过15个）。
-在纸上画出主要的几个视图。
-开始在[DB.lewagon.com]上构建数据库模式(http://db.lewagon.com).
-开始考虑你的路由。

如果你能完成大部分的工作，你将在周一节省大量的时间，并且能够急速开始你的项目。
