## 背景和目标

这个挑战是前一个挑战的延伸：农场欢迎第一批动物！

## 详细说明
![动物](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/animals.svg)

与你的伙伴讨论：需要建多少个类，和如何构造它们？

不要 `rake`! 等到挑战的最后，遵循农业日记指导你去编写课程代码！

### 父母和子女
我们现在已经熟悉了继承的好处，让我们继续：
- 创建三个空类
- 在子类和父类之间设置适当的继承关系

与上一个挑战不同，让我们从编写父类中的常见行为开始！
- 动物被初始化为 0 **energy**
- 你可以 **feed** 一只动物：它的 **energy** 会增加 1


### 动物对话
要理解我们的类，让我们从编写要运行的 **程序** 开始。
-打开 `lib/farming_diary.rb` 接口并看一下`Day Three`为了收集信息怎么创建我们的类
-运行文件 `ruby lib/farming_diary.rb` 并通过编码 `Cow` 和 `Chicken` 类一次解决一条错误消息

预期产量：

```bash
📝 Day Three: Animals Talk
The cow says moo
The female chicken says cluck cluck
The male chicken says cock-a-doodle-doo
```

### 喂动物
让我们继续进行第四天，用迭代(iteration)一次喂饱所有动物. 记住你的动物有一个共同的 `feed!` 方法? 你可以在两个不同类型的对象上调用相同的方法！这个概念叫做[多态性](https://thoughtbot.com/blog/back-to-basics-polymorphism-and-ruby) 🤓

以下是你需要了解的关于`feed!`的知识：

- `Cow`: 牛除了获得能量外，还生产2升`@milk`
- `Chicken`: 除了获得能量以外，雌性还产生2个`@eggs`（雄性不产生eggs🤷‍♂️）

**提示**：子类方法**扩展**父类方法。别忘记使用`super`来叫父类方法！

预期产量：

```bash
📝 Day Four: Feed The Animals
The cow produced 2 liters of milk
The female chicken produced 2 eggs
The male chicken produced 0 eggs
```

## 要点

恭喜你！现在可以运行 `rake` 来检查代码是否组织得合适。

在子类，有四种方法：
- 从父类 **继承** 的方法： 该方法仅在父类中定义
- **扩展** 父方法定义的方法： 子类中的方法略有不同
- **重写** 父方法的方法：定义与父类中的定义完全不同
- 特定于子类的方法：它们 _完全_ 不在父类中定义

从父方扩展一个方法需要 `super` 关键字： 它的作用就像从父方法复制了主体并将其粘贴到调用 `super` 的地方。

