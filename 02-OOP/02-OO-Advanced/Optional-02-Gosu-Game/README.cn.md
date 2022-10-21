:warning: 免责声明! 这项挑战在Windows上不适用，如果你使用这个操作系统，请跳过它（或与使用macOS/Linux的人配对）。

## 背景和目标

Time to make a game! For this, we will use a gem called `gosu`.

## 安装

打开终端并运行：

### macOS

```bash
brew update
brew install sdl2
gem install gosu
```

### Linux

```bash
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev\
  libpango1.0-dev libgl1-mesa-dev libfreeimage-dev libopenal-dev\
  libsndfile-dev libmpg123-dev
gem install gosu
```
## 蛇

让我们编写一个好的游戏 **贪吃蛇** 游戏。控制很简单： 箭头键。我们的目标是通过吃食物来生长并保持活力（不要撞到窗口的边缘！）。
![](http://g.recordit.co/Wu3KJw9Jd1.gif)

## 详细说明

1. 遵循[Gosu教程](https://github.com/gosu/gosu/wiki/ruby-tutorial)打开一个窗口 `game.rb`

2. 我们将画一个 `20x20` 的白色正方形来代表蛇的 **头**。让我们引入一个带有 `SIZE` 常量的 `Snake` 类，并重构 `Game` 的 `initialize` 方法来构建一个与Snake大小成比例的窗口。

3. Let's do some modelling on the `Snake`. What should be its state? What about its behavior? You may need [`Gosu::draw_rect`](https://www.rubydoc.info/gems/gosu/Gosu.draw_rect) 和 `Gosu::Color::WHITE`.

4. 让我们将 **方向** 的概念添加到 `Snake`中。现在我们有了一个方向，让我们在 `Snake` 中添加一个 `#move` 方法。记住，如果超出窗口它会死。按下按钮时方向如何变化？你可能需要 [`Gosu.button_down?`](https://www.rubydoc.info/gems/gosu/Gosu.button_down%3F) 和`Gosu::KB_LEFT`。

5. 为什么这么快😱 ? 让我们试着让蛇爬慢一点。
6. 让我们做些 `Food` 吧。 Food 将是一个和蛇一样大小的红方块。它需要随机出现在屏幕上。实例变量应该是什么？实现一个 `draw` 方法。
7. 吃吧！当蛇与食物重叠时，应该增加分数，并且一个新的食物方块应该要出现在其他地方。你可能需要 [`Gosu::Font#draw`](http://www.rubydoc.info/github/gosu/gosu/Gosu/Font)。

打开终端并运行：

```bash
touch lib/game.rb
touch lib/snake.rb
touch lib/food.rb
curl https://themushroomkingdom.net/sounds/wav/smb/smb_bump.wav > lib/start.wav
curl https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav > lib/eat.wav
code .
```

我们这样开启游戏：

```bash
ruby lib/game.rb
```

## 更进一步

1. 蛇应该生长，而不是停留在一个正方形！
2. 蛇每次长大都要加速！
3. 每次蛇吃东西或死的时候都放一个声音！
