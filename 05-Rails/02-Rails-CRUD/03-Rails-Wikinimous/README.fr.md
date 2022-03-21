## Contexte et objectifs

On veut créer un Wiki anonyme (comme [celui-ci](https://wagon-wikinimous.herokuapp.com)), où tout le monde peut créer un nouvel article ou mettre à jour un article existant.

Tu n'utiliseras pas `rake` ici. Et ne crée pas ton application Rails dans `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-wikinimous --skip-active-storage --skip-action-mailbox
cd rails-wikinimous
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Spécifications

### 1 - Modèle

Génère le modèle `Article` avec le bon générateur Rails. Il doit au moins contenir les colonnes suivantes :

- `title`, sous forme de `string`
- `content`, sous forme de `text`

N'hésite pas à tester ton nouveau modèle dans la console `rails console` :

```ruby
new_article = Article.new(title: 'The meaning of life', content: "It's 42!")
new_article.valid?  # => should be `true`
new_article.save    # => should not display rollback warnings
Article.last        # => should be the one you just saved
```

### 2 - Seed

Ajoute la [gem `faker`](https://github.com/stympy/faker) à ton fichier `Gemfile` et exécute `bundle install`. Utilise cette gem pour générer 10 faux articles dans `db/seeds.rb`. Une fois que tu as ton code, tu peux exécuter :

```bash
rails db:seed
```

### 3 - Routes, contrôleur et vues

Génère ton contrôleur et code les 7 actions CRUD par défaut pour lister, afficher, créer, mettre à jour et supprimer un article, comme on l'a fait pour le gestionnaire de tâches. Tu peux maintenant utiliser directement le raccourci `resources` dans des routes.

Jette un œil à l'[application en direct](https://wagon-wikinimous.herokuapp.com) pour voir à quoi elle devrait ressembler. 😉
