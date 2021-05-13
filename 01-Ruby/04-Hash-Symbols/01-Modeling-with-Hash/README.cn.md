## 在你开始之前

别忘了，下午2点你将参加你的第一个小测验。没有电脑，没有谷歌，只有一支笔和你的大脑。这不是一场考试，你不会得到分数，所以不要担心😊, 但它是非常有用的，能够帮你找出自己可能正在挣扎的领域，在我们走得更远之前，先熨平你的折痕。花点时间，试着尽可能准确地回答每个问题。

当测验结束，老师将带每个人进行一个15分钟的回顾，仔细检查你的答案并试着讲清楚任何你不明白的问题。这将帮助你了解这个周末应该复习什么，以及你是否应该参加下周一到周二的复习小组。

祝你好运！测验愉快！

## 背景与目标

假设你想保持健康但却总是吃麦当劳...你有一个绝妙的主意，写一个快捷的方法（method）来计算麦当劳订单的卡路里数量。让我们用下面的表格作为精简版麦当劳菜单：

<table class="table">
  <thead>
    <tr>
      <th>Item</th>
      <th>Calories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hamburger</td>
      <td>250</td>
    </tr>
    <tr>
      <td>Cheese Burger</td>
      <td>300</td>
    </tr>
    <tr>
      <td>Big Mac</td>
      <td>540</td>
    </tr>
    <tr>
      <td>McChicken</td>
      <td>350</td>
    </tr>
    <tr>
      <td>French Fries</td>
      <td>230</td>
    </tr>
    <tr>
      <td>Salad</td>
      <td>15</td>
    </tr>
    <tr>
      <td>Coca Cola</td>
      <td>150</td>
    </tr>
    <tr>
      <td>Sprite</td>
      <td>150</td>
    </tr>
  </tbody>
</table>

这些信息需要存储于一个ruby[常量(constant)](http://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Variables_and_Constants#Constants) 以此模仿数据库。
例如，下面是一个`Hash`的例子 - `AGE_OF_STUDENTS`包含学生和他们的年龄：

```ruby
AGE_OF_STUDENTS = {
  "Peter" => 21,
  "George" => 22,
  "Mary" => 20
}
```

阅读有关[哈希（Hashes）](https://ruby-doc.org/core-2.6.6/Hash.html)的文档。
你将总是会用到它们，所以和它们交个朋友吧 😊

**在这个练习中，为了简单起见，使用`字符串（Strings）`而不是`符号（Symbols）`作为你的键**

## 详细说明

- 创建一个`poor_calories_counter` 方法，它返回你订单中的三样食物的总卡路里数量。
- **约束条件**： 你的方法应该利用一个哈希（当然啦！）
- **约束条件**： 你的方法必须使用**我们给定的卡路里值**

例如`poor_calories_counter("McChicken", "French Fries", "Sprite")`应该返回`730`。

## 关键学习要点

- 什么是哈希（hash）？你在什么时候使用它们？
- 你怎样提取存储在一个哈希中的值？
