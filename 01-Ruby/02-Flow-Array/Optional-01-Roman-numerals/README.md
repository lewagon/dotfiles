## Background & Objectives

- Use integer division and modulus methods

## Specs

### Old-style

In the early days of Roman numerals, the Romans didn't bother with any of this new-fangled subtraction "IX" nonsense. No sir, it was straight addition, biggest to littlest, so 9 was written as VIIII, and so on.

- Write a method that when passed an integer above `0` returns a string containing the proper old-school Roman numeral. In other words, `old_roman_numeral(4)` should return `"IIII"`.

For reference, these are the values of the letters used:
- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

### Modern-style

Eventually someone thought it would be terribly clever that if putting a small number before a larger one meant you had to subtract the smaller one. As a result of this development you must now suffer. Rewrite your previous method to return the new-style Roman numeral so that when someone calls `new_roman_numeral(4)`, it will return 'IV'.

You can also look at this [table](http://loudexpose.files.wordpress.com/2011/02/roman-numerals.jpg) to help with understanding the concept.
