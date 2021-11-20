## Contexte et objectifs

Le moment est venu de passer à quelque chose de plus complexe. On va utiliser les requêtes `JOIN` pour lire les données de plusieurs tables. Pour devenir instantanément un pro des requêtes `JOIN`, [lis ceci](http://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins). L’image est très utile. Tu peux aussi [lire ceci](http://sql.sh/cours/jointures).

## Spécifications

Complète le code dans `join_queries.rb`. Chaque méthode prend un argument `db`, qui est une instance de `SQLite3::Database` sur laquelle on peut appeler la méthode `execute`. Exactement comme dans l’exercice précédent.

### Morceaux détaillés

- Implémente `detailed_tracks` pour obtenir tous les morceaux avec le nom de l’artiste et le titre des albums.
- Ton résultat doit être un array d’arrays. **Astuce :** tu vas devoir utiliser deux déclarations SQL `JOIN`.

Cette méthode doit retourner un array de morceaux. Chaque élément de cet array doit également être un array : le premier élément étant le titre du morceau, le deuxième le nom de l’album et le troisième le nom de l’artiste.

### Statistiques

Pour chaque genre de musique, trouve les statistiques, c’est-à-dire le nombre de morceaux et la durée moyenne d’une chanson (en minutes).

La méthode doit retourner un hash de statistiques :

```ruby
stats_on(db, "Rock")
# => {
# category: "Rock",
# number_of_songs: 1297,
# avg_length: 4.7
# }
```

### Top 5

Trouve le top 5 des artistes ayant le plus de chansons dans un genre donné. Cette méthode doit retourner un array d’arrays avec l’id de cet artiste, le nom de l’artiste et le nombre de chansons de chaque artiste dans le genre donné.

```ruby
top_five_artists(db, 'Rock')
# => [
# [ 22, 'Led Zeppelin', 114 ], # Led Zeppelin a 114 morceaux de rock.
# [ 150, 'U2', 112 ],
# etc.
# ]
```
