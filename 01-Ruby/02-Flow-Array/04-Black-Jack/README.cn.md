## 背景与目标

这个练习旨在验证你迄今为止见到的核心概念，这些在大多数编程语言中都很常见：

- 读取用户输入/向用户打印输出
- 变量（variables）和方法(methods)
- 控制程序流（flow）和结构
- 操作字符串（strings）和数组（arrays）

## 黑杰克（blackjack) - 规则

我们将做一个*简化版*黑杰克：

- 玩家一开始没有纸牌（分数为0）
- 银行一开始有`16`~`21`分
- 对于每一轮，玩家可以：
  - 随机抽取一张介于`1`和`11`之间的纸牌。该数字将被计入他/她的分数。
  - 再抽取另一张，或者保持目前分数并结束游戏。
- 游戏结果，有以下五种可能性：
  - 如果玩家的分数 > 21，他们就`"Lose"`（输）。
  - 如果玩家的分数 = 21，他们赢了一个`"Black Jack"`，赢。
  - 如果玩家的分数 > 银行的分数，他们就`"Win"`（赢）。
  - 如果玩家的分数 < 银行的分数，他们就`"Lose"`（输）。
  - 如果玩家的分数 = 银行的分数，他们就是`"平局（Push）"`。玩家拿回他们的钱。

## 详细说明

### `black_jack.rb`

- 完成`#pick_bank_score`方法。这个方法返回银行分数，这个分数是16到21之间的随机整数。
- 完成`#pick_player_card`方法。这个方法返回纸牌分值，这个值是1到11之间的随机整数。

### `croupier.rb`

- 完成`#state_of_the_game`方法。这个方法会返回带有银行和玩家分数的一条信息。
- 完成在游戏结束时调用的`#end_game_message`。这个方法会返回游戏的结果（赢/输/平）

### `interface.rb`

- 完成在终端运行黑杰克游戏的主要方法。它应该这样运行：

```bash
ruby lib/interface.rb

Card? 'y' or 'yes' to get a new card
> yes
Your score is 6, bank is 17

Card? 'y' or 'yes' to get a new card
> yes
Your score is 16, bank is 17

Card? 'y' or 'yes' to get a new card
> yes
Your score is 19, bank is 17

Card? 'y' or 'yes' to get a new card
> no
You beat the bank! You win.
```

⚠️ 当rake是100%绿色时，你还不算完成了这个练习哦。你需要运行`ruby lib/interface.rb`，来测试游戏是不是确实可以玩。😉

## 关键学习要点

- 循环有哪些不同的方式？
- 有哪些可用的条件语句？
- 什么是字符串插值（string interpolation）？

## 进一步建议 & 资源

- 你可以用[随机类（Random class）](http://www.ruby-doc.orgcore-2.5.3/Random.html)。
- 当循环时，你需要一个可以使游戏停下来的条件。
