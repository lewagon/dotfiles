## Contexte et objectifs

On va créer un gestionnaire de tâches avec les fonctionnalités CRUD de base :

1. En tant qu'utilisateur, je peux lister des tâches
1. En tant qu'utilisateur, je peux afficher les détails d'une tâche
1. En tant qu'utilisateur, je peux ajouter une nouvelle tâche
1. En tant qu'utilisateur, je peux éditer une tâche (la marquer comme terminée / mettre à jour le titre et les détails)
1. En tant qu'utilisateur, je peux supprimer une tâche

Dans ce challenge, tu vas retrouver notre vieil ami [**Active Record**](http://guides.rubyonrails.org/active_record_basics.html), qui est l'ORM de Rails.

Tu n'utiliseras pas `rake` ici. Et ne crée pas ton application Rails dans `fullstack-challenges` ⛔️ Suis ces instructions à la place :

```bash
cd ~/code/<user.github_nickname>
rails new rails-task-manager --skip-active-storage --skip-action-mailbox
cd rails-task-manager
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Spécifications

### 1 - Modèle

Génère le modèle `Task` avec le bon générateur Rails. Il doit au moins contenir les colonnes suivantes :

- `title`, sous forme de `string`
- `details`, sous forme de `text`
- `completed`, sous forme de `boolean` (par défaut : `false`)

### 2 - Contrôleur

Génère un contrôleur `TasksController` vide (sans actions) avec le bon générateur Rails.

Pour cet exercice, **n'utilise pas `resources`** dans ton fichier `config/routes.rb`. L'objectif de cet exercice est de recréer les opérations CRUD de base à partir de zéro.

### 3 - En tant qu'utilisateur, je peux lister des tâches

Commence par ajouter une nouvelle route pour lister les tâches, en respectant la convention vue pendant le cours. Ajoute ensuite une action au contrôleur et sa vue. Cette action doit récupérer **toutes** les tâches et la vue doit créer une boucle dessus pour les afficher, comme sur la capture d'écran ci-dessous.

Pour tester ta vue, tu as besoin de tâches dans la base de données ! Pour en créer, lance une console `rails console` dans un autre onglet du terminal et exécute ensuite :

```ruby
Task.create(title: "Laundry", details: "Do not mix colors!")
Task.create(title: "Studying", details: "A lot of flashcards to do", completed: true)
```

⚠️ Dans la vue, n'essaie pas de coder les visuels des cases à cocher pour le moment. Tu auras l'occasion de le faire dans les questions optionnelles.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index.png)

### 4 - En tant qu'utilisateur, je peux afficher les détails d'une tâche

On a maintenant une liste de tâches et on aimerait cliquer sur le titre de la tâche pour naviguer vers une nouvelle page, sur laquelle s'afficheraient les détails de cette tâche. En respectant les conventions vues pendant le cours, ajoute une nouvelle route, une nouvelle action au contrôleur et une nouvelle vue. Cette action doit **trouver** une tâche spécifique, grâce à son `id`, directement depuis `params`.

Mets à jour la vue `index.html.erb` avec l'objet d'aide ou helper `link_to` pour créer les liens.

⚠️ Encore une fois, n'essaie pas de coder les visuels des cases à cocher dans la vue pour le moment. Tu auras l'occasion de le faire dans les questions optionnelles.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index_show.gif)

### 5 - En tant qu'utilisateur, je peux ajouter une nouvelle tâche

En respectant les conventions vues pendant le cours, ajoute deux routes pour assurer la création d'une tâche. Une route sert à afficher le formulaire Task, l'autre à gérer la requête `POST` générée lors de l'envoi du formulaire. Essaie d'utiliser directement l'objet d'aide `form_with` dans ta vue.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/new.gif)

### 6 - En tant qu'utilisateur, je peux éditer une tâche

On veut pouvoir éditer une tâche, modifier son titre et ses détails, et tout particulièrement **la marquer comme terminée**. En respectant les conventions vues pendant le cours, ajoute les deux routes dont tu as besoin pour cette fonctionnalité. Code les actions du contrôleur et les vues.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/edit.gif)

### 7 - En tant qu'utilisateur, je peux supprimer une tâche

Dernière fonctionnalité : on veut pouvoir éliminer des tâches directement depuis la liste. Une confirmation JavaScript pourrait être utile.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/destroy.gif)

### 8 - Refactorisation (optionnel)

Examine ton code d'un œil critique et introduis les éléments de refactorisation suivants :

1. Utilise `resources` dans `config/routes.rb`.
1. Utilise `before_action` dans le contrôleur `TasksController`.
1. Et si on épurait (DRY - Don't Repeat Yourself) un peu les vues `new` et `edit` ? Comment gérer le fait que le formulaire `new` ne doit **pas** afficher « Terminée » ? ([conseil](http://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-new_record-3F))

### 9 - Front-end (Optionnel)

**Installe les feuilles de style Bootstrap**

En suivant [la documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css), installe Bootstrap dans ton application Rails en copiant-collant la balise `link` dans le `head` de ton layout `application.html.erb` :

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Tu peux désormais utiliser n'importe quelle classe Bootstrap dans les vues de ton application Rails 🎉

**Installe Font Awesome**

Ajoute la balise `link` de Font Awesome dans le `head` de ton layout :

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

Tu peux désormais utiliser n'importe quel [icône Font Awesome gratuit](https://fontawesome.com/search?m=free) 🎉 Essaye de trouver des icônes de cases à cocher sympas !

Dans ta vue, utilise des conditiosn. Si la tâche est terminée, affiche une case cochée, sinon affiche une case non cochée.
