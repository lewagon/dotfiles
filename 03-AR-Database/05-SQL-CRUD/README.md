## Background & Objectives

Since you are now an expert in SQL queries, let's build our version of [Hacker News](https://news.ycombinator.com/).

The goal of this exercice is to build a program that can create news and store them in a database.

Let's start with a simple model:

* The blog database contains Posts
* A Post has:
	* name:string 
	* rating:integer 
	* source_url:string
	* date:datetime
	
Notice we added a `Gemfile` to our project. This file can be executed with [bunlder](http://bundler.io/). Get used to it, we will systematically use a Gemfile from now on! Why?
	
- it keeps track of the gems used by your project and of their version
- anyone can get all these gems installed on his machine (with specified versions), running the `bundle` command on terminal, which is very convenient when working in a team! 

## Specs
Write an interactive program that can create, update, read and delete posts. 

- complete the methods in `crud.rb` with the relevant queries to perform CRUD actions on the DB
- **optional**: add optional tasks in the interface, to allow the user for other CRUD actions (e.g. update/delete/read a single post) 

At least your program should have these tasks:

```
Hey you, what do you want to do ?
1. add a piece of news.
2. delete all news.
3. read my news. 
```

We prepared a skeleton of the app for you.

## Tips & Resources
- if you have visual mind, [here's some help](http://www.sqlite.org/lang_createtable.html)
