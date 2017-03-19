## Background & Objectives

As you know a bit about objects now, you may want to leave the
terminal and draw some stuff. Let's make a game! We will use a
gem called `gosu`.

## Installation

Open your terminal and run:

### Mac OS X

```bash
brew update
brew install sdl2
gem install gosu
```

### Linux

```bash
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev\
  libsdl2-ttf-dev libpango1.0-dev libgl1-mesa-dev\
  libfreeimage-dev libopenal-dev libsndfile-dev
gem install gosu
```

## Tutorial

Just follow the gosu [tutorial](https://github.com/gosu/gosu/wiki/Ruby-Tutorial) and copy/paste the code in the `game.rb` file. At any point in the tutorial, you can test your code running:

```
ruby lib/game.rb
```

In the tutorial, sometimes there needs to be printed some images, you can take your own or re-use [these ones](https://github.com/gosu/gosu/tree/master/examples/media).

## Going further

So what do you want to code? A game which needs some physics? You might need more gems, look at the [gem family](http://www.libgosu.org)
