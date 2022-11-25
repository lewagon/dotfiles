## Contexte et objectifs

Aujourd'hui, on a **trois objectifs** :

1. Déployer notre watch-list sur Heroku
2. Ajouter la fonctionnalité pour charger des images
3. Un quiz Rails !

### Configuration

Tu vas continuer à travailler sur le code d'hier. Retourne dans ton dossier :

```bash
cd ~/code/<user.github_nickname>/rails-watch-list
```

Si tu as généré l'application Rails **sans** l'option `-d`, tu vas devoir migrer manuellement cette application Rails vers Postgresql pour Heroku. Tu peux vérifier que l'application est configurée avec Postgresql si la gem `pg` se trouve dans ton fichier de gems.

Si tu as besoin de modifier l'application pour Postgresql, ouvre ton fichier Gemfile et trouve la ligne `sqlite`. **Remplace**-la par :

```ruby
# Gemfile
[...]
gem "pg"
```

Ouvre le fichier `config/database.yml`, **supprime** tout son contenu et remplace-le par ce qui suit :

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
```

Ouvre ton terminal et exécute :

```bash
rails db:create
rails db:migrate
rails db:seed
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
