<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

现在，更高级的挑战来了。在这里，你将不得不使用我们尚未涉及的概念（条件和循环结构）。别惊慌，**我们将在明天看到这些概念**。在着手写代码之前，试着一步一步地来，同时问问自己，你试图在程序中完成什么。

在这个练习中， 我们将创造你自己的私人教练。
然而很不幸，这个教练有一点傻，他/她只能呈现出以下行为：

1. 如果你不**问**她/他些什么，而知识**告诉**她/他一些事（`“I met a girl last night”`），她/他将只会回答`"I don't care, get dressed and go to work!"`
2. 如果你问她/他些什么（例如 `"Can I eat some pizza?"`），她/他也不会给你太大帮助，她/他只会告诉你`“Silly question, get dressed and go to work!”`
3. 摆脱他的**唯一**方式，就是说出她/他最想听的话：`“Silly question, get dressed and go to work!”`

让我们在这个练习中比较一下**real world**和**code world**

<table class="table">
  <thead>
    <tr>
      <th>Real world</th>
      <th>Code world</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Waking up</td>
      <td>Running <code>ruby lib/interface.rb</code> in the terminal</td>
    </tr>
    <tr>
      <td>Speaking to your coach</td>
      <td>Writing a string in the terminal and hitting Enter</td>
    </tr>
    <tr>
      <td>Making your coach speak</td>
      <td>Reading your coach's answer printed on the terminal with <code>puts</code></td>
    </tr>
    <tr>
      <td>Asking a question</td>
      <td>Writing a sentence ending with <code>?</code> and hitting Enter</td>
    </tr>
    <tr>
      <td>Getting rid of your coach</td>
      <td>Typing <code>"I am going to work right now!"</code>, hitting Enter. The program should exit.</td>
    </tr>
  </tbody>
</table>

这个挑战的目标是：

- 理解一个程序的**流程（flow）**并且学习如何一行一行地“阅读”你的代码
- 学习 **条件**语句
- 学习改变你的程序流程的编程结构：`if/unless..else..end`, `while/until..end`, 等等。它们是[控件结构]（[control structures]）(https://en.wikipedia.org/wiki/Control_flow ）

## 详细说明

### 教练回答

在`lib/coach_answer.rb` 文件中，你将找到`coach_answer`方法的定义。你可以看到它需要一个参数，`your_message` 即你要告诉教练的一句话。这个方法（method）应当返回一个`String`（即 教练的回答），显然该字符串取决于`your_message`所传入的值。

现在，让我们使用"coach_answer_enhanced"方法来实现一个增强版本的教练。如果你对你的教练**大吼大叫**，她/他会喜欢的，并且会在常规回答之前加上一句：“I can feel your motivation!”。请记住，在互联网表达上大吼大叫是通过CAPS LOCK状态下输入来表示的。然而，如果你大喊"I AM GOING TO WORK RIGHT NOW!“，你的教练将不再烦你了。

### 交互式程序

- 编写界面代码，让你和你的教练通过终端进行谈话。
- **约束条件**： 这个程序应该**“循环”**。你的教练应该回答你的信息，并等待你的下一句话，知道你决定摆脱他。使用`while..end` 或者 `until..end`来达成这个目的。

如果你被**无限循环**卡住了，点击`Ctrl` + `C`! 它将终止这个过程。

⚠️ 对这个练习而言，你只有在rake达到100%绿色后才算完成！你需要确保你确实可以通过运行ruby lib/interface.rb来问你教练问题😉

## 关键学习要点

- 程序通常的运行流程是什么样的？
- 像`if..else..end`或者`while..end`这样的结构是如何改变这个流程的？
- 这些结构是如何工作的？
- 什么是条件语句？它能采用哪种值？`=` 和 `==`的区别是什么？
- 一个简单的方法调用会改变你的程序的流程吗？

