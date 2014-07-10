## Background & Objectives
When having a drink with a french entrepreneur, he tells you "man, I've some great idea, I want to make people speak louchebem again !" See how you can help him :)

### A bit of research
* Read [this article](http://fr.wikipedia.org/wiki/Louch%C3%A9bem) to understand what is louchébem, initially spoken by french butchers.
* Ask yourself what are the main issues for building your translator (choice of the final suffix, how to handle beginning of words, what are the different scenarios for a given word in input...)

### Write the pseudo-code 
Pseudocode is primarily used to communicate the essence of an algorithm without getting bogged down in language-specific syntax. A good programmer can take well-written pseudocode and translate it into functional code in the language of his choice.
* Write the pseudo-code for you louchebem translator. 
* Start small with a program that can only translate a single french word in louchebem
* Then try to extend it to sentences.

Did you know that popular expressions like "larfeuille", "loufiah", "loucedé", or "loufoque" are louchébem expressions!

## Specs  
- **constraint**: you should pick your final random suffix in `["em", "é", "ji", "oc", "ic", "uche", "ès"]`
- **constraint**: one-letter word like "a" or "l" should not be translated
- **constraint**: word beginning with a vowel should be translated differently. Ex: "atout" may give "latoutoc"
- **constraint**: words beginning with several consonnants ("chat", "trou") should be translated differently. Ex: "chat" should give "latchem", or "latchoc". Read [this article](http://fr.wikipedia.org/wiki/Louch%C3%A9bem) for more info.
- **enhancement**: ideally your program should be able to translate any complicated sentence, eventually embedding special characters like "!", or "'".

## Tips & Resouces
- You pseudo code should follow [these principles](http://www.cs.cornell.edu/Courses/cs482/2003su/handouts/pseudocode.pdf)
