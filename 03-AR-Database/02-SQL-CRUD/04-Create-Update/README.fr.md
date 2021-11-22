## Contexte et objectifs

On part toujours du principe que ta classe `Post` a accès à une variable globale `DB` définie comme suit :

```ruby
DB = SQLite3::Database.new("a_file.db")
```

Tu peux continuer à utiliser le fichier `test.rb` pour tester tes méthodes.

## Spécifications

Dans ce quatrième exercice, on va s’attacher à créer (**C**reate, qui correspond au `C` dans le `CRUD`) et mettre à jour (**U**pdate, qui correspond au `U` dans le `CRUD`). Pourquoi s’occuper du `C` et du `U` en même temps ? Car le processus est très similaire. Quand on manipule des instances d’objet, si on appelle `save` sur un objet qui n’existe pas encore dans notre DB, alors cet objet sera **créé**. S’il existe déjà, il sera simplement **mis à jour**.

### `save`

Implémente une méthode d’**instance** (pourquoi s’agit-il d’une méthode d’instance comme `destroy`, et non d’une méthode de classe comme `Post.find` ?) `save` qui créera ou actualisera la ligne concernée dans la base de données

```ruby
post = Post.new(title: "Awesome article")
post.id
# => nil (le post n’est pas encore stocké)
post.save # À FAIRE : stocker l’enregistrement !
post.id
# => 1 (résultat attendu, la base de données a inséré une ligne et stocké l’id en mémoire)

post.title = "Awesome article, updated"
post.save # À FAIRE : doit actualiser l’enregistrement dans la base de données)
```

Tu pourrais avoir besoin d’utiliser [last_insert_row_id](http://zetcode.com/db/sqliteruby/connect/).
