## 背景与目标

- 熟悉解析JSON格式
- 学习如何将你的程序的职责划分成几个子方法（sub-methods）

## 详细说明

如果你看法国电视，可能会偶然发现[_Des chiffres et des lettres_](https://en.wikipedia.org/wiki/Des_chiffres_et_des_lettres) (需要VPN 🛡 )。对于英语的学习者，你可能更熟悉[_Countdown_](https://www.youtube.com/watch?v=GvV8aVEJmiU) (需要VPN 🛡 )!

这个挑战的目标是，在终端中编写一个简化版的该游戏：

- 你会得到一组随机字母。
- 你将输入你所能找到的最长的英文单词，仅使用网格中给定的字母。
- 当你输入你的答案，你将得到你的分数以及你所用的时间，以及如果你最终失败了，将得到一个报错信息。

当你运行`ruby lib/interface.rb`时，它应该这样运作：

```bash
********* Welcome to the longest word-game! *********
Here is your grid:
Q F M R K L I T P
*****************************************************
What is your longest word?
lift
******** Now your results ********
Your word: lift
Time Taken to answer: 12.07916
Your score: 3.194722666666667
Message: Well Done!
```

这个挑战将里，你将访问web-API，并解析这个API返回的JSON数据！

**约束条件**：

- 你将使用Wagon Dictionary API。让我们看看，当我们提交一个[正确的英文单词](https://wagon-dictionary.herokuapp.com/apple) 和一个[错误的单词](https://wagon-dictionary.herokuapp.com/zzzz)时，我们会从API中得到什么信息。注意URL的结构。
- 你的字母网格必须是随机。有可能会出现相同的字母。
- 一定要验证**1）**你的单词确实是一个英文单词，以及**2）**你的单词中的每个字母都出现在字母网格中（记住，每个字母只能使用一次）。
- 如果该单词无效或者不在网格中，得分将为0（并附上一条消息，告诉玩家他们为什么没有得分）。
- 分数取决于得出答案所用的时间，加上你所提交单词的长度。单词越长并且花的时间越短，得分越高！也可以随意创造你自己的惩罚规则！

## 关键学习要点

- 什么是JSON？它和Ruby哈希（hash）的数据结构有什么相似之处？
- 如何重构你的代码，以划分每种方法的职责？

## 进一步建议 & 资源

这个挑战没有给予指引，是有意为之。这里有一些要素将帮助你：

- 在深入研究代码之前，写下伪代码并送清楚如何着手。
- 你可以安装扩展程序[Json Formatter for Chrome](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) (需要VPN 🛡 ) 帮助你读取API（ 看看[JSONView for Mozilla](https://addons.mozilla.org/fr/firefox/addon/jsonview/)）提供的JSON。
- 使用Ruby标准库里的`open-uri` 软件包，向这个API发送HTTP请求并得到JSON结果。使用`json`软件包解析返回的JSON文件。
- 为了测试网格是否包含所用字母，可以使用`Enumerable#all?`。
