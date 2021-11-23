## Contexte et objectifs

Maintenant que tu connais bien les migrations et les modèles, on va passer à un scénario concret. Comment vérifier que ta base de données fonctionne si tu n’as aucune **donnée** ? Pour cela, on a besoin de créer de la donnée que l’on pourra utiliser pour amorcer la base de données. C’est ce qu’on appelle une `seed`.

## Configuration

On utilisera la gem [`faker`](https://github.com/stympy/faker) pour générer les attributs `Post`. Mais tu dois d’abord l’installer :

```bash
gem install faker
```

Voici une commande utile pour supprimer (`drop`) ta base de données, la recréer (`create`), migrer le schéma (`migrate`) et créer quelques données (`seed`) dans la base. Cela te fera gagner du temps tout en te permettant de développer ta seed, et tu t’en serviras beaucoup pendant les projets, alors commence à t’habituer !

```bash
rake db:drop db:create db:migrate db:seed
```

Une fois que tu a géré ta seed, tu peux regarder les lignes que tu viens d’insérer avec `rake db:seed` en utilisant les requêtes SQL traditionnelles :

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Spécifications

Ouvre le fichier `db/seeds.rb` et écris du code pour insérer 100 posts, en utilisant les fausses données générées par la gem [`faker`](https://github.com/stympy/faker). Il y a tout un tas d’options faker amusantes, fais preuve de créativité 😊. Jette un œil [ici](https://github.com/stympy/faker#faker) !
