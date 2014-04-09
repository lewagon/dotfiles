## Background & Objectives
Chaining methods, especially iterators, is very powerful, and can become pretty addicitive in ruby... In one line of code, you get all the prime numbers between 1 and 100... As a consequence, ruby beginners are tempted to chain as much as possible their instructions to make their code DRY and use as few lines of code as possible... It isn't always a good practice, because it can make your code unreadable, for you and for others!

Here is a rule of thumb:

- Use method chaining when it benefits to your code, makes it more concise, but still very understandable
- Use intermediate variables when chaining makes your code unreadable

## Specs

- Refactor `#shuffle_word` and `quote_prime_numbers` to make these methods efficient and readable.