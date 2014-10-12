You are given this global object, holding sentences in different languages.

```ruby
$strings = {
 home: {
   intro: {
     en: 'Welcome on Le Wagon',
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

Write a function `translation` that handle translations the following way

```ruby
translation('home.intro', 'fr') # => 'Bienvenue sur Le Wagon'
translation('home.intro', 'es') # => 'Welcome on Le Wagon'
translation('home.content.goodbye') # => 'Goodbye'
translation('unvalid.path','en') # => ''
```

So the first argument is a string that describes the path through the keys separated by a dot (we assume no dots in keys), and the second argument is the language, which falls back to `'en'` if not provided or does not exist.
