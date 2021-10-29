## Contexte et objectifs

On va aborder les expressions régulières (regular expressions ou regex) et, cette fois-ci, on va se pencher sur les numéros. Plus précisément, on va apprendre à manipuler les numéros de téléphone dans ton programme.

## Spécifications

Écris une méthode `french_phone_number?` qui prend une string comme paramètre et retourne un booléen `true` quand le numéro de téléphone est un numéro de téléphone français valide et `false` sinon :
- Il est valide s’il commence par un `0` et contient 10 chiffres. Le deuxième chiffre ne peut pas être un 0.
- Il est également valide s’il commence par `+33` et contient 11 chiffres. Le chiffre suivant `+33` ne peut pas être un 0.

La méthode ne doit pas tenir compte des espaces ou des tirets entre les chiffres.

```ruby
french_phone_number?("0665363636")
#=> true

french_phone_number?("07 65 36 36 36")
#=> true

french_phone_number?("01-36-65-36-65")
#=> true

french_phone_number?("02 65 36 36")
#=> false
```

## Autres suggestions

Voici une autre ressource utile pour tester tes expressions régulières ou regex avant de rédiger du code : [Rubular](http://rubular.com/)
