https://github.com/jlnr/gosu/wiki/Ruby-Tutorial

## Background & Objectives

As you know a bit about objects now, you may want to leave the
terminal and draw some stuff. Let's make a game! We will use a
gem called `gosu`.

## Installation

### Mac OS X

Open your terminal and run:

```bash
brew update
brew install sdl2 libogg libvorbis
gem install gosu
```

### Linux

You can follow [this tutorial](https://github.com/jlnr/gosu/wiki/Getting-Started-on-Linux)

## Tutorial

Just follow the gosu [tutorial](https://github.com/jlnr/gosu/wiki/Ruby-Tutorial#down-to-business) and copy/paste the code in the `game.rb` file. At any point in the tutorial, you can test your code running:

```
$ ruby lib/game.rb
```

In the end, you should get the full tutorial code as on [the official repo](https://github.com/jlnr/gosu/blob/master/examples/Tutorial.rb), but don't cheat, don't copy paste the whole thing, try to understand how a Gosu game is built. In the tutorial, sometimes there needs to be printed some images, you can take your own or re-use [these ones](https://github.com/jlnr/gosu/tree/master/examples/media).

## Going further

So what do you want to code? A game which needs some physics? You might need more gems, look at the [gem family](http://www.libgosu.org)