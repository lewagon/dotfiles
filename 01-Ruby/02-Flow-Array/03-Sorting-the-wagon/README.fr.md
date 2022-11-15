## Contexte et objectifs

La [classe `Array`](https://ruby-doc.org/core-2.7.5/Array.html) est l’une des deux structures principales utilisées pour stocker et accéder à des données en Ruby. (L’autre est [Hash](https://ruby-doc.org/core-2.7.5/Hash.html), que l’on verra demain.)

Un array est ordonné, si bien que chaque élément est accessible par son **indice** (index). Cet exercice t’aidera
à comprendre comment créer un array, comment stocker des données dedans et comment récupérer ces données en utilisant l’indice.
Souviens-toi que les indices des arrays commencent à `0`, et non à `1`.

On demande souvent aux développeurs de trier des choses ; on te conseille donc de te renseigner sur [les algorithmes de tri](https://fr.wikipedia.org/wiki/Algorithme\_de\_tri).

Dans la documentation Ruby, tu devrais trouver plusieurs façons de trier un [Enumerable](http://ruby-doc.org/core-2.5.3/Enumerable.html). `Array` est une forme d’`Enumerable` ; tu peux donc utiliser toutes les méthodes référencées dans la documentation `Enumerable` quand tu utilises un `Array`, car `Array` **inclut** le module `Enumerable`.

## Spécifications

- Implémente une méthode `wagon_sort` qui prend un argument, un array de noms d’étudiants (`String`), et retourne un array de ces noms d’étudiants triés par ordre alphabétique.
- La méthode de tri ne doit pas tenir compte de la casse ; `bob` doit apparaître avant `Felix` (regarde la [table de caractères ASCII](http://www.asciitable.com/))
- La méthode doit respecter l’orthographe des noms.

### Programme interactif

Ouvrez le fichier `interface.rb` et assurez-vous d'utiliser la méthode `wagon_sort`. L'interface devrait avoir une sortie correctement stylisée. Les noms doivent être séparés par des virgules (`, `) sauf pour les deux derniers qui doivent être séparés par le mot `and`. Les noms doivent également être sur une nouvelle ligne.

Elle doit fonctionner comme ceci :

```bash
ruby lib/interface.rb

Type a student name:
felix
Type another student name or press enter to finish:
Cedric
Type another student name or press enter to finish:
bob
Type another student name or press enter to finish:

Congratulations! Your Wagon has 3 students:
bob, Cedric and felix
```

## Enseignements clés

Familiarise-toi avec les opérations de base des arrays. Tu dois maintenant connaître la syntaxe à utiliser pour :

- créer un array
- ajouter un nouvel élément à l’array
- accéder au n-ième élément
- mettre à jour un élément
- supprimer un élément situé à un indice donné
