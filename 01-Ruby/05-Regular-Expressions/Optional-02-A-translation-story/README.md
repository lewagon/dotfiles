We've given you a `STRINGS` constant below that contains sentences in different languages:

```ruby
STRINGS = {
 home: {
   intro: {
     en: 'Welcome to Le Wagon',
     fr: 'Bienvenue sur Le Wagon'
   },
   content: {
     explanation: {
       en: 'This is an interesting exercise',
       fr: 'C\'est un exercice interessant',
       de: 'Es ist eine interesante Übung'
     },
     goodbye: {
       en: 'Goodbye',
       fr: 'Au revoir',
       es: 'Adios'
     }
   }
 }
}
```

Write a function `translation` that handles translations in the following way:

```ruby
translation('home.intro', 'fr') # => 'Bienvenue sur Le Wagon'
translation('home.intro', 'en') # => 'Welcome to Le Wagon'
translation('home.content.goodbye') # => 'Goodbye'
translation('invalid.path','en') # => ''
```

So the first argument is a string that describes the path through the keys separated by a dot (we assume no dots in keys), and the second argument is the language, which falls back to `'en'` as a default if one is either not provided or does not exist.
