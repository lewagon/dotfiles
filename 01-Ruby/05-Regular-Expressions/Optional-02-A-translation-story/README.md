You have this global object:

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

Write a function `getTranslation` that handle translations the following way

```ruby
getTranslation('home.intro', 'fr') # => 'Bienvenue sur Le Wagon'
getTranslation('home.intro', 'es') # => 'Welcome on Le Wagon'
getTranslation('home.content.goodbye') # => 'Goodbye'
getTranslation('unvalid.path','en') # => ''
```

So the first argument is a string that describes the path through the keys separated by a dot (we assume no dots in keys), and the second argument is the language, which falls back to 'en' if it's not provided or it does not exist (we also assume that at the end of every branch, either the 'en' keys exists, or it is a single string like in home.content.contact).

