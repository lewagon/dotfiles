## 背景和目标

这个挑战是前一个挑战的延伸：农场欢迎第一批动物！

## 详细说明
这个农场有两种动物：牛和鸡。

![动物](https://web-dev-challenge-lewagon-image.oss-cn-shanghai.aliyuncs.com/animals.svg)

与你的伙伴讨论：需要建多少个类，和如何构造它们？

不要 `rake`! 等到挑战的最后，遵循农业日记指导你去编写课程代码！

### 父母和子女
我们现在已经熟悉了继承的好处，让我们继续：
- 创建三个空类
- 在两个子类和父类之间设置适当的继承关系

与上一个挑战不同，让我们从编写父类中的常见行为开始！

- 动物被初始化为 **name** 和 0 **energy**
- 你可以 **feed** 一只动物：它的 **energy** 会增加 1


### 牛
要理解 `Cow` 类，让我们从编写要运行的 **程序** 开始。
-打开 `lib/farming_diary.rb` 接口并创建一个新的 `Cow` 实例
-调用方法 `feed!` 和 `talk` 在你的牛身上（即使方法还没有编码）
-运行文件 `ruby lib/farming_diary.rb` 并通过编码 `Cow` 类一次解决一条错误消息

以下是你需要了解的关于牛的信息：

- 每次你给牛喂奶，除了获得 energy 外，它们还会产出 2 升 **milk**
- 牛 `talk` 的时候会说 "moo"

以下是农业日记牛日的一个例子：

```bash
📝 Day Four: Cow
Marguerite produced 2 liters of milk
Marguerite says moo
```

### 鸡
让我们继续我们农事日记的第五天。
- 创建两只鸡的实例，一只公鸡和一只母鸡
- 用适当的代码填写 TODOs

以下是你需要了解的关于鸡的知识：

- 鸡有 **gender**
- 当你 **feed** 鸡时，除了获得能量外，雌性会产生两个 **eggs** 雄性则没有）🤷‍♂️)
- 鸡会说话：雄性说 "cock-a-doodle-doo" ，雌性说 "cha-caw"

以下例子是农场日记中的记录鸡的一天：

```bash
📝 Day Five: Chicken
Bob produced 0 eggs and says cock-a-doodle-doo
Alice produced 2 eggs and says chack-caw
```

## 要点

恭喜你！现在可以运行 `rake` 来检查代码是否组织得合适。

在子类，有四种方法：
- 从父类 **继承** 的方法： 该方法仅在父类中定义
- **扩展** 父方法定义的方法： 子类中的方法略有不同
- **重写** 父方法的方法：定义与父类中的定义完全不同
- 特定于子类的方法：它们 _完全_ 不在父类中定义

從父方扩展一个方法需要 `super` 关键字： 它的作用就像从父方法复制了主体并将其粘贴到调用 `super` 的地方。

