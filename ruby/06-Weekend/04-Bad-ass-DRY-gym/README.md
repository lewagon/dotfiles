Here is a program that prints out the number of calories in a McDonald meal. But it's not very [DRY](http://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas) ! How would you do to improve it ?

Here are some thoughts that might be interesting.
* First look at the parts that are repeated in the program. How can you do to factor these parts ?
* If you decide to group these parts in one single function, what's the issue with the `calories` variable ? Learn about variable scope ! 
* Could you change this variable to a constant ? what will be the issue of such solution ? 
* Could you change it to a global variable ? Again, what will be the issue ?
* You should then consider using a `Proc` object to store a ruby block of instruction. Learn about [closures](http://en.wikipedia.org/wiki/Closure) and try to understand the difference between a method and a Proc, and why a Proc is more adapted in that case.