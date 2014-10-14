## Background & Objectives

You are going to develop a text analyzer. Your ruby program will read a text supplied in a separate file, analyze it for various patterns and statistics, and print out the result for the user.
Text processing programs are the bread and butter of most application development.

Ruby is well suited for text and document analysis with its regular expression
features along with the ease of use of `gsub`, `scan` and `split`.
You'll use these heavily in your application.

## Required Features

* character count (including **and** excluding spaces)
* Line count
* Word count
* Sentence count
* Paragraph count
* Average number of words per sentence
* Average number of sentences per paragraph

Implement a method `analyze` which takes a text (`String`) as an argument (text you can load from a file)
and return a result `Hash` with the following keys:

```ruby
{
  character_count: 523,
  line_count: 42
  word_count: 145,
  sentence_count: 32,
  paragraph_count: 4,
  average_words_per_sentence: 4.53,
  average_sentences_per_paragraph: 8
}
```

## Application Flow

1. Load the file containing the text document to analyze
1. Keep a count of the number of lines there were
1. Put the text into a string and measure its length to get a character count
1. Temporarily remove white spaces and count characters excluding spaces
1. Split out all the whitespaces to find out how many words there are
1. Split out full stops to find out the nuber of sentences
1. Split out double newlnes to calculate number of paragraph
1. Work out the averages using all your counters.

### Testing data

You can get some testing txt data on http://www.rubyinside.com/book/oliver.txt

### Adding Extra-features

Your analyzer in not particularly interesting at the moment :( Let's add it some cool features. Line, paragraph and word count are useful statistics, but with the power of ruby you can perform much cooler analysis. The ony limit is your imagination !

* **Percentage of "useful" words** : most written material contains insipid words as "the", "are",.. These are called stop-words and are often ignored by computer systems whose job is to analyze and search through text, because they aren't words most people are likely to be searching for (Google beign a perfect example of that). It can be argued that texts with a high ratio of "useful" words (as opposed with stop-words) are likely to be more interesting, this is a true debate :) Add a statistics in your analyzer to compute the percentage of "useful" words in the inputed text file.

* **Interesting summary** : Word processors as Microsoft Word generally have summarization feature that can pick out the most meaningfull extract in a given page and produce an "at-glance" summary. One of the techniques to find the good extract is to pick up sentences that are of about average length and contains **nouns**. Tiny sentences are likely not to be very useful, and long sentences may be too long for a summary. To see if the sentences includes nouns you can look for words like "is" or "are" which are a good indicators ("There are x nouns", "Noun is", "Nouns are",...). **Tips** you should decide first which proportion of the original text you keep for your summary (for instance computed an the number of sentences).
