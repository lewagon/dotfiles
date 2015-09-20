## Background & Objectives

* Understand the structure of an exercise's repo, and the link to your Github account.
* Learn to test your code locally before submitting your solution.
* Learn the basic git commands to commit modifications to your code and push them to Github.
* Discover the features of the Kitt platform.

During these 9 weeks, you'll work in pairs or groups of 3-4. Everyday, a new buddy is assigned to you, following an algorithm of [round robin tournament](http://en.wikipedia.org/wiki/Round-robin_tournament) implemented in this [gem](https://github.com/ssaunier/round_robin_tournament).

Before starting a new challenge, **make sure that you explain to each other what you've understood of it** and **before** starting to write a single line of code. Then you can pair program, or work side by side, checking up every 10 minutes or so to help one another.

Working in pairs is a common practice of Software Engineering. The idea is that if you work alone and you get stuck, you can loose several hours digging in the issue, whereas a fresh pair of eyes would find the problem within seconds. Don't underestimate that!

## Exercise 1: Practicing command lines (Terminal)

Before going further in fullstack-challenges directory, we'll first work on the command lines you've just learned.

NOTE: **You're not allowed to use Finder (or your file browser)!**

### tmp directory

First step, we'll create all our files in a directory named `tmp`.

* Create a directory `tmp` in your home directory (`~`)
* Go to the `tmp` directory

### README file

* Inside `tmp` directory, create a file named `README`

* Open this `tmp` directory in Sublime Text. Write some text in the `README` file.

### Level-1 directory

* Create a `level-1` directory
* Go to this directory and create a file named `README-level1`
* Display the path where you are

### Level-2 directory

* Go back to the parent directory
* From `tmp` directory, create a directory named `level-2` inside the directory `level-1`
* Still from 'tmp' directory, create a file named `configuration` inside the directory `level-2` (which is inside `level-1`)

### Playing with files

Let's use the `mv` command that you'll use to move/rename folders and files.
It's time to act like a real developer! Use google to find out how to complete the following instructions.

* Move this configuration file from 'level-2' directory to `level-1` directory
* Go to `level-1` directory
* Rename `configuration` file into `config`
* List all files
* Remove `level-2` folder
* Remove `config` file

### Final words

* Go back to your home (`~`) directory
* Destroy the tmp folder
* Clear the terminal window

## Exercise 2: Let's `rake`.

Move to the exercise folder with the command at the top of this page.

* Run `rake`. It should be all red (as you have not started coding).

Open the `lib/wagon_start.rb` file in Sublime Text. That's where you'll need to edit the code.

* Make the `wagon_start` method return `"That's how it starts"`
* In the terminal, run `rake` and make sure if you're 100% green + have a good style.
* Commit your changes, and push them.
* Go back to Kitt, and refresh the page. You should see your solution on the right.

## Exercise 3: Once more, with feelings

Open the `lib/buddy.rb`. Make sure that the method `today_my_buddys_github_nickname_is` does **return** (which is different than **puts**!) the github username of your buddy. If you don't have any buddy, just return your own github username.

When you're done you can look at the links below.

## Going futher

If you are done with your computer setup and the excercises, have a look at these resources:

* [git cheat sheet](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
* [interactive cheat sheet](http://www.ndpsoftware.com/git-cheatsheet.html)
* Watch [this TED conference](http://www.ted.com/talks/clay_shirky_how_the_internet_will_one_day_transform_government.html) on how to use git/Github for usual projects (non-dev)
* Read and practise all of this tutorial: [Learn Enough Command Line to Be Dangerous](http://www.learnenough.com/command-line/)
