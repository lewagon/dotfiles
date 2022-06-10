## 背景与目标

- 使用标准库的软件包
- 操作CSV文件输入

为了读取CSV文件并提取其中的数据，你可以使用Ruby标准库中的`csv`软件包。
作为示例提供的CSV`lib/movies.csv`是摘自[IMDB](http://www.imdb.com/boxoffice/alltimegross)。

#### Ruby标准库

Ruby标准库包含了Ruby安装时随附的所有便捷软件包。例如，[date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html)软件包，如果你的Ruby程序拥有它 ，就可以轻松地处理日期。要使用这个软件包，你只需要在你的Ruby文件的开头加载软件包：

```ruby
require "date"
```

还有很多有用的软件包，所以请务必阅读一下！

## 详细说明

- 完成`#most_successful`方法，返回给定年份之前发行的`number`部（`number`是一个参数）电影，以及相应的票房。
- **约束条件**： 返回的列表应该是电影的数组。每个电影应该由一个哈希代表，`name`,`year`以及`earnings`作为键。例如`{ name: "Avatar", year: 2009, earnings: 760505847 }`。

## 进一步建议 & 资源

- 确保你在读取CSV时，指定了正确的`编码（encoding）`选项。
请记住，有些标题是法语，含有特殊字符 😉
