Contexte et objectifs
---------------------

-   Utiliser un pack de la librairie standard
-   Travailler la saisie de fichiers CSV

Pour lire un fichier CSV et en extraire les données, tu peux utiliser le
pack `csv` de la librairie standard Ruby. Le fichier CSV donné en
exemple dans `lib/movies.csv` est tiré de
[IMDB](http://www.imdb.com/boxoffice/alltimegross).

### Librairie standard Ruby

La librairie standard Ruby comprend tous les packs utiles associés à ton
installation Ruby. Par exemple, le pack
[date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html),
s’il est inclus dans ton programme Ruby, te permet de manipuler
facilement les dates. Un pack se charge au début de ton fichier Ruby
avec :

``` {.ruby}
require "date"
```

Certains sont plus utiles que d’autres, alors prends le temps de
regarder !

Spécifications
--------------

-   exécute `#most_successful` qui retourne les films (un certain
    `number` passé en paramètre) sortis avant une année donnée et les
    recettes enregistrées.
-   **contrainte** : la liste retournée doit être un array de films.
    Chaque film doit être représenté par un hash avec les clés `name`,
    `year` et `earnings`. Exemple:
    `{ name: "Avatar", year: 2009, earnings: 760505847 }`

Suggestions et ressources complémentaires
-----------------------------------------

-   Pense à bien indiquer les bonnes options de codage (`encoding`) pour
    la lecture du CSV. Souviens-toi que certains titres sont en français
    avec des caractères spéciaux ðŸ˜‰

