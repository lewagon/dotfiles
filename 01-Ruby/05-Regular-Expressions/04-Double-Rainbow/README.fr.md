## Contexte et objectifs

Pendant ta formation au Wagon, tu vas découvrir de nombreux outils, services et langages. En voici les principaux logos, mais ils sont tous en noir et blanc pour le moment. Le but de cet exercice est de créer un jeu pour dévoiler leurs couleurs en utilisant des expressions régulières !

![Logos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/double-rainbow_logos.png)

## Spécifications

Quelles sont les vraies couleurs des logos ? Elles sont cachées dans un **message secret**. Ta mission consiste à rédiger les expressions régulières correctes pour les extraire !

### Le message secret

*Reveal the logos' colors: Elegant shapes, some have evolved to a very iconized style. Definitely a vivid color scheme with bright orange and shiny yellow, many shades of blue, oscillating between purple and indigo! but not much green*

### Écris les expressions régulières

Ouvre le fichier `lib/double_rainbow.rb` qui contient une série de méthodes, toutes conçues pour extraire le texte du message secret :
- Suis les astuces et les instructions pour créer tes expressions régulières.
- Chaque méthode **prend une string** comme paramètre et **retourne une string**

Si ta regex est correcte, elle choisira une couleur et déverrouillera un badge.

Aide-toi de [Rubular](http://rubular.com/)

### Teste ton code

Tu peux tester ton code en appelant tes méthodes avec le message secret et en exécutant `ruby lib/test.rb` :

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
require_relative "double_rainbow"

secret_message = "Reveal the logos' colors:\
 Elegant shapes, some have evolved to a very iconized style.\
 Definitely a vivid color scheme with bright orange and shiny yellow,\
 many shades of blue, oscillating between purple and indigo! but not much green"

puts last_five_letters(secret_message)
```

**REMARQUE :** Assure-toi de copier-coller l’ensemble de la string, y compris les backslashes `\`: elles [échappent](https://blog.appsignal.com/2016/12/21/ruby-magic-escaping-in-ruby.html) les sauts de ligne pour garder `secret_message` sous la forme d’une string à une seule ligne. Faire en sorte que tes expressions régulières détectent des strings à plusieurs lignes peut être plus difficile que prévu, comme expliqué dans cette [réponse de Stack Overflow](https://stackoverflow.com/questions/4257071/ruby-regex-matches-start-of-line-even-without-m-modifier/4257912#4257912) !
