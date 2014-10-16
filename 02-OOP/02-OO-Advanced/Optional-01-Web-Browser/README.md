## Background & Objectives

We want to implement a command-line browser because Google Chrome is so mainstream! The idea is to ask the user for a URL, go and fetch the content and then print the text back.

## Specs

Write a `Browser` class in the `lib/browser.rb` file so that when you run the following script, you get a nice interactive browser in command line:

```bash
$ ./lib/run.rb
```

Study the program we provide you in the `lib/run.rb` to understand
which methods your `Browser` class should expose. We want to **only print** web pages text, not markup like `<h1>`, `<p>`, etc...

## Tips

You may consider using [OpenURI](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/open-uri/rdoc/OpenURI.html) and [Nokogiri](http://www.rubydoc.info/github/sparklemotion/nokogiri). To make sure this gem is installed, just run:

```bash
$ gem install nokogiri
```