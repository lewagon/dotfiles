## Contexte et objectifs

La gem `faker` est sympa, mais ce serait encore mieux de pouvoir importer directement de **vraies** données depuis Hacker News, non ? Et bien, c’est possible ! On peut le faire grâce à leur [API](https://github.com/HackerNews/API).

## Configuration

On va utiliser le [client rest](https://github.com/rest-client/rest-client) pour appeler l’API d’Hacker News. Commence par installer la gem :

```bash
gem install rest-client
```

Tu peux réutiliser la séquence `drop` `create` `migrate` `seed` pour tester ta seed.

```bash
rake db:drop db:create db:migrate db:seed
```

Une fois que tu as géré la seed, tu peux regarder les lignes que tu viens d’insérer avec `rake db:seed` en utilisant les requêtes SQL traditionnelles :

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Spécifications

Ouvre le fichier `db/seeds.rb` et écris du code pour insérer **10** posts, (**Pas 100**, sinon on risque de se faire bannir de l’API) à partir des données de l’API d’Hacker News.

Tu peux appeler l'endpoint de l’API <https://hacker-news.firebaseio.com/v0/topstories.json>. Cela te donnera un array des 100 derniers id de posts. Puis pour les 10 premiers (PAS 100 !) id, tu dois appeler l’API pour obtenir les détails d’un post.

À titre d’exemple, si tu veux obtenir des détails sur le post `20916749`, tu dois appeler <https://hacker-news.firebaseio.com/v0/item/20916749.json>
