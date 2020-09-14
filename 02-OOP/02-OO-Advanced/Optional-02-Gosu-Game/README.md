## Background & Objectives

Time to make a game! For this, we will use a gem called `gosu`.

## Installation

Open your terminal and run:

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

### Windows

Copy the following commands in your Ubuntu terminal one line at a time:
```bash
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev\
  libpango1.0-dev libgl1-mesa-dev libfreeimage-dev libopenal-dev\
  libsndfile-dev libmpg123-dev
gem install gosu
echo "export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" >> ~/.zshrc
```

Restart your terminal.

Install [Xming](https://sourceforge.net/projects/xming/).
Start XLaunch, leaving default settings but **add the following optional parameters** `-ac`.

![xlaunch](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/xlaunch.jpg)

If you get the error `could not initialize SDL` when running your game, you need to add an exception in your Windows Defender to allow Xming public incomming traffic over UDP and TCP protocols. You can follow this [documentation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule).

## Snake

Let's code the good ol' game **Snake** game. Controls are easy: arrow keys. The goal is to grow by eating food and stay alive (do not hit window borders!).

![](http://g.recordit.co/Wu3KJw9Jd1.gif)

## Specs

1. Follow the [Gosu tutorial](https://github.com/gosu/gosu/wiki/ruby-tutorial) to get a window up & running in `game.rb`
1. We will draw a `20x20` white square to represent the snake's **head**. Let's introduce the `Snake` class with a `SIZE` constant and refactor the `Game`'s `initialize` method to build a window proportional to the snake's size.
1. Let's do some modelling on the `Snake`. What should be its state? What about its behavior? You may need [`Gosu::draw_rect`](http://www.rubydoc.info/github/gosu/gosu/Gosu.draw_rect) and `Gosu::Color::WHITE`.
1. Let's add the concept of **direction** to the `Snake`. Now we have a direction, let's add a `#move` method to the `Snake`. Remember, it'll die if it goes beyond the window frame. How does the direction change when pressing buttons? You may need [`Gosu.button_down?`](http://www.rubydoc.info/github/gosu/gosu/Gosu#button_down%3F-class_method) and `Gosu::KB_LEFT`.
1. Why is it so fast 😱 ? Let's try to slow the snake down a bit.
1. Let's make some `Food` appear. Food would be a red square of the same size as the snake. It needs to appear randomly on the screen. What should be the instance variables? Implement a `draw` method.
1. Let's eat! When the snake overlaps the food, it should increment the score, and a new food square should appear somewhere else. You may need [`Gosu::Font#draw`](http://www.rubydoc.info/github/gosu/gosu/Gosu/Font).

Open a terminal and run:

```bash
touch lib/game.rb
touch lib/snake.rb
touch lib/food.rb
curl https://themushroomkingdom.net/sounds/wav/smb/smb_bump.wav > lib/start.wav
curl https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav > lib/eat.wav
stt
```

We will launch the game with:

```bash
ruby game.rb
```

## Going further

1. The snake should grow and not stay as a square!
1. The snake should speed up every time it grows!
1. Play a sound every time the snake eats or dies!
