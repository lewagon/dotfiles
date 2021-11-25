## Contexte et objectifs

On part toujours du principe que ta classe `Post` a accès à une variable globale `DB` définie comme suit :

```ruby
DB = SQLite3::Database.new("a_file.db")
```

Tu peux continuer à utiliser le fichier `test.rb` pour tester tes méthodes.

## Spécifications

Dans cet exercice, on va s’attacher à supprimer (**D**elete, qui correspond au `D` dans le `CRUD`).

### `destroy`

Implémente une méthode d’**instance** (pourquoi s’agit-il d’une méthode d’instance et non d’une méthode de classe comme `Post.find` ?) `destroy` qui supprimera la ligne concernée de la base de données.

```ruby
post = Post.find(42) # Obtiens la ligne avec l’id 42.
post.destroy # À FAIRE : se débarrasser de cette ligne dans la base de données

# Résultat attendu
Post.find(42)
# => nil
```

Cet exercice doit prendre moins de temps que le précédent 😊
