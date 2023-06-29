## Contexte et objectifs

Tu sais maintenant comment utiliser les migrations pour actualiser le schéma de base de données. On va pouvoir utiliser la base de données pour insérer quelques lignes et faire des requêtes. Pour cela, on va continuer à travailler avec notre clone d’Hacker News.

Avant de commencer cet exercice, pense à lire le [guide de démarrage d’Active Record](http://guides.rubyonrails.org/active_record_basics.html).

## Configuration

Comme il s’agit d’un nouvel exercice, il faut que tu crées une nouvelle base de données dans le dossier `db` :

```bash
rake db:create
rake db:migrate
```

On t’a déjà donné le fichier de migration (regarde le fichier `db/migrate`). Il doit correspondre au fichier que tu as créé à partir de zéro dans l’exercice précédent !

Vérifie que le schéma est en place en ouvrant la base de données avec `sqlite3` :

```bash
sqlite3 db/development.sqlite3
sqlite> .schema
```

## Spécifications

### 1. Créer le modèle de classe

Ajoute un modèle de classe à ta table `posts` dans le dossier `app/models`.

### 2. Utiliser le modèle pour exécuter des requêtes

On t’a donné le même squelette d’application que vendredi dernier. Tu peux le lancer avec :

```bash
ruby app.rb
```

Ouvre `app/controllers/posts_controller.rb` et implémente les méthodes. Rappel : n’écris **pas** de SQL. Contente-toi d’utiliser les méthodes Active Record avec ton modèle de classe. Il n’y a pas de `rake` pour tester la deuxième partie de l’exercice : tu devras lancer ton application dans le terminal pour la tester.

## Enseignements clés

- Qu’est-ce qu’un mapping objet-relationnel (Object-relational mapping, ORM) ? Qu’est-ce que cela simplifie ?
- De quelle convention de nommage le mapping Active Record dépend-il ? D’où la magie vient-elle ?
- As-tu remarqué qu’il est beaucoup plus pratique d’utiliser Active Record que d’écrire tout le SQL toi-même ?

