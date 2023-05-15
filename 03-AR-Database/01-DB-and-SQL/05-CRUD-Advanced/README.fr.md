## Contexte et objectifs

Le but de cet exercice est d'implémenter les actions CRUD restantes du défi précédent.

**Note** : Pour rappel, dans cet exercice, nous te **donnons** la variable globale `DB`, donc pas besoin d'instancier une nouvelle `SQLite3::Database` toi-même. Utilise simplement `DB.execute` dans ton code, et cela fonctionnera (mais n'hésite pas à jeter un oeil à `spec/models/post_spec.rb` pour voir comment la variable `DB` est créée).

## Configuration

Tout d'abord, copions et collons le code du challenge précédent dans le dossier de ce challenge :

```bash
# assure-toi d'être dans le bon répertoire :
cd ~/code/<user.github_nickname>/fullstack-challenges/03-AR-Database/01-DB-and-SQL/05-CRUD-Advanced

# copie ton code du challenge CRUD - Read :
cp -r ../04-CRUD-Read/app .
```

## Tests

Nous avons aussi préparé un fichier `test.rb` pour toi où la variable globale `DB` est créée de la même manière que dans `spec/models/post_spec.rb`. N'hésite pas à utiliser ce fichier pour appeler et tester tes méthodes au fur et à mesure.

## Specs

### Injections SQL

Tout comme dans l'exercice précédent, nous devons nous assurer de protéger nos bases de données contre les injections SQL. Cela signifie que nous ne devons jamais interpoler des requêtes SQL avec des données utilisateur mais utiliser `?` [**placeholders**](http://ruby.bastardsbook.com/chapters/sql/#placeholders-sqlite-gem) à la place.

ℹ️ Pour les deux parties de cet exercice, pour éviter les injections SQL, tu devras passer _plusieurs arguments_ à la méthode `.execute`. N'oublie pas de consulter les slides du cours (ou le dernier challenge) pour un rappel sur la façon de procéder !


### Partie 1 : DELETE

Dans la première partie de cet exercice, nous allons nous concentrer sur **D**elete (le `D` de `CRUD`).

Pour ce faire, nous aurons besoin de la méthode suivante :

### `#destroy`

Implémente une méthode d'**instance** `destroy` qui va supprimer la ligne concernée de la base de données. Pourquoi cette méthode est-elle une méthode d'instance, et non une méthode de classe comme `Post.find`' ou `Post.all` ? 🤔 Si tu n'es pas sûr(e), demande à ton buddy ou à un TA !

Voyons un exemple d'utilisation de cette méthode 👇

```ruby
post = Post.find(42) # Récupérer la ligne avec l'id 42.
post.destroy # TODO : se débarrasser de cette ligne dans la base de données

# Résultat attendu une fois détruite :
Post.find(42)
# => nil
```

Et encore une fois, écrivons un peu de pseudocode pour nous aider :
```ruby
# TODO : Ecrire la requête SQL pour supprimer un message spécifique de la base de données
# TODO : Utiliser DB.execute pour exécuter la requête SQL
```

### Partie 2 : CREATE & UPDATE

Dans la partie suivante de l'exercice, nous allons nous concentrer sur le **C**reate et le **U**pdate de `CRUD`.

 Pourquoi faisons-nous le `C` et le `U` ensemble ? Parce que le processus est très similaire ! Dans les deux cas, nous envoyons de nouvelles données à la base de données. La seule différence est de savoir si l'objet avec lequel nous travaillons existe déjà dans la base de données. Si c'est le cas, nous mettons à jour certaines valeurs d'une ligne existante (comment trouver une ligne existant dans la base de données ?) S'elle n'existe pas encore dans la base de données, nous insérons des valeurs et créons une nouvelle ligne.

 Lorsque nous manipulons des instances d'objets, si nous appelons `save` sur quelque chose et qu'il n'existe pas encore dans notre base de données, il sera **C**réé. S'il existe déjà, il sera simplement **U**pdated. 💡 Indice : quelle est la principale différence entre un objet existant et un objet tout neuf ?

### `#save`

Implémente une méthode **instance** `save` qui créera ou mettra à jour la ligne concernée dans la base de données. Encore une fois, assure-toi de pouvoir expliquer pourquoi il s'agit d'une méthode d'instance comme `destroy` plutôt qu'une méthode de classe comme `Post.find`.

Voyons un exemple d'utilisation de cette méthode 👇

```ruby
post = Post.new(title : "Awesome article")
post.id
# => nil (le post n'est pas encore persisté)
post.save # Doit ajouter une nouvelle ligne !
post.id
# => 1 (résultat attendu, la base de données a inséré une ligne, et stocké l'id en mémoire)

post.title = "Awesome article, updated"
post.save # Doit mettre à jour la ligne existante dans la base de données !
post.title
# => "Awesome article, updated"
```

Et écrivons un peu de pseudocode pour nous aider avec les étapes :
```ruby
# TODO : Déterminer si l'article doit être *créé* ou *mis à jour*
# TODO : Si l'article existe déjà :
  # TODO : Ecrire la requête SQL pour mettre à jour l'article dans la base de données
  # TODO : Utiliser DB.execute pour exécuter la requête
# TODO : Si l'article est nouveau,
  # TODO : Ecrire la requête SQL pour ajouter un nouvel article dans la base de données
  # TODO : Utiliser DB.execute pour exécuter la requête
  # TODO : Mettre à jour l'@id de l'article en utilisant les données de la base de données
```

💡 HINT : Vous pouvez avoir besoin d'utiliser [last\_insert\_row\_id](http://zetcode.com/db/sqliteruby/connect/), comme nous l'avons vu dans le cours 😉.
