## Background & Objectives
In this challenge, we'll discover how some methods are more efficient than others and lead to reduce computation time. Have you thought about this when manipulating arrays?

This concept is a big chapter in Computer Science, it is called **time complexity**.


## Specs

### View Logic

You'll start by writing an algorithm to find a book on a shelf among a small dozen of books. Then you'll move into a huge library and you'll test your algorithm against a massive amount of books.

We only know the title of our book, we want to find its index in the array of books.

### Find a book on a shelf

![Shelf](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/shelf.png)

Write the function `find_book` to pick a book from an array, looping through the array with `each_with_index`.

- the function takes two parameters: an array of books and the name of the book you're looking for.
- it should return the index of the book in the array.
- it should return **Not found** when the book doesn't exist
- use `each_with_index`

```ruby
# books sample you can use to test your method
books = [
	"A Smarter Way to Learn",
	"Advanced Ruby",
 	"Component-Based Applications",
	"Computer Science Distilled",
	"Eloquent JavaScript",
	"Github Explained",
	"Lead the Way",
	"Learn Ruby On Rails",
	"Markdown Guide",
	"Open Source",
	"Remote",
	"The Foundational Concepts"
]
```

In this example, we manipulate a dozen books. The iteration will run 12 times **at the most**, which takes around 0.01ms.
But what would happen if we use the same algorithm to find a book among a million? Are we going to iterate a million times?!
There must be a more effective way.

### Find a book in a library

Let's figure out the library, we'll think of a method to reduce the iterations.
**The books are already sorted alphabetically (it's important!)**.

![Library](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/library.png)

Code the `find_book_enhanced` function:

1. Pick the book in the middle of the array.

1. Compare this book with the title you're looking for:
	- Is it your book? Return the index, you're done!
	- Is your book before or after the pivot book? Follow up to step 3!

1. Select the section of the array where your book is.

1. Do the whole process all over again.

## Time Complexity
**Time Complexity** is what you discovered here: how many instructions the algorithm needs to run on average to find the solution. It is basically an equation which scales with the amount of items.

### Big O notation
It is noted **O** and specified with **n**, where **n** is the number of items.

Example:

- The function `find_book` is O(n): for every book, there is one possible instruction. The more books, the more iterations. The worst case performance takes n iterations. This method is called **linear search**.

- The function `find_book_enhanced` is O(log2 n): for every search, there are twice least possibilities than the previous. On a larger library, the number of instructions increases slowly. What is happening here? We built a loop in which we cut possibilities by two every iteration. We started with one million books, then there was only 500K left, then 250K and so on. Every time, we only check if the pivot book is the one.
This process is called **binary search** and is a very optimized way to reduce computation time.

![Equations](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/equations.png)


## Further suggestions & resources

- If you want to become a developer, you'll likely have questions about Time Complexity during interviews.

- Ruby implements [native binary search](https://ruby-doc.org/core-2.6.5/Array.html#method-i-bsearch)

- Read more: [WTF is time complexity?](https://remimercier.com/wtf-time-complexity), written by [Rémi Mercier](https://kitt.lewagon.com/alumni/merciremi)
