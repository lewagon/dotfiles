## Old school
In the early days of Roman numerals, the Romans didn't bother with any of this new-fangled subtraction "IX" non-sense. No sir, it was straight addition, biggest to littlest, so 9 was written VIIII, and so on. 
* Write a method that when passed an integer between 1 and 3000 (or so) returns a string containing the proper old school Roman numeral. In other words, `old_roman_numeral(4)` should return 'IIII'. 
* Make sure to test your method on a bunch of different numbers.

## Hint
Use the integer division and modulus methods ! For reference, these are the values of the letters used:
* I = 1
* V = 5
* X = 10
* L = 50
* C = 100
* D = 500
* M = 1000

## Modern-style
Eventually someone thought it would be terribly clever if putting a small number before a larger one meant you had to subtract the smaller one. As a result of this development, you must now suffer. Rewrite your previous method to return the new-style Roman numeral so when someone calls  `roman_numeral(4)` , it should return 'IV'.
