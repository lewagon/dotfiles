## Background and Objectives
In this exercise, we will model your relation with a personal coach. This coach is rather stupid and exhibits the following behavior

1. If you don't **ask** him something, but just **tell** him something (e.g. `"I met a girl last night"`), he will just answer back `"I don't care son, get dressed and go to work !"`
2. If you ask him something, he won't be of great help either and he will tell you `"Silly question, get dressed and go to work !"`
3. The only way to get rid of him is to tell him what he expects, `"I am going to work right now SIR !"`

Let's make a comparison between the **real world** and the **code world** on this exercise.

<table class="table">
<thead>
<tr>
<th>Real world</th>
<th>Code world</th>
</tr>
</thead>
<tbody>
<tr><td>Waking up </td><td>Running <code>interface.rb</code> from the terminal</td></tr>
<tr><td>Speaking to your coach</td><td>Writing a string the in terminal</td></tr>
<tr><td>Making your coach speak</td><td>Reading your coach's answer printed on the terminal with <a href="http://www.ruby-doc.org/core-2.0.0/IO.html#method-i-puts" target="_blank">puts</a></td></tr>
<tr><td>Asking a question</td><td>Writing a sentence ending with <code>?</code> on the terminal</td></tr>
<tr><td>Getting rid of your coach</td><td>Exiting the program by typing `"I am going to work right now SIR !"`</code></td></tr>
</tbody>
</table>


The objectives of this challenge are :
- Understand the flow of a program and learn how to "read" through your code, line by line
- Learn about conditional statements
- Learn about coding structures that modify your program flow: `if/unless..else..end`, `while/until..end`,.. We speak of [control structures](http://fr.wikipedia.org/wiki/Structure_de_contr%C3%B4le)

## Specs
### coach_answer.rb
- implement the coach answer's logic in `#coach_answer`

- **enhancement**: You can invent new rules and code a enhanced version in `#coach_answer_enhanced`. For instance:

  * if you shout at your coach, he will always add "I can feel your motivation son !" before the normal answer. How would you model someone shouting ? the ruby `upcase` method may give you a hint :)

### interface.rb
- Write the code for the interface that makes you discuss with your coach through the terminal
- **constraint**: This program should **"loop"**. Your coach should answer to your message and wait for your next one until you decide to get rid of him. In any case this program should exit after the first coach's answer. Use a `while..end` or `until..end` structure for that purpose.

## Learning Badges
- What's the usual flow of a program ?
- How do structures like `if..else..end` or `while..end` change this flow ?
- How do these structures work ? 
- What's a conditional statement ? Which values can it take ? What's the difference between `=` and `==` ?
- Does a simple method call change the flow of your program ?


