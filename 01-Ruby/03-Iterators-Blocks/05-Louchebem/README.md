## Background & Objectives

You are having a drink with a french entrepreneur and he tells you "I've some great idea, I want to make people speak louchebem again!" See how you can help him :)

### A bit of research

* Read [this article](https://en.wikipedia.org/wiki/Louch%C3%A9bem) to understand what is louchébem, initially spoken by french butchers.
* Ask yourself what are the main issues for building your translator (choice of the final suffix, how to handle beginning of words, what are the different scenarios for a given word in input...)

### Write the pseudo-code

Pseudocode is primarily used to communicate the essence of an algorithm without getting bogged down in language-specific syntax. A good programmer can take well-written pseudocode and translate it into functional code in the language of his choice.

* Write the pseudo-code for you louchebem translator.
* Start small with a program that can only translate a single french word in louchebem
* Then try to extend it to sentences.

Did you know that popular expressions like "larfeuille", "loufiah", "loucedé", or "loufoque" are louchébem expressions!

## Specs

- **constraint**: you should pick your final random suffix in `["em", "é", "ji", "oc", "ic", "uche", "ès"]`
- **constraint**: one-letter word like "a" should not be translated
- **constraint**: for words beginning with consonnants ("chat", "trou") you'll have to take all the first *consonnants* group and put it at the end and add a "l" at the start of the word. Ex: "chat" should give "latchem", or "latchoc". Read [this article](http://en.wikipedia.org/wiki/Louch%C3%A9bem) for more info.
- **constraint**: words beginning with a vowel are more straightforward to translate. Ex: "atout" may give "latoutoc"
- **enhancement**: ideally your program should be able to translate any complicated sentence, eventually embedding special characters like "!", or "'".

## Further suggestions & resources

- You pseudo code should follow [these principles](http://www.cs.cornell.edu/courses/cs211/2000fa/materials/using_pseudo_code.htm)
