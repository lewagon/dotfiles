## Contexte et objectifs

Le but de cet exercice et du suivant est d'implémenter chacune des opérations `CRUD` et de construire une copie de [Hacker News](https://news.ycombinator.com). Pour ceux qui ne le savent pas, HackerNews est un site d'informations _très minimal_ (avec un accent sur l'informatique et la technologie), où les utilisateurs peuvent soumettre des liens vers des articles et où d'autres utilisateurs peuvent choisir de "upvote" ces liens d'articles.

**Note** : dans cet exercice, comme dans le précédent, nous te **donnons** la variable globale `DB`, donc pas besoin d'instancier une nouvelle `SQLite3::Database` toi-même. La différence avec le dernier exercice est que cette fois la `DB` est une **variable globale**, ce qui signifie qu'elle est accessible partout dans ton code, donc il n'y a pas besoin de passer la db en argument comme nous l'avons fait dans le dernier défi. Utilise simplement `DB.execute` n'importe où dans ton code, et cela fonctionnera (mais n'hésite pas à jeter un oeil à `spec/models/post_spec.rb` pour voir comment la variable `DB` est créée).

## Tests

Nous avons aussi préparé un fichier `test.rb` pour toi, où la variable globale `DB` est créée de la même manière que dans `spec/models/post_spec.rb`. N'hésite pas à utiliser ce fichier pour appeler et tester tes méthodes au fur et à mesure.

## Specs

### Partie 1 : Configurer notre modèle

Nous t'avons donné un fichier `post.rb` avec une classe `Post` définie à l'intérieur afin de gérer la table `posts`, définie dans la base de données comme suit :

```sql
CREATE TABLE `posts` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes` INTEGER
) ;
```

#### `#initialize`

Comme toujours, la première chose à faire lors de la création d'un modèle est de définir les attributs du modèle. Donc, en utilisant la définition de la table ci-dessus, ajoute la méthode `initialize` dans ta classe `Post` et stocke les colonnes de la table en tant que variables d'instance.

#### getters et setters

La prochaine étape est de définir quels attributs (s'il y en a) sont **lisibles** (**readable**) et lesquels sont **écrivables** (**writable**). Pour notre clone de HackerNews :

  - l'`id` peut être révélée mais ne doit pas être modifiable
  - le `title` et le `url` peuvent être vus et édités
  - le nombre de `votes` peut être vu et augmenté par le biais du upvoting, mais ne doit pas être directement modifiable.

### Partie 2 : READ
Dans cette partie de l'exercice, nous allons nous concentrer sur l'implémentation de nos actions **R**ead (le `R` de `CRUD`).

Il y a deux scénarios dans lesquels nous voulons **lire** dans notre base de données :

  1. Afin de _trouver_ un message spécifique
  2. Ou pour obtenir _tous_ les messages que nous avons

Implémentons ces scénarios avec les méthodes suivantes :

#### `#find`

Implémenter une méthode **classe** `find(id)` sur la classe `Post` qui prend un `integer` comme argument (l'identifiant du message) et retourne une instance de `Post`.

Utilisons du **pseudocode** pour nous aider à décomposer les étapes dont nous aurons besoin :

```ruby
# TODO : Ecrire la requête SQL pour obtenir le post avec l'id donné
# TODO : Utiliser DB.execute pour exécuter la requête SQL
# TODO : Retourner l'article trouvé - en tant qu'instance d'un article !
```

☝️ Assure-toi d'utiliser la variable globale `DB` définie dans le programme, tu n'avez pas besoin de l'instancier toi-même !

💡 HINT : faites attention au **type de données** que tu obtiens en retour de la méthode `DB.execute` par rapport au type de données **que tu dois** avoir à l'intérieur de ton modèle. Comment s'assurer que l'on obtient une instance `Post` ?

##### Injections SQL

Comme nous l'avons appris dans le cours, nous devons également protéger notre méthode `find` contre les **injections SQL**. Pour rappel, une injection SQL est un problème de sécurité sérieux, où un attaquant peut interférer avec ton application au moyen de requêtes malveillantes vers la base de données. Les effets potentiels sont, par exemple, de permettre à un utilisateur mal intentionné d'accéder à des données restreintes, c'est-à-dire des numéros de sécurité sociale, des cartes de crédit ou des mots de passe 😱. Dans certains cas, l'attaquant peut même modifier ou supprimer des données, endommageant ainsi définitivement l'application. Si tu souhaites en savoir plus sur les injections SQL et voir quelques exemples, consulte la section _Ressources supplémentaires_ en bas de ce challenge.

Pour protéger ta base de données contre les injections SQL, tu ne dois jamais interpoler les requêtes SQL avec des données utilisateur mais utiliser `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) à la place.

ℹ️ Pour cet exercice, afin d'éviter les injections SQL, tu devras passer _plusieurs arguments_ à la méthode `.execute`. N'oublie pas de consulter les slides du cours pour un rappel sur la façon de procéder.

#### `#all`

Ensuite, implémente une méthode **classe** `all` sur la classe `Post` qui ne prend aucun argument et qui retournera un tableau contenant toutes les instances `Post` que notre base de données possède.

Encore une fois, utilisons du **pseudocode** pour nous aider à décomposer nos étapes :

```ruby
# TODO : Ecrire la requête SQL pour récupérer tous les posts de la base de données
# TODO : Utiliser DB.execute pour exécuter la requête SQL
# TODO : Retourner un tableau de tous les billets - tous en tant qu'instances de billets !
```

Tout comme dans la méthode `#find`, nous devons faire attention aux **types de données** que nous obtenons en retour de la méthode `DB.execute` par rapport aux types de données **que nous devons** avoir dans notre modèle !

**En option : Refactoring**

Tu peux remarquer que nous finissons par nous répéter dans les méthodes `#find` et `#all`, lorsque nous avons besoin de convertir nos données de réponse de la base de données en instances de `Post`. Si tu le souhaites, essaye de refactoriser ces lignes de code en une méthode privée appelée `build_record(row)`, qui prend une ligne de données de la base et la convertit en une instance de `Post`. Ensuite, utilise cette méthode `#build_record` partout où tu en as besoin afin de convertir tes données.

## Ressources supplémentaires

Une injection SQL est un type d'attaque où la personne qui utilise ton application ne se contente pas de passer un simple entier `id` à la méthode `find`, mais ajoute une chaîne de caractères malveillante pour endommager tes données. Si tu regardes la requête SQL dans les specs, tu verras ce que nous voulons dire.

Tu peux lire [cet article Medium](https://medium.com/@yelstin.fernandes/how-to-add-items-to-a-database-table-using-ruby-sqlite3-74dcd8f931f9) et [cette réponse StackOverflow](https://stackoverflow.com/questions/13462112/inserting-ruby-string-into-sqlite#answer-13462218) pour te familiariser avec les injections SQL 👌

Si tu souhaites voir les injections SQL en action, [pirate cette banque](https://www.hacksplaining.com/exercises/sql-injection#/start) et tu auras une idée de la situation !

**Ne fais jamais confiance aux données des utilisateurs** !
