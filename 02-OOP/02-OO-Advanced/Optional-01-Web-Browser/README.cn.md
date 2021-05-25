## 背景和目标

谷歌Chrome是现在太主流了。我们一起构建一个命令行中的浏览器代替它吧。概念是向用户请求一个URL，获取其内容，然后返回并打印回文本。

## 详细说明

让我们构建一个 `Browser` 类，当我们运行以下命令，我们可以在命令行中获得一个很好的交互式浏览器：

```bash
./lib/run.rb
```

研究一下我们在 `lib/run.rb` 提供给你的程序
去理解你的 `Browser` 类应该公开哪些方法。我们想 **只打印** 网页的文本，而不是像 `<h1>`、 `<p>`等额外的标记。

## 进一步建议

你可能需要使用 [OpenURI](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/open-uri/rdoc/OpenURI.html) 还有 [Nokogiri](http://www.rubydoc.info/github/sparklemotion/nokogiri)。要确保安装了这些gems，只需运行：

```bash
gem install nokogiri
```
