## Contexte et objectifs

Voici quelques petits exercices pour commencer à manipuler les arrays, les hashes et les blocs. Es-tu prêt à consolider tes compétences en Ruby ?

## Spécifications

Écris une méthode `array_to_hash` qui prend un `Array` comme argument et retourne un `Hash`.

-   Si aucun bloc n’est fourni, alors les clés de hachage doivent être des index entiers d’éléments dans l’array, convertis en `Strings`.
-   Si un bloc est fourni, appelle-le en passant l’index de l’array et utilise le résultat retourné comme clé de hachage.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/array_to_hash.png)

## Ressources

Jette un œil à [`Kernel#block_given?`](http://ruby-doc.org/core/Kernel.html#method-i-block_given-3F)
