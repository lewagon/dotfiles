## Contexte et objectifs

Tu vas maintenant coder une application Cookbook qui gère des recettes.

L’idée est simple : tu adores cuisiner, mais tu as besoin de te souvenir de toutes les recettes que tu aimes. Voici ton livre de recettes ! Il conservera une liste de tes recettes et te permettra de les lister (`list`), d’en ajouter de nouvelles (`add`) et d’en supprimer d’autres (`remove`).

Tu construiras cette app en utilisant le pattern **MVC**, également utilisé dans Rails :
- Modèle : quel est l’objet de base que tu souhaites manipuler ?
- Vue : c’est l’endroit où on **affiche les informations** à l’utilisateur (`puts`) et où on lui **demande des informations** (`gets`)
- Contrôleur : il récupérera et stockera les données du modèle, et indiquera à la vue si elle doit montrer des données à l’utilisateur ou en obtenir

Avec une feuille et un crayon, commence par identifier tes composants et leurs responsabilités !

## Spécifications

Voici les composants que nous allons implémenter :

### Modèle (model)

On a déjà défini notre classe `Recipe` dans l’exercice précédent. Maintenant, tout ce qu’il te reste à faire, c’est de la copier dans ton application de recettes. Exécute la commande suivante dans ton terminal :

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

Cette commande copie le fichier `recipe.rb` de l’exercice précédent dans le dossier `lib` de l’application.

### Dépôt (repository)

Tu as maintenant besoin d’une structure pour les recettes de l’utilisateur. On n’a pas encore de vraie base de données, alors on va utiliser une classe se comportant comme telle (comme vu pendant le cours).

Quand un programme Ruby se ferme, on perd toutes les données stockées dans des variables. Si on veut récupérer ces données la prochaine fois qu’on exécute le programme, on doit les rendre persistantes et les stocker sur le disque dur.

Dans le cadre de cet exercice, le repository stocke les recettes ajoutées par l’utilisateur. En d’autres termes, il **est** le **livre de recettes**. Nomme la classe `Cookbook` pour écrire du code explicite et qui a du sens, mais garde à l’esprit qu’il s’agit du **repository** du diagramme du cours !

Implémente la classe `Cookbook` avec 4 méthodes :
- `initialize`, qui charge les recettes `Recipe` existantes.
- `all`, qui retourne toutes les recettes
- `create(recipe)`, qui crée une recette et l'ajoute au livre de recettes
- `destroy(recipe_index)`, qui supprime une recette du cookbook

_Note : Quand un programme Ruby se termine, on perd toutes les données stockées dans les variables. Ton Cookbook se "vide" à chaque fois que le processus Terminal se ferme. Pas de panique, on résoudra ce problème dans le prochain défi._

### Contrôleur (controller)

Le contrôleur rassemblera les données du cookbook pour les transmettre à la vue. Il demandera également à la vue des informations pour créer de nouvelles recettes. Voici les méthodes à implémenter :
- `initialize(cookbook)` prend une instance de `Cookbook` comme argument.
- `list` fait une liste de toutes les recettes
- `add` ajoute une nouvelle recette
- `remove` supprime une recette existante

### Vue (view)

La vue est responsable de tous les `puts` et `gets` de ton MVC. Fais bien attention à ce que ces mots n’apparaissent nulle part ailleurs ! (sauf peut-être pour débugger)

### Tout assembler

Une fois que tu es prêt, teste ton programme avec :

```bash
ruby lib/app.rb
```

On te donne `app.rb` qui `require` le code pour instancier un `Cookbook`, un `Controller` et démarrer l’application. La boucle infinie est donnée dans le `Router`, car elle ne fait partie du MVC. Du coup, quand tu travailleras avec Rails, tu maîtriseras déjà tout ça. Sympa 😉

## Quelques conseils

Cookbook est un de nos exercices préférés, mais c'est aussi un gros challenge, qui nécessite de travailler avec beaucoup de fichiers différents ! Une fois que tu as implémenté le modèle `Recipe`, tu peux reprendre la même stratégie que pendant la lecture : essaye d'implémenter chaque parcours utilisateur un à un. Commence par ajouter une première fonctionnalité à ton app pour permettre à l'utilisateur d'ajouter une nouvelle recette. De quoi as-tu besoin pour cela ? De quelles méthodes dans le controller, la `view`, etc...?

En plus de ça, n'hésite pas à t'appuyer sur deux choses :

- `rake`, qui va te guider et t'aider à voir ce qu'il te reste à implémenter, donc utilise le souvent 👌
- lance ton application avec `ruby lib/app.rb` pour pouvoir tester toi-même les fonctionnalités que tu ajoutes. Les messages d'erreurs vont eux aussi te guider !

## Lectures complémentaires

Les concepts suivants sont également importants dans l’architecture logicielle :
- [Principe de responsabilité unique](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique)
- [Séparation des préoccupations](https://fr.wikipedia.org/wiki/S%C3%A9paration_des_pr%C3%A9occupations)
