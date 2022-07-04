## Contexte et objectifs

Avant d'aller un peu plus loin que les opérations du CRUD, on va revenir sur quelques-uns des principes vus hier avec les modèles et les opérations du CRUD.

## Spécifications

Prends le fichier `lib/quiz.rb`. Il contient un quiz avec quelques méthodes pour tester tes connaissances Rails. Assure-toi que chacune des méthodes retourne les bonnes informations pour passer le quiz !
⚠️ Essaie d'y répondre avant de lancer `rake`.

### Question 1

L'`Array` qui s'affiche comprend les quatre lettres de l'acronyme `CRUD`. Mets à jour chaque élément de l'array de façon à écrire en entier les quatre verbes qui décrivent les actions du CRUD.

### Question 2

Retourne une `String` avec la commande que tu exécuterais dans le terminal pour générer un modèle `Restaurant` avec deux champs : name(`String`) et stars(`Integer`).

### Question 3

Mets à jour l'`Array` retourné avec les chemins vers les deux fichiers créés quand tu exécutes le générateur de modèles pour un modèle `Restaurant` (à partir de la question ci-dessus). Utilise `YYYYMMDDHHMMSS` pour l'horodatage (timestamps).

### Question 4

Il existe 7 routes `CRUD` à connaître par cœur. Mais on ne veut pas toutes les écrire dans nos routes. Retourne une `String` avec la ligne unique que tu ajouterais dans `config/routes.rb` pour ajouter les sept routes du CRUD pour ton modèle `Restaurant`.

### Question 5

Si tu as les sept routes du CRUD, tu vas aussi avoir besoin de sept méthodes d'instance dans ton contrôleur `RestaurantsController`. Retourne un `Array` avec les sept actions de contrôleur qui vont avec les routes du CRUD.

## Apprentissages clés

- Fondements de la construction de routes du CRUD
- Comment générer de nouveaux modèles dans notre application ?
