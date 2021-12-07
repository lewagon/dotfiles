## Contexte et objectifs

- Comprendre le concept de la migration de **schéma**
- Apprendre à exécuter des migrations sur ta base de données en utilisant des tâches `rake`.

## Spécifications

Cet exercice porte sur les **migrations**. On n’a pas de modèle pour le moment, donc tu vas devoir coder les migrations pour créer ton schéma de base de données (souviens-toi que le schéma est la **structure** de la DB, composée de tables et de colonnes, **pas de données**). Tu veux créer le schéma d’une base de données qui hébergera un clone de [Hacker News](https://news.ycombinator.com), un célèbre site Web qui partage des liens à propos des technologies et des startups. Tu as besoin d’une table `posts` pour stocker les posts (avec un titre et une URL).

Dans `db/migrate`, on a créé un fichier `20141025152200_create_posts.rb` qui contient une classe de migration Active Record. Les fichiers de migration ont toujours le format suivant : `yyyymmddhhmmss_nom_de_la_migration.rb`. Le timestamp dans le fichier est très important : il permet à `rake db:migrate` de savoir quelles migrations n’ont pas encore été exécutées.

### 1. Migration pour créer une table

Écris le code dans `20141025152200_create_posts.rb` pour créer la table `posts`.

Ta table `posts` doit contenir les colonnes suivantes :
- une string `title`
- une string `url`
- les timestamps `created_at` et `updated_at`

Exécute ensuite cette migration avec `rake db:migrate`.

Vérifie que ta table a bien été créée.

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

Tu vois autre chose que ta table `posts` ? Il s’agit de la tuyauterie d’Active Record 😊 Tu sais à quoi elle sert ?

### 2. Migration pour actualiser une table

Retourne au cours et lis la [documentation sur les migrations Active Record](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html). Tu verras comme il est facile d’effectuer des migrations sur Rails. Mais on n’a pas encore abordé Rails ;) alors tu vas devoir créer tes fichiers de migration manuellement.

Utilise la tâche `rake db:timestamp` pour obtenir un timestamp correct pour le nom de ton fichier de migration. Écris une nouvelle migration dans un nouveau fichier `db/migrate/` pour ajouter une nouvelle colonne à la table `posts`.

Appelle la colonne `votes` de type `integer` avec une valeur par défaut de `0`: un post d’utilisateur n’a pas de vote au moment de sa création.

Souviens-toi de ce qu’on a dit à propos des noms de fichier de migration ! Le format est **très** important.

Exécute ensuite cette migration avec `rake db:migrate`.

## Enseignements clés

Tu dois maintenant avoir compris que les migrations sont liées à des **changements dans la structure du schéma** (c’est-à-dire les tables et leurs colonnes).
