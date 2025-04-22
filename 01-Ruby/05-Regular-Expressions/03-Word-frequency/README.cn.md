## 背景与目标

- 处理文本文件
- 用哈希（Hash）建立一个文本分析器

#### 用Ruby读取文件

你可以通过运行下面的语句，逐行读取一个文件：

```ruby
File.open("my/file/path", "r").each_line do |line|
  # Do something with the line variable
end
```
## 详细说明

- 完成`most_common_words`方法，它返回一个文本文件中出现频率最高的词的出现次数。例如，如果我们用圣经作为源文本：

```ruby
most_common_words('source-text.txt', 'stop_words.txt', 3)
#=> { 'lord' => 8722, 'God' => 7380, 'Jesus' => 2617 }
```

注意：请忽略标点符号（例如：`Seb's`在你的最终的单词出现次数的计数中应被计为`Seb`）。

### 摆脱噪音

在你的方法中增加一个过滤器，摆脱掉[停用词（stop word）](http://en.wikipedia.org/wiki/Stop_words) (需要VPN 🛡 )例如"a"，"the"，"is"等等。我们已经给了你一个文本文件"stop_words.txt"包含英文停用词。你应该在你的程序中使用这个文件。

### 玩点创意

在源文件中复制/粘贴任何你想要的文本，来尝试一下你的程序（政治演讲，书摘，你最爱的歌曲，等等）


