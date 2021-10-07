## 背景和目标

- 理解类方法和实例方法之间的区别。

在使用gem或标准库的模块时，必须使用直接在类 **上而不是在类实例上** 调用的类方法。考虑IRB中的以下行：

```ruby
"this is a string object".upcase
["this", "is", "an", "array", "object"].shuffle
Time.now
a_time_object = Time.now
a_time_object.hour
```

你能找到一种不同于其他方法的方法吗？一定要找到入侵者！

## 详细说明
- 创建一个带有两个实例变量 `@city` 和 `@name` 的 `Restaurant` 类，并在 `initialize` 中设置这两个参数。
- 定义一个实例方法 `#rate(new_rate)` 以实现对餐厅对象的评级。每次调用新的评级时，此方法都应重新计算餐厅平均评级 `@average_rating` 。 `@average_rating` 应该可以被外部世界访问。
- 定义一个 **类** 方法 `.filter_by_city（restaurants，city）` 返回已定义城市中的所有餐馆（此返回应该存一系列餐馆对象的数组）。例如：

```ruby
jules_verne = Restaurant.new("paris", "Jules Verne")
bluebird = Restaurant.new("london", "Bluebird")
daniel = Restaurant.new("new york", "Daniel")
restaurants = [jules_verne, bluebird, daniel]
Restaurant.filter_by_city(restaurants, "london") # => [ #<Restaurant:0x007f9a43bb7eb8 @city="london", @name="Bluebird"> ]
```

## 学习要点

你能回答下列问题吗(如有必要，可参阅文档）

- 在 `#rate` 和 `.filter_by_city` 中, 哪一个是实例方法？哪一个是类方法？
- 请看下面的列表。分别哪个是哪个？

```ruby
Date.today
Twitter::REST::Client#follow (请参阅 https://github.com/sferik/twitter)
String#upcase
Nokogiri::HTML::Document.parse #(请参阅 http://www.rubydoc.info/gems/nokogiri/Nokogiri/XML/Document)
Array#shuffle
```

- **选做部分:** 查看 `new` 和 `initialize` 方法, 哪一个是实例方法？ 哪一个是类方法？ 他们之间有什么关系？是哪一个在调用另一个方法？


