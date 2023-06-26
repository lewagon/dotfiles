Tout le monde ne sera pas en mesure de s'occuper de la configuration de l'app ; c'est donc le moment idéal pour répartir le reste des tâches entre les membres de ton équipe pour que tout le monde ait quelque chose à faire.


## Rails new

Commence par désigner le développeur principal pour ce projet au sein de ton équipe. Il peut s'agir de la même personne que pour le projet Airbnb, ou d'un autre membre. Cette personne sera ensuite chargée du reste de la configuration de l'app.

Au début de ton projet Rails, tu **dois** utiliser l'un des [**modèles Rails du Wagon**](https://github.com/lewagon/rails-templates/tree/master). Assure-toi d'utiliser le [modèle Devise](https://github.com/lewagon/rails-templates/tree/master#devise) si tu as besoin d'un modèle `User` !

Une fois l'app créée, crée ton dépôt Github et ajoute tous les membres de ton équipe en tant que collaborateurs. Réfère-toi aux [diapos du cours sur Github](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F06-Airbnb-Devise#/1/3/0) pour te faire une idée du processus.

Crée ensuite l'app Heroku et procède à ton premier déploiement. Réfère-toi aux [diapos du cours sur Heroku](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F05-Rails-MC-with-images#/0/2/5) si tu as besoin de te rafraîchir la mémoire.

Conseil : Exécute toujours `heroku run rails db:migrate` après avoir poussé sur Heroku pour t'assurer que ta base de données de production est à jour.

## Programmer ensemble (Pair Programming)

Se répartir le travail et commencer à coder peut être difficile avec un projet vide. Génère tes **modèles principaux** sur l'ordinateur du développeur principal en [pair-programming](https://en.wikipedia.org/wiki/Pair_programming). Assure-toi de bien suivre le schéma de base de données qui a été validé par les profs. Si besoin, tu peux rafraîchir tes connaissances sur Active Record [ici](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_basics) avant de commencer à créer tes modèles.

Commence toujours par générer les modèles qui ne font référence à aucun autre modèle. Tu te souviens de la syntaxe ?


```bash
# Generic syntax
rails g model ModelName column:type

# For instance
rails g model Pet name:string user:references
```

Une fois que tu as généré tous tes modèles, n'oublie pas de lancer les migrations

```bash
rails db:migrate
```

Remarque : Certains de tes schémas peuvent avoir plus de relations avancées et de clés étrangères que ce que tu as vu pendant la semaine Airbnb. Par exemple : une table peut avoir besoin de stocker deux instances (clés étrangères) d'une autre table (le plus souvent, il s'agit de la table `User`). Dans ce cas-là, tu auras besoin d'utiliser ce qu'on appelle des alias (`aliases`). Apprends à les coder avec [ce guide](https://kitt.lewagon.com/knowledge/cheatsheets/active_record_advanced) sur les concepts avancés d'Active Record.

Une fois que c'est fait, ouvre tes modèles et passe aux **associations** et aux **validations** 👌

## Contrôleurs

Avant de diviser le travail, tu peux aussi envisager de générer les contrôleurs principaux (laisse-les vides pour le moment).

```bash
# Generic syntax
rails g controller model_name_plural

# For instance
rails g controller pets
```

À ce stade, tu dois être prêt à versionner ou merger ton travail sur `master` et à répartir le travail au sein de ton équipe. La création de branches est **obligatoire** maintenant !


## Figma

Tu l'auras sans doute remarqué pendant la semaine Airbnb, avoir un prototype Figma riche et complet peut faire toute la différence et faciliter le travail de ton équipe. Savoir exactement ce à quoi ressemblera chaque fonctionnalité, avec un design pattern cohérent, te permettra de créer une app de niveau supérieur !

Tu as créé ta première maquette lors du design sprint de produit ; tu vas maintenant la reprendre et la mettre à jour en fonction des décisions que ton équipe et toi avez prises plus tôt à propos des stories utilisateurs, des routes, etc.
Figma est un outil incroyable avec plein de fonctionnalités pratiques que tu pourras utiliser ici pour créer un prototype haute fidélité. Pense à créer ta [librairie de composants](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-Components-in-Figma), ajoute quelques plug-ins comme [unsplash](https://www.figma.com/community/plugin/738454987945972471/Unsplash), des [palettes de couleurs](https://www.figma.com/community/search?model_type=public_plugins&q=color%20palettes), et découvre encore plus d'options dans la section [Communauté](https://www.figma.com/community/explore).

Désigne un membre de l'équipe pour travailler à l'amélioration du prototype Figma pendant que les autres se chargent des tâches restantes.
