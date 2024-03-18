## Background & Objectives

You are meeting a French entrepreneur who tells you "I've this great idea: I want to get people speaking louchébem again!" Now you have to help them 😊

### A bit of research

- Louchébem is a type of French slang that was originally spoken by French butchers. Read [this article](https://en.wikipedia.org/wiki/Louch%C3%A9bem) to find out a bit more about it.
- Very simply, you take a normal French word like **"PATRON"**. You take the first consonant group (letters before the first vowel), and replace it with an "L". Then, you put that first consonant group at the end of the word, followed by one of the louchebem suffixes, e.g. -EM. **So "PATRON" becomes "LATRONPEM".** Easy right? 😉
- Ask yourself what the main issues are going to be when building your translator (choice of the final suffix, how to handle beginning of words, what the different scenarios are for a given word in input...)

### Write the pseudo-code

Pseudocode is primarily used to communicate the essence of an algorithm without getting bogged down in language-specific syntax. A good programmer can take well-written pseudocode and translate it into functional code in the language of his/her choice.

- Write the pseudo-code for you louchebem translator.
- Start small with a program that can only translate a single french word in louchebem
- Then try to extend it to sentences.

Did you know that popular French expressions like "larfeuille", "loufiah", "loucedé", or "loufoque" are louchébem expressions?

## Specs

- **constraint**: any one-letter words like "a" should not be translated
- **constraint**: for words beginning with consonants ("chat", "trou"), you'll have to take the first *consonant group* (all the letters before the first vowel) and put it at the end, add an `l` to the start of the word and add a suffix at the end ("chat" should give "latchem", or "latchoc")
- **constraint**: words beginning with a vowel are not changed but you should still add an `l` to the start of the word and a suffix at the end ("atout" should give "latoutoc" or  "latoutic")
- **constraint**: the random suffix should be one of these: `["em", "é", "ji", "oc", "ic", "uche", "ès"]`
- **enhancement**: ideally your program should be able to translate any complicated sentence, regardless of punctuation

## Further suggestions & resources

- We all know the `#split` method by now, but did you know you can also pass a string pattern as an argument of the `split` method? Don't worry, we will have a look at Regular Expressions soon but for now, let's try `"hello, friend!!".split(/\b/)` in irb, can you see why it could be useful for the enhancement part of the exercise? 😉
- Your pseudo code should follow [these principles](http://www.cs.cornell.edu/courses/cs211/2000fa/materials/using_pseudo_code.htm)
