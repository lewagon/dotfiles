## 背景与目标

这个挑战的目标是构建包含两个模型的 Rails API  (比如 `Story` 和 `Comment`).
这类似于你在Rails那周创建的[Yelp MVP](https://kitt.lewagon.com/camps/194/challenges?path=05-Rails/03-Rails-story-Comments/02-Yelp-MVP)



## Rails应用程序生成

这里没有 `rake` , 不要在 `fullstack-challenges` 中创建你的Rails应用程序⛔

你将使用极简的模板。以下是你需要的设置:

```bash
cd ~/code/<user.github_nickname>
rails new \
  --database postgresql \
  --skip-action-mailbox \
  stories-api
cd stories-api
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

在开始编写应用程序之前，先确保你已完成微信前端课程的微信小程序，其中包含[那天的挑战](https://kitt.lewagon.com/camps/236/challenges?path=04-Front-End/09-WX-MP-Frontend/01-WX-MP-Frontend-01)中指定的所有用户故事。这就是你将要为它制作API的前端应用程序。

## 详细说明

### 1 - 模型

通过正确的rails生成器生成 `Story` 模型。它应该有以下表格列。随时添加更多，只要你的前端应用程序需要！😊

- `name`, 作为 `string`类型
- `text`, 作为 `string`类型

生成 `Comment` 模型 (注释只是访问者注释) -包含以下表格列 .

- `name`, 作为注释者名字的 `string`
- `content`, 作为 `string`
- `story`, 作为 `references` 链接到注释所针对的故事

别忘了添加 `has_many` 在代码和数据库中将模型链接在一起。有一些验证也不错！

### 2 - 种子

让我们在 `rails console` 中创建一些故事，或者更好，让我们为我们的应用程序构建一个小的种子。
这将帮助我们开始设计要在前端应用程序中显示的api端点，虽然我们实际上还不能通过前端添加注释。

在 `db/seeds.rb` 文件, 让我们创建一些带有注释的故事。

提示：使用[Faker](https://github.com/stympy/faker/) gem 来让你的数据更辣一点 🌶️🌶️🌶️  比方说:

```ruby
Faker::TvShows::GameOfThrones.character #=> "Tyrion Lannister"

Faker::TvShows::GameOfThrones.quote #=> "Never forget who you are. The rest of the world won't. Wear it like an armor and it can never be used against you."
```

### 3 - 控制器和路线

我们可以从在 `config/routes.rb` 中添加所有CRUD路线开始，但是我们需要它们全部吗？使用有API的CRUD需要哪四个操作 (提示：不需要为 `EDIT` 或 `NEW` 发送表单, 查看其余步骤来获取所有操作。)

使用rails生成器或手动创建具有四个API操作的 `StoriesController`。

正确命名api端点：  例如: `/api/v1/stories` - 有一个简单的路由命令用于命名。 你还可以用它来指定请求的格式(html 或 json)。

因为我们将使用stories端点提供注释，所以不需要 `CommentsController` 。

### 4 - 故事索引页

让我们在 `StoriesController` 添加正确的操作 (提示: 它是 `index` 😉). 控制器中的操作应该获取我们数据库中的所有故事 (我们可以用 Active Record!) 并传入json视图:

```ruby
# app/views/api/v1/stories/index.json.jbuilder
json.stories do
  #Use jbuilder functions to show story data in an json array
end
```

提示：通过显示第一个故事以及端点所需的字段了解jbuilder(e.g. 没有 `created_at`)。在那之后，试着用一个数组显示所有的故事。

我们还要更新前端应用程序的视图( `index.js` ），来调用api获取动态数据：

```js
wx.request({
  url: YOUR_API_ROUTE,
  method: AN_HTTP_VERB(like GET, POST, PUT, DELETE),
  success(res) {
    // what to do with the API data
    // 1. save it to a local variable
    // 2. set page's data with that local variable
  }
})
```


### 5 - 故事展示页

是时候添加正确的操作来显示一个给定故事的所有信息了。我们怎么知道用户想看什么故事？

注释和故事的数据会一起被包括在内：

```ruby
# app/views/api/v1/stories/show.json.jbuilder
json.extract! @story #... the story data
json.comments @story.comments do |comment|
   #... the comment data
end
```

如果你要显示注释的时间，请不要忘记使用 `strftime` 来格式化时间戳（timestamp)。

我们也把前端应用程序的视图(`show.js`) 更新一下，这样可以调用api获取动态数据。

### 6 - 故事创建页面

记住，要在API中创建一个故事，我们只需要一个路线。我们不需要一个新的路线来显示新的故事表达，而是只需要一个新的路线来处理提交表单时生成的 `POST` 请求。

我们也把前端应用程序的视图 (`create.js`) 更新一下，以调用api来发送用户生成的数据。什么HTTP动词适合用于创建数据(获取/GET、发布/POST、放置/PUT 或 删除/DELETE)？


### 7 - 故事编辑页

我们还可以添加编辑故事的功能，以及在创建故事后删掉打错的字。我们将前端的 `create.wxml` 窗体重构为部分的 `form.wxml` ，然后在 `new.wxml` 中使用如何呢？

别忘了用新的编辑故事按钮更新 `show.wxml` 和 `show.js` ！

### 8 - 故事删除功能

我们还可以添加从应用程序中删除故事的功能。我们如何创建一个按钮来销毁一个资源，它将在控制器中执行什么操作和动词？

同样，我们也要更新显示视图来放入这个销毁按钮。

### 9 - 添加注释（选做部分）

让我们添加一个API端点来从故事控制器创建注释（将注释的故事存储为端点所属的故事）。让我们用一个按钮更新我们的显示页面，允许用户添加一个注释，以及在注释旁边显示他/她的名字和图片。我们还可以在前端添加新页面来加一个窗体，使用这个创建注释端点。

至于如何设计你的路线，可以考虑使用嵌套路线来指定新的注释所属的故事。

### 10 - 过滤故事（选做部分）

让我们尝试添加一个搜索栏，这样能够过滤索引中的故事，找到完美的故事！

- 我们怎样可以找到用户正在搜索的内容？
- 我们可以使用什么Active Record方法来构建一个简单的搜索引擎？你可以从这里开始 `@stories = Story.where("name LIKE '%garden%'")`, 在继续之前，先确认自己理解这行代码。
- 我们怎样确保索引页依然像传统索引一样工作，即使用户没有搜索任何内容？
- 当用户搜索时，我们怎样确保输入栏中预先填写了搜索语句？
