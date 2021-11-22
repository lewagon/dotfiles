## Contexte et objectifs

Tu sais désormais utiliser l’instance `SQLite3::Database` pour exécuter des requêtes SQL dans une base de données SQLite :

```ruby
DB = SQLite3::Database.new("a_file.db")
rows = DB.execute('SELECT * FROM table_name')
# => les lignes sont un Array d’enregistrements et chaque enregistrement est un Array de colonnes.
```

Avant de passer au premier objectif du jour, on va revoir comment requêter la base de données. Pour cela, on utilisera la base de données `jukebox` des exercices d’hier.

## Spécifications

On t’a préparé un fichier `query.rb` avec une méthode : `all_artists`. Cette méthode doit utiliser la `db` passée en argument pour récupérer tous les enregistrements (tous les champs) de la table des artistes.
