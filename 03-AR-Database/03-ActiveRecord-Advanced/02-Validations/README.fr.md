## Contexte et objectifs

Maintenant que les associations sont en place entre `Post` et `User`, on va ajouter une validation aux modèles pour vérifier qu’on ne stocke pas de données **erronées** dans la base de données. Avant d’attaquer les exercices, prends 15 minutes pour lire ce super guide, du début à la fin :

[guides.rubyonrails.org/active_record_validations](http://guides.rubyonrails.org/active_record_validations.html)

## Configuration

Il existe déjà une migration pour créer les tables `posts` et `users` (regarde dans le dossier `db/migrate`). Tu peux exécuter ces migrations comme suit :

```bash
rake db:create
rake db:migrate
```

## Spécifications

### Ajouter des validations au modèle `User`

- Un utilisateur doit avoir un nom d’utilisateur (`username`)
- Un utilisateur doit avoir une adresse e-mail (`email`) **valide**
- Chaque utilisateur doit avoir un nom d’utilisateur (`username`) **unique**

### Ajouter des validations au modèle `Post`

- Un post doit avoir un titre `(title`), une `url` (au bon format !) et un utilisateur (`user`)
- Le titre (`title`) d’un post doit contenir au moins 5 caractères
- Chaque post doit avoir un titre (`title`) unique (non sensible à la casse)

### Bonus : Callbacks

On ne les a pas abordées dans le cours, mais tu dois savoir qu'il existe dans Active Record des fonctions de rappel (callbacks). **Un callback est un bout de code appelé quand un événement se produit**.

Exemple: quand une instance d’utilisateur est sur le point d’être validée, on appelle une méthode pour faire un peu de nettoyage avant. On veut, par exemple, mettre le nom d’utilisateur (`username`) en minuscules.

Pour cela, on peut utiliser le code suivant :

```ruby
class User
 before_validation :lower_username

 private

 def lower_username
  self.username = username.downcase unless username.nil?
 end
end
```

Lis le [guide sur les callbacks Active Record](http://guides.rubyonrails.org/active_record_callbacks.html) pour répondre à la dernière question facultative.

Implémente un callback pour retirer les espaces qui auraient été saisis au début ou à la fin de l’e-mail par l'utilisateur, à déclencher avant les validations.

Implémente un callback qui se déclenche après la création d’un utilisateur, pour lui envoyer un **e-mail de bienvenue**. Découvre les [callbacks disponibles](http://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks) et détermine quel callback utiliser.

Pour simuler l’envoi d’un e-mail, tu peux utiliser la méthode suivante :

```ruby
FakeMailer.instance.mail("boris@lewagon.org", "Welcome to HN!")
```
