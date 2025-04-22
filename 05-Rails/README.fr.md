Rails, enfin !

## Première semaine - Introduction à Rails

C'est la dernière « vraie semaine » sur Kitt avec des challenges quotidiens. À partir de la semaine prochaine, tu commenceras à travailler sur des projets plus longs, sur un clone d'Airbnb ou ton projet personnel. On commencera par se pencher sur l'architecture d'une nouvelle application Rails et on essaiera de comprendre comment elle fonctionne. **Tu créeras une application Rails par jour**.

### `01 Routes, contrôleur et vues`

Au cours de la première journée, tu verras le flux standard de Rails `routes > contrôleur > vue` sans ajouter la couche modèle et expliquer les paramètres (`params`). Pendant la journée, tu transformeras les challenges Ruby de la Semaine 1 en applications Rails.

### `02 Modèles et CRUD`

Et revoilà ce bon vieux Active Record ! **C'est l'un des cours les plus importants sur Rails.** Ton prof principal codera les 7 actions CRUD à partir de zéro et introduira la construction de routes `resources`. Sois attentif ! 🤓

### `03 Construction de routes avancée`

Aujourd'hui, tu ajouteras un deuxième modèle à une application Rails en créant un clone à deux modèles de Yelp, avec des restaurants et des avis. Le cours du matin abordera la construction de routes avancées et les validations dans Rails **au-delà du CRUD**.

### `04 Rails assets`

Tu découvriras la meilleure configuration pour utiliser Bootstrap SASS, et comment passer de `form_with` à `simple_form_for` en utilisant la configuration Simple Form de Bootstrap.

Tu découvriras également l'asset pipeline (pipeline d'actifs).

Pour les exercices, tu commenceras un projet de création d'une application de films à voir sur deux jours, avec 3 modèles `Movie`, `Bookmark`, et `List`.
Tu devras suivre attentivement la configuration front-end pour créer une application attrayante.

### `05 Hébergement et chargement d'images`

Le cours du matin se divise en deux parties :
**Hébergement** : Déploiement sur [Heroku](http://heroku.com/)

**Chargement d'images** : On hébergera des images sur [Cloudinary](http://cloudinary.com/) en utilisant [ActiveStorage](https://guides.rubyonrails.org/v6.0.1/active_storage_overview.html). Le cours t'expliquera aussi comment obtenir tes clés API en utilisant la gem [dotenv](https://github.com/bkeepers/dotenv). **Écoute attentivement si tu ne veux pas qu'on te vole tes coordonnées bancaires sur Github.**

Puis ce sera **l'heure du dernier quiz** ! Ne sois pas triste ! 😢

On vérifiera que tu as bien compris toutes les notions clés de Rails.

## Deuxième semaine - Airbnb

**Airbnb** ! Pendant la deuxième semaine, tu travailleras avec ton équipe projet (3 ou 4 personnes). L'objectif sera de créer un MVP d'Airbnb à partir de zéro. Tu auras 5 jours pour avancer autant que possible sur ton clone.

- Première démo mercredi (à 17h)
- **Démo officielle vendredi ! (à 17h)**

**Pas de séance de livecode à 17h cette semaine.** Mais il y aura quand même un cours à 9h sur de chouettes sujets. N'oublie pas de mettre ton réveil ! Voici un aperçu de ce qui t'attend :

### `06 Devise`

Le cours du matin se divise en deux parties :

- Authentification avec la gem [Devise](https://github.com/plataformatec/devise).
- Techniques de collaboration avec git et Github. Tu apprendras à travailler au sein d'une équipe de développeurs en utilisant des `branches` et des `pull requests`. C'est un système que tu utiliseras dans tous tes projets de développement, alors écoute bien !

### 07 JavaScript dans Rails

Tu apprendras à utiliser Stimulus et `importmap` pour implémenter de nouvelles fonctionnalités JavaScript et utiliser des bibliothèques externes dans Rails.

### `08 Géocodage`

Le cours du matin abordera le géocodage (avec la gem `geocoder`) et les grandes lignes de l'utilisation de l'API Google pour ajouter une fonction d'auto-remplissage sur les champs "input" de formulaires d'adresse.

Puis à 17h, tous les groupes feront une démo de leur dernière version du clone d'Airbnb devant la classe.

### `09 Recherche`

Le cours d'aujourd'hui abordera le concept de recherche, de l'utilisation d'ActiveRecord pour commencer à des solutions plus robustes comme ElasticSearch ou Algolia.

### `10 Pundit`

Dans la foulée de Devise, on t'apprendra à gérer l'**autorisation** dans ton application Rails et à t'assurer que seul le créateur du restaurant peut le mettre à jour ou le supprimer !


### Préparation des projets (week-end)

Tu as fait un excellent travail, on est très fiers de toi !

C'est le moment de la finale : les projets ! Pendant le week-end, prends le temps de réfléchir à ton projet :

- Rédige tes stories utilisateur (pas plus de 15).
- Dessine une maquette de tes vues principales.
- Commence à créer le schéma de ta base de données sur [db.lewagon.com](http://db.lewagon.com).
- Commence à réfléchir à tes routes.

Si tu arrives à faire tout cela, tu gagneras du temps pour te lancer dans ton projet plus rapidement lundi.
