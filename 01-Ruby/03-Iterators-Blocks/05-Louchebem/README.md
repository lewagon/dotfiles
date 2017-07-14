## Background & Objectives

You are having a drink with a french entrepreneur and he tells you "I've this great idea: I want to get people speaking louchebem again!" Now you have to help him 😊

### A bit of research

* Louchébem is a type of French slang that was originally spoken by Parisian butchers. Read [this article](https://en.wikipedia.org/wiki/Louch%C3%A9bem) to find out a bit more about it.
* Very simply, you take a normal French word like **"PATRON"**. You take the first consonant group (letters before the first vowel), and replace it with an "L". Then, you put that first consonant group at the end of the word, followed by one of the louchebem suffixes, e.g. -EM. **So "PATRON" becomes "LATRONPEM".** Easy right? 😉
* Ask yourself what the main issues are going to be when building your translator (choice of the final suffix, how to handle beginning of words, what the different scenarios are for a given word in input...)

### Write the pseudo-code

Pseudocode is primarily used to communicate the essence of an algorithm without getting bogged down in language-specific syntax. A good programmer can take well-written pseudocode and translate it into functional code in the language of his choice.

* Write the pseudo-code for you louchebem translator.
* Start small with a program that can only translate a single french word in louchebem
* Then try to extend it to sentences.

Did you know that popular French expressions like "larfeuille", "loufiah", "loucedé", or "loufoque" are louchébem expressions?

## Specs

- **constraint**: you must pick your suffix from: `["em", "é", "ji", "oc", "ic", "uche", "ès"]`
- **constraint**: any one-letter words like "a" should not be translated
- **constraint**: for words beginning with consonants ("chat", "trou") you'll have to take the first *letter* and put it at the end, adding an "l" to the start of the word. e.g. "chat" should give "latchem", or "latchoc". Read [this article](http://en.wikipedia.org/wiki/Louch%C3%A9bem) for more info.
- **constraint**: words beginning with a vowel are more straightforward to translate. Ex: "atout" may give "latoutoc"
- **enhancement**: ideally your program should be able to translate any complicated sentence, eventually embedding special characters like "!", or "'" in the right places.

## Further suggestions & resources

- You pseudo code should follow [these principles](http://www.cs.cornell.edu/courses/cs211/2000fa/materials/using_pseudo_code.htm)
