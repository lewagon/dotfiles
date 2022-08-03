## Contexte et objectifs

Tu sais désormais utiliser l’instance `SQLite3::Database` pour exécuter des requêtes SQL dans une base de données SQLite :

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM table_name')
# => les lignes sont un Array d’enregistrements et chaque enregistrement est un Array de colonnes.
```

Avant de passer à l'objectif principal d'aujourd'hui, nous allons faire un petit échauffement et nous entraîner à interroger la base de données. Nous utiliserons la même base de données `jukebox` que dans les exercices d'hier avant de passer à une autre dans le deuxième exercice.

## Spécifications

On t’a préparé un fichier `query.rb` avec une méthode : `all_artists`. Cette méthode doit utiliser la `db` passée en argument pour récupérer tous les enregistrements (tous les champs) de la table des artistes.
