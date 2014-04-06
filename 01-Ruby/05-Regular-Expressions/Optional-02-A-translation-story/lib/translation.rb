STRINGS = {
 home: {
   intro: {
     en: 'Welcome on Le Wagon',
     fr: 'Bienvenue sur Le Wagon'
   },
   content: {
     explanation: {
       en: 'This is an interesting exercise',
       fr: 'C\'est un exercice interessant',
       de: 'Es ist eine interesante Ãbung'
     },
     goodbye: {
       en: 'Goodbye',
       fr: 'Au revoir',
       es: 'Adios'
     }
   }
 }
}

def getTranslation(a_string, a_language)
  # your code goes here
end

# testing your program 
getTranslation('home.intro', 'fr') == 'Bienvenue sur Le Wagon' # => true
getTranslation('home.intro', 'es') == 'Welcome on Le Wagon' # => true
getTranslation('home.content.goodbye') == 'Goodbye' # => true
getTranslation('unvalid.path','en') == '' # => true