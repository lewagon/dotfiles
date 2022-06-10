## Contexte et objectifs

L’objectif du jour est d’implémenter chacune des opérations du `CRUD` et de créer une copie de [Hacker News](https://news.ycombinator.com).

**Remarque** : dans cet exercice, on te **donne** la variable globale `DB` ; inutile de créer une nouvelle instance `SQLite3::Database`. Utilise simplement `DB.execute` dans ton code et ça fonctionnera (jette un œil à `spec/models/post_spec.rb` pour voir comment la variable `DB` est créée).

## Tests

On t’a préparé un fichier `test.rb` dans lequel la variable globale `DB` est créée de la même façon que dans `spec/models/post_spec.rb`. N’hésite pas à utiliser ce fichier pour tester tes méthodes.

## Spécifications

Dans ce premier exercice, on va s’attacher à lire (**R**ead, qui correspond au `R` dans le `CRUD`). Implémente une classe qui gérera une table `posts`, définie comme suit :

```sql
CREATE TABLE `posts` (
 `id` INTEGER PRIMARY KEY AUTOINCREMENT,
 `title` TEXT,
 `url` TEXT,
 `votes` INTEGER
);
```

### `initialize`

Ajoute la méthode `initialize` pour stocker les colonnes ci-dessus dans des variables d’instance. Ajoute les readers (lecteurs) et accessors (accesseurs) nécessaires.

### `find`

Implémente une méthode de **classe** `find(id)` sur la classe `Post` qui prend un integer comme argument (l’id de post) et retourne une instance de `Post`.

(On part du principe qu’il existe une variable globale `DB` définie dans le programme ; inutile de l’instancier).

On veut que tu protèges la méthode `find` des **injections SQL**. Tu te demandes peut-être ce qu’est une injection SQL. [Pirate cette banque](https://www.hacksplaining.com/exercises/sql-injection#/start) et tu auras une petite idée ! Voici une astuce pour l’exercice : Tu risques d’avoir besoin de passer plusieurs arguments à la méthode `.execute` en utilisant des [balises](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem).

### `all`

Implémente une méthode de **classe** `all` sur la classe `Post` qui ne prend pas d’argument et retourne un array contenant toutes les instances de `Post`.

## Autres suggestions

Une injection SQL est un type d’attaque dans le cadre de laquelle la personne qui utilise ton application ne se contente pas de passer un integer à la méthode `find` mais ajoute une string malveillante pour endommager tes données. Si tu regardes la requête SQL dans les specs, tu comprendras.

Tu peux lire [cet article de Medium](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9) et [cette réponse sur StackOverflow](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) pour mieux comprendre les injections SQL 👌

**Ne fais jamais confiance aux données utilisateur** !
