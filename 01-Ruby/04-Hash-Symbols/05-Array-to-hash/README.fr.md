## Contexte et objectifs

Voici quelques petits exercices pour commencer à manipuler les arrays, les hashes et les blocs. Es-tu prêt à consolider tes compétences en Ruby ?

## Spécifications

Écris une méthode `array_to_hash` qui prend un array comme argument et retourne un hash.

- Si aucun bloc n’est fourni, alors les clés du hash doivent être les indices des éléments de l’array, convertis en `String`.
- Si un bloc est fourni, appelle-le en passant l’indice de l’array et utilise le résultat retourné comme clé du hash.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

## Ressources

Jette un œil à [`Kernel#block_given?`](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)
