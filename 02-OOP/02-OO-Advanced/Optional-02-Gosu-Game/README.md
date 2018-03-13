## Background & Objectives

Time to make a game! For this, we will use a gem called `gosu`.

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
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev\
  libpango1.0-dev libgl1-mesa-dev libfreeimage-dev libopenal-dev\
  libsndfile-dev libmpg123-dev
gem install gosu
```

## Tutorial

Just follow the gosu [tutorial](https://github.com/gosu/gosu/wiki/Ruby-Tutorial) and copy/paste the code in the `game.rb` file. At any point in the tutorial, you can test your code running:

```bash
ruby lib/game.rb
```

You'll see from the tutorial that you need a few images. You can choose your own or re-use [these ones](https://github.com/gosu/gosu/tree/master/examples/media).

## Going further

So what do you want to code? A game that needs a bit of physics? You might need a few more gems to help you, so take a look at the [gem family](http://www.libgosu.org)
