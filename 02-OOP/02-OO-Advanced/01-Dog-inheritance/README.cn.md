## 背景与目标

继承机制是面向对象编程语言的一個核心概念，它允许我们通过定义继承自超类（父类）的子类（子类）来“转移”方法，子类对象會继承父类对象中已经定义好的方法。

记住，我们告诉子类从父类继承的方式是这样的：

```ruby
class ChildClass < ParentClass
end
```

## 规格

#### 狗继承机制

- 我们创建了一个 `Dog` 类 ，及一个实例方法： `bark`。
- 我们在一个新文件里创建一个 `GermanShepherd` 类。
- 更改`GermanShepherd` 类的定义，使其具有 `Dog` 类的实例方法和行为。不要忘记用`require_relative`引入正确的文件。
- 例如，以下的代码应该有用：

```ruby
german_shepherd = GermanShepherd.new
p german_shepherd.bark # => "woof woof"
```

注意：不要在 `GermanShepherd` 类的主体中添加任何代码！

## 学习要点

- 当我们希望一个类从另一个类继承时，语法是什么？
