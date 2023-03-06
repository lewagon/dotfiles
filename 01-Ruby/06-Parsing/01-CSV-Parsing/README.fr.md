## Contexte et objectifs

- Charger une partie de la bibliothèque standard de Ruby
- Travailler avec des fichiers CSV comme données d'entrée

Pour lire un fichier CSV et en extraire les données, tu peux utiliser la bibliothèque `csv` qui est incluse dans la bibliothèque standard de Ruby. Le fichier CSV donné en exemple dans `lib/movies.csv` est tiré de [IMDB](http://www.imdb.com/boxoffice/alltimegross).

### Bibliothèque standard de Ruby

La bibliothèque standard de Ruby comprend toutes les bibliothèques utiles installées en même temps que Ruby. Par exemple, la bibliothèque [date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html), si elle est incluse dans ton programme Ruby, te permet de manipuler facilement les dates. Une bibliothèque se charge au début de ton fichier Ruby avec :

```ruby
require "date"
```

Certaines sont plus utiles que d’autres, alors prends le temps de lire la documentation !

## Spécifications

- Implémente `#most_successful` qui retourne les films (un certain nombre `number` passé en paramètre) triés par `earnings` décroissants et sortis avant l'année `max_year` et avec les recettes enregistrées `earnings`.
- **Contrainte** : la liste retournée doit être un array de films. Chaque film doit être représenté par un hash avec les clés `name`, `year` et `earnings`. Exemple: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

## Suggestions et ressources complémentaires

Pense à bien indiquer les bonnes options de codage (`encoding`) pour la lecture du CSV. Souviens-toi que certains titres sont en français avec des caractères spéciaux 😉
