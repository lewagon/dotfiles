## 背景与目标

现在，更高级的挑战来了。在这里，你必须使用我们尚未涉及的概念（条件和循环结构）。别慌，**我们将在明天学习这些概念**。在着手写代码之前，试着一步一步地来，问问自己，你想在程序中完成什么。

在这个练习中， 我们将建一个你自己的私人教练。
不过呢，这个教练有一点傻，他/她只能呈现出以下行为：

1. 如果你不**问**她/他些什么，而知识**告诉**她/他一些事（`“I met a girl last night”`），她/他将只会回答`"I don't care, get dressed and go to work!"`
2. 如果你问她/他任何的问题（例如 `"Can I eat some pizza?"`），她/他也不会给你太大帮助，她/他只会告诉你`“Silly question, get dressed and go to work!”`
3. 摆脱她/他的**唯一**方式，就是说出她/他最想听的话：`“Silly question, get dressed and go to work!”`

让我们来比较一下这个练习中的**真实世界**和**代码世界**。

<table class="table">
  <thead>
    <tr>
      <th>真实世界</th>
      <th>代码世界</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>起床</td>
      <td>在终端运行<code>ruby lib/interface.rb</code></td>
    </tr>
    <tr>
      <td>跟教练说话</td>
      <td>在终端里输入一行字符串，按回车键</td>
    </tr>
    <tr>
      <td>让教练说话</td>
      <td>在终端里阅读<code>puts</code>打印出来的教练的回答</td>
    </tr>
    <tr>
      <td>问一个问题</td>
      <td>在终端输入一个以<code>?</code>结尾的句子</td>
    </tr>
    <tr>
      <td>摆脱教练</td>
      <td>在终端中输入<code>"I am going to work right now!"</code>，再按回车键。这个程序就会终止。</td>
    </tr>
  </tbody>
</table>

这个挑战的目标是：

- 理解一个程序的**流程（flow）**并且学习如何一行一行地“阅读”你的代码
- 学习**条件**语句
- 学习改变你的程序流程的编程结构：`if/unless..else..end`, `while/until..end`, 等等。它们是[控件结构(control structures)](https://zh.wikipedia.org/wiki/控制流程)

## 详细说明

### 教练回答

⚠️ 开始之前，请确保运行`rake`并仔细阅读要求。它将使你清楚地了解两种方法的预期输出分别是什么。

在`lib/coach_answer.rb` 文件中，你将找到`coach_answer`方法的定义。你会发现，它需要一个叫`your_message` 的参数，就是一句你要跟教练的话。这个方法（method）应当返回一个字符串（即教练的回答）。这个字符串取决于`your_message`所传入的值。

现在，让我们使用`coach_answer_enhanced`方法来实现一个增强版本的教练。如果你对你的教练**大吼大叫**，她/他会很喜欢！所以，他/她会在常规回答之前加上一句：“I can feel your motivation!”。请记住，在互联网表达上大吼大叫的意思就是全大写。然而，如果你大喊"I AM GOING TO WORK RIGHT NOW!“，你的教练将不再烦你了。

### 交互式程序

- 编写界面（interface）代码，让你和你的教练通过终端进行谈话。
- **约束条件**：这个程序应该**“循环”**。你的教练应该回答你的信息，并等待你的下一句话，直到你决定摆脱他。你可以使用`while..end`或者`until..end`来达到这个目的。

如果你被**无限循环**卡住了，点击`Ctrl` + `C`! 它将终止这个过程。

⚠️ 对这个练习而言，你的rake达到100%绿色后还不算完成哦！你需要确保你可以通过运行`ruby lib/interface.rb`来问你教练问题😉

## 关键学习要点

- 程序通常的运行流程是什么样的？
- 像`if..else..end`或者`while..end`这样的结构是如何改变这个流程的？
- 这些结构是如何工作的？
- 什么是条件语句？它能采用哪种值？`=` 和 `==`的区别是什么？
- 一个简单的方法调用会改变你的程序的流程吗？

