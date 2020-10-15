## Background & Objectives

You are going to develop a text analyzer. Your ruby program will read a text supplied in a separate file, analyze it for various patterns and statistics, and print out the result for the user.
Text processing programs are the bread and butter of most application development.

Ruby is well suited for text and document analysis with its regular expression
features along with the ease of use of `gsub`, `scan` and `split`.
You'll use these heavily in your application.

## Required Features

* Character count (including **and** excluding spaces)
* Line count
* Word count
* Sentence count
* Paragraph count
* Average number of words per sentence
* Average number of sentences per paragraph

Implement a method `analyze` which takes a text (`String`) as an argument (text you can load from a file)
and returns a result `Hash` with the following keys:

```ruby
{
  character_count: 523,
  character_count_excluding_spaces: 463,
  line_count: 42,
  word_count: 145,
  sentence_count: 32,
  paragraph_count: 4,
  average_words_per_sentence: 4.53,
  average_sentences_per_paragraph: 8
}
```

## Application Flow

1. Create a `program.rb` that loads the file containing the text document and calls the `analyze` method
1. In `analyze`, `text` is a string, you can thus measure its length easily
1. Temporarily remove whitespaces and count characters excluding spaces
1. Split out all the whitespaces to find out how many words there are
1. Split out full stops to find out the number of sentences
1. Split out double linebreaks to calculate the number of paragraph
1. Compute the averages using your counters.

### Testing data

You can get some testing txt data [here](http://www.rubyinside.com/book/oliver.txt)

### Adding extra features

Your analyzer is not particularly interesting at the moment :( Let's add a few cool features to it. Line, paragraph and word count are useful statistics, but with the power of ruby you can perform even better analysis. The only limit is your imagination!

* **Percentage of "useful" words**: most written material contains words like "the", "are",.. These are called stop-words and are often ignored by computer systems whose job is to analyze and search through text, because they aren't words most people are likely to be searching for (Google is a perfect example of that).
* **Interesting summary**: Word processors like Microsoft Word generally have summarization feature that can pick out the most meaningfull extract in a given page and produce an "at-a-glance" summary. One of the techniques to find the good extract is to pick up sentences that are of about average length and contain **nouns**. Tiny sentences are likely not to be very useful, and long sentences may be too long for a summary. To see if the sentences includes nouns you can look for words like "is" or "are" which are a good indicators ("There are x nouns", "Noun is", "Nouns are",...). **Hint:** you should decide first which proportion of the original text you keep for your summary (for instance computed on the number of sentences).
