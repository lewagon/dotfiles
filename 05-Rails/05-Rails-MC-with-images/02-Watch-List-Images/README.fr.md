## Contexte et objectifs

Aujourd'hui, on a **trois objectifs** :

1. Déployer notre watch-list sur Heroku
2. Ajouter la fonctionnalité pour charger des images
3. Un quiz Rails !

### Configuration de la Base de Données

Si tu as suivi les commandes hier, ta base de données devrait déjà être correctement configurée pour le déploiement sur Heroku 🚀

Vérifions pour être sûrs. Ouvre le `Gemfile`. As-tu cette ligne ci-dessous ?

```ruby
# Gemfile
[...]
gem "pg"
```

✅ Si oui, passe à la prochaine section (Premier Déploiement).

❌ Si non, nous devrons modifier quelques fichiers de configuration. Suis les instructions sous la section de divulgation "Changer DB à Postgres" ici :

<details>
<summary markdown='span'>Changer DB à Postgres</summary>
Ouvre le fichier `config/database.yml`, **supprime** tout et remplace-le par :

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: 5

development:
  <<: *default
  database: rails-watch-list_development

test:
  <<: *default
  database: rails-watch-list_test

production:
  <<: *default
  database: rails_watch_list_production
  username: rails_watch_list
  password: <%= ENV["RAILS_WATCH_LIST_DATABASE_PASSWORD"] %>
```

Ouvre ton terminal et lance :

```bash
rails db:create
rails db:migrate
rails db:seed
```
</details>

### Configuration

Tu vas continuer à travailler sur le code d'hier. Retourne dans ton dossier :

```bash
cd ~/code/<user.github_nickname>/rails-watch-list
```

### Premier déploiement

Réfère-toi au cours et suis les étapes pour déployer ton application en production sur Heroku. Pour cela, tu devras t'inscrire au service et récupérer tes crédits gratuits.

### Chargement d'images

On obtient les affiches de films (`movies`) de nos seeds grâce à l'[API TMDB](https://developers.themoviedb.org/3), mais une affiche de film ne représente pas l'ensemble d'une liste. L'objectif est donc d'**ajouter une image** au modèle `List`, afin que chaque liste soit mieux illustrée.

L'utilisateur doit pouvoir charger une image qui s'affichera ensuite sur la vue `index` d'une `List` sous la forme d'une vignette/couverture. Sur la vue `show` d'une `List`, la même image doit s'afficher, mais en plus grand, suivie des films enregistrés dedans !

Il s'agit d'une application simple, mais fais de ton mieux pour la rendre jolie en utilisant Bootstrap, une police sympa et ton imagination 🎨😊🎨

**Conseil** : Tu peux toujours te servir du [Kit UI Le Wagon](https://uikit.lewagon.com/) comme base.

Pour avoir un aperçu de tous les helpers d'images fournis par Rails (`image_tag`, `image_path`, `asset-url`, ...), consulte la [fiche d'aide](https://kitt.lewagon.com/knowledge/cheatsheets/rails_image_helpers) 👈

### Avis (optionnel)

Si tu as terminé avec les images, essaie d'ajouter un système d'avis anonymes aux listes de films, pour que tout le monde puisse donner son avis sur la sélection de films de nos listes !

## Aller plus loin

Félicitations, tu as terminé le challenge Watch-List ! Tu peux maintenant partager ta super application avec tout le monde !

Mais il y a un problème... N'importe qui peut créer une liste, ajouter des signets à tes listes ou supprimer tes films favoris. Et les avis sont complètement anonymes. 😔

Lors de la prochaine session, on verra comment régler ce problème. On abordera l'authentification et l'autorisation des utilisateurs au cours des deux prochaines séances. 😉
