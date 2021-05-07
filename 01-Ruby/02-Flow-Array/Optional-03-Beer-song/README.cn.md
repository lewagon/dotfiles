## 详细说明

编写一个程序打印出[99 Bottles of Beer](https://lyricsplayground.com/alpha/songs/numbers/99bottlesofbeeronthewall.html )这首歌的歌词。

它将以开始的瓶子数量作为参数，在程序执行时给出一个命令行。这个程序应该这种方式运行：

```bash
ruby lib/beer_song.rb 5

5 bottles of beer on the wall, 5 bottles of beer!
Take one down, pass it around, 4 bottles of beer on the wall!
4 bottles of beer on the wall, 4 bottles of beer!
Take one down, pass it around, 3 bottles of beer on the wall!
3 bottles of beer on the wall, 3 bottles of beer!
Take one down, pass it around, 2 bottles of beer on the wall!
2 bottles of beer on the wall, 2 bottles of beer!
Take one down, pass it around, 1 bottle of beer on the wall!
1 bottle of beer on the wall, 1 bottle of beer!
Take one down, pass it around, no more bottles of beer on the wall!
```

### 提示

* 你可以使用[ARGV](http://ruby.about.com/od/rubyfeatures/a/argv.htm)从命令行向你的程序传递参数。
* 希望你注意到当只剩余一瓶时，从bottl<strong>es</strong> 到 bottl<strong>e</strong> 的变化。

### 一点关于ARVG的背景

你编写的任何Ruby程序都运行在另一个软件中：Ruby解释器。这个解释器自己也运行在另一个软件中：你的操作系统。这些软件层被称为环境，有很多种方式可以让你在环境和你的程序之间交换数据。

其中一种方式时通过每个Ruby预先定义的ARVG常量。它是一个代表命令行参数的字符串数组。考虑这个简单程序

**testing_argv.rb**

```ruby
puts "*** Command line arguments ***"
p ARGV
```

现在请在终端中以这种方式运行它：

```bash
ruby testing_argv.rb un deux trois

*** Command line arguments ***
["un", "deux", "trois"]
```

```bash
ruby testing_argv.rb "un et deux" trois

*** Command line arguments ***
["un et deux", "trois"]
```




