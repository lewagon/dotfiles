## Contexte et objectifs

Avant de passer au challenge Watch-List, on va revenir sur quelques-uns des principes vus hier avec la construction de routes avancées.

## Spécifications

Prends le fichier `lib/quiz.rb`. Il contient un quiz avec quelques méthodes pour tester tes connaissances Rails. Assure-toi que chacune des méthodes retourne les bonnes informations pour passer le quiz !

⚠️ Essaie d'y répondre avant de lancer `rake`.

### Question 1

Code les 7 routes conventionnelles correspondant aux 7 routes CRUD générées par `resources :restaurants`.

Conseil : une route suit ce motif : `verb "url", to: "controller#action"`

### Question 2

Retourne vrai (`true`) ou faux (`false`) pour répondre à cette question :
Si tu as une relation 1:N entre tes modèles `Restaurant` et `Review` (belongs_to :restaurant), dois-tu toujours imbriquer toutes tes routes pour `Review` dans `Restaurant` ?

### Question 3

Retourne une `String` de la validation ActiveRecord pour t'assurer qu'aucun enregistrement n'est créé sans nom (`name`).

## Apprentissages clés

- Comprendre ce que `resources` fait dans tes routes.
- Comprendre la relation N:N et les routes imbriquées.
- Comment ajouter une validation au modèle pour éviter des problèmes de base de données ?
