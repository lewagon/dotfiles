## Contexte et objectifs

Tu vas continuer avec ton application Hacker News. Aujourd’hui, tu vas ajouter une couche utilisateur ; pour cela, tu dois te connecter avant de publier un nouveau post.

(Mais tu n’as pas besoin de te connecter pour voir les posts.)

## Configuration

On t’a donné une première migration pour créer la table `posts`.

```bash
rake db:create
rake db:migrate
```

## Spécifications

### Ajouter un modèle `User`

On te fournit le schéma de base des posts (regarde la migration existante dans le dossier `db/migrate`).

Commence par générer une nouvelle migration pour créer le modèle `User`. Le modèle doit contenir les champs suivants :
- `username`
- `email`

### Migration : un User a plusieurs posts

Génère une autre migration pour créer des références one-to-many entre `User` et `Post`.

Pense à ajouter le code dans tes modèles pour pouvoir accéder à des posts depuis une instance utilisateur, et à l’utilisateur depuis une instance de post donnée.

### Alimenter avec des utilisateurs et des posts

Écris une seed pour remplir ta base de données avec 5 utilisateurs ayant chacun entre 5 et 10 posts. Tu peux utiliser la stratégie de ton choix (faker ou API).

Ne passe pas trop de temps à essayer d’utiliser l’API. Souviens-toi que l’objectif ici est de travailler avec les associations.
