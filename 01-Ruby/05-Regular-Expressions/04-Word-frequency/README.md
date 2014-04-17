## Background & Objectives
- Work with a text file
- Build a text analyzer using Hash

### Reading a file in ruby
You can read a file, line by line, with

```ruby 
File.open("my/file/path", "r").each_line do |line|
  puts line
end
```

## Specs 
- Implement `most_common_words` that enables to get the number of occurrences of most frequent words in a text file. For instance, consider we take the bible as source text.

```ruby
most_common_words('source-text.txt', 3)  
> {'lord' => 8722, 'God' => 7380, 'Jesus' => 2617 }
```

### Get rid of the noise
Add a filter to your method to get rid of [stop words](http://en.wikipedia.org/wiki/Stop_words) as ("a", "the", "is", ...). We give you a text file "stop_words.txt" containing english stop words. You should use this file in your program.

### Be creative
Copy/Paste any text you want in the source file to experiment your program (political speech, fairy tale, etc...)
