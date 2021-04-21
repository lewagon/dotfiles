<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

这个练习旨在验证你迄今为止见到的，且在大多数编程语言中常见的核心概念：

- 读取用户输入/向用户打印输出
- 变量（variables）和方法(methods)
- 程序流（flow）以及控制结构
- 处理字符串（strings）和数组（arrays）

## 黑杰克 - 规则

我们将处理一个*简化*版黑杰克：

- 玩家从无纸牌开始（分数为0）
- 银行从一个`16`到`21`之间的分数开始
- 对于每一轮，玩家可以：
  - 随机抽取一张介于"1"和"11"之间的纸牌。该数字将被计入他/她的分数。
  - 再抽取另一张，或者继续持有目前分数并结束游戏。
- 最后，有以下五种可能性：
  - 如果玩家的分数 > 21，他们`"输"`（破产）。
  - 如果玩家的分数 = 21，他们拉一个`"Black Jack"`，赢。
  - 如果玩家的分数 > 银行的分数，他们`"赢"`。
  - 如果玩家的分数 < 银行的分数，他们`"输"`。
  - 如果玩家的分数 = 银行的分数，他们`"平局（Push）"`。玩家拿回他们的钱。

## 详细说明

### `black_jack.rb`

- 完成`#pick_bank_score`方法，在16和21之间返回一个随机的银行分数。
- 完成`#pick_player_card`方法，在1和11之间返回一个随机的纸牌值。

### `croupier.rb`

- 完成`#state_of_the_game`方法，构建含有银行和玩家分数的信息。
- 完成在游戏结束时调用的`#end_game_message`，包含游戏的结果（赢/输/平）

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

⚠️ 只有当rake是100%绿色时，你才算完成了这个练习。你需要保证确实可以通过运行`ruby lib/interface.rb`来玩游戏。😉

## 关键学习要点

- 循环有哪些不同的方式？
- 有哪些可用的条件语句？
- 什么是字符串插入（string interpolation）？

## 进一步建议 & 资源

- 你可能想用[随机类（Random class）](http://www.ruby-doc.org/core-2.5.3/Random.html).
- 当循环时，你需要一个条件使你的游戏循环在某个点停下来。














