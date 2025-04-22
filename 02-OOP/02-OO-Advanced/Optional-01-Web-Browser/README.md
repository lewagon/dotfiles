## Background & Objectives

Google Chrome is so mainstream these days. Let's build a command-line browser instead. The idea is to ask the user for a URL, go and fetch the content and then print the text back.

## Specs

Write a `Browser` class in the `lib/browser.rb` file so that when you run the following script, you get a nice interactive browser in command line:

```bash
./lib/run.rb
```

Study the program we provide you in the `lib/run.rb` to understand
which methods your `Browser` class should expose. We want to **only print** the text of the web pages, not the extra markup like `<h1>`, `<p>`, etc.

## Further suggestions

You might want to use [OpenURI](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/open-uri/rdoc/OpenURI.html) and [Nokogiri](http://www.rubydoc.info/github/sparklemotion/nokogiri). To make sure these gems are installed, just run:

```bash
gem install nokogiri
```
