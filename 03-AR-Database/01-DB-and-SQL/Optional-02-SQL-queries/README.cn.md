## 背景与目标

现在是时候做一些更复杂的事情了。我们将使用`JOIN`查询，从多个表中读取数据。要想立即掌握`JOIN`查询的技巧，请[阅读这个](http://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins) - 图片真的很有帮助。如果你会说法语，你也可以[阅读这个](http://sql.sh/cours/jointures)。

## 详细说明

完成`join_queries.rb`中的代码。每个方法都需要一个`db`参数，它是一个`SQLite3::Database`的实例，你可以在该实例上调用`execute`方法。和前面的练习完全一样。

### 具体的曲目

- 实现`detailed_tracks`方法，以获得所有带有相应艺术家名称和专辑名称的曲目。
- 你的输出应该是一个数组的数列。**提示：**你将不得不使用两个`JOIN`sql语句。

这个方法应该返回一个曲目数组。这个数组的每个元素也将是一个数组：第一个元素是曲目标题，第二个元素是曲目专辑名称，第三个元素是曲目的艺术家名称。

### 统计

对于每一种类型的音乐，找到统计信息，即曲目数量和平均歌曲长度（分钟）。

该方法应该返回一个Hash的统计数据。

```ruby
stats_on(db, "Rock")
# =>  {
#      category: "Rock",
#      number_of_songs: 1297,
#      avg_length: 4.7
#     }
```

### 前5名

寻找在某一流派中制作歌曲最多的前5位艺术家。这个方法应该返回一个数组，其中包括该艺术家ID、艺术家名称和每个艺术家在给定类型中的歌曲数量。

```ruby
top_five_artists(db, 'Rock')
# => [
#       [ 22, 'Led Zeppelin', 114 ], # Led Zeppelin有114首摇滚歌曲。
#       [ 150, 'U2', 112 ]
#       # 等等。
#    ]
```
