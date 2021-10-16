## Contexte et objectifs

Tu vas maintenant coder une application Cookbook qui gère des recettes.

L’idée est simple : tu adores cuisiner, mais tu as besoin de te souvenir
de toutes les recettes que tu aimes. Voici ton livre de recettes ! Il
conservera une liste de tes recettes et te permettra de les lister
(`list`), d’en ajouter de nouvelles (`add`) et d’en supprimer d’autres
(`delete`).

Tu construiras cette app en utilisant le pattern **MVC**, également
utilisé dans Rails :

-   Modèle : quel est l’objet de base que tu souhaites manipuler ?
-   Vue : c’est l’endroit où on **affiche les informations** pour
    l’utilisateur·rice (`puts`) et où on **demande des informations** à
    l’utilisateur·rice (`gets`)
-   Contrôleur : il récupérera et stockera les données du Modèle, et
    indiquera à la Vue si elle doit montrer des données à
    l’utilisateur·rice ou en obtenir

Avec une feuille et un crayon, commence par identifier tes composants et
leurs responsabilités.

## Spécifications

### Modèle

Par chance, on a déjà défini notre classe `Recipe` dans l’exercice
précédent. Maintenant, tout ce qu’il te reste à faire, c’est de la
copier dans ton application de recettes. Copie la commande suivante dans
ton terminal :

```bash
cp ../01-Recipe/lib/recipe.rb lib
```

Cette commande copie le fichier `recipe.rb` de l’exercice précédent dans
le dossier `lib` de l’application.

### Repository (dossier)

Tu as maintenant besoin d’une structure pour les recettes de
l’utilisateur·rice. On n’a pas encore de vraie base de données, alors on
va utiliser une classe se comportant comme telle (comme vu pendant le
cours). Quand un programme Ruby se ferme, on perd toutes les données
stockées dans des variables. Si on veut récupérer ces données la
prochaine fois qu’on exécute le programme, on doit les rendre
persistantes et les stocker sur le disque dur. Pour cela, on va utiliser
un fichier CSV ! Le fichier est vide pour le moment ; tu ajouteras tes
propres recettes plus tard via l’application.

Dans le cadre de cet exercice, le repository stocke les recettes
ajoutées par l’utilisateur·rice. En d’autres termes, il **est** le
**livre de recettes**. Nomme la classe `Cookbook` pour écrire du code
explicite et qui a du sens, mais garde à l’esprit qu’il s’agit du
**dossier** du diagramme de ce matin !

Implémente la classe `Cookbook` avec 4 méthodes :

-   `initialize(csv_file_path)`, qui charge la `Recipe` existante du
    fichier CSV
-   `all`, qui retourne toutes les recettes
-   `add_recipe(recipe)`, qui ajoute une nouvelle recette au livre de
    recettes
-   `remove_recipe(recipe_index)`, qui supprime une recette du livre de
    recettes

### Contrôleur

Le contrôleur rassemblera les données du livre de recettes pour les
transmettre à la vue. Il demandera également à la vue des informations
pour créer de nouvelles recettes. Voici les méthodes à implémenter :

-   `initialize(cookbook)` prend une instance de `Cookbook` comme
    argument.
-   `list` fait une liste de toutes les recettes
-   `create` ajoute une nouvelle recette
-   `destroy` supprime une recette existante

### Vue

La vue est responsable de tous les `puts` et `gets` de ton MVC. Fais
bien attention à ce que ces mots n’apparaissent nulle part ailleurs !
(sauf peut-être pour débugger)

### Tout assembler

Une fois que tu es prêt·e, teste ton programme avec :

```bash
ruby lib/app.rb
```

On te donne `app.rb` qui a besoin du code pour instancier un `Cookbook`,
`Controller` et démarrer l’application. La boucle infinie est donnée
dans le `Router`, car elle ne fait partie du MVC. Du coup, quand tu
travailleras avec Rails, tu maîtriseras déjà tout ça. Sympa 😉

## Lectures complémentaires

Les concepts suivants sont également importants dans l’architecture
logicielle :

-   [Principe de responsabilité
    unique](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique)
-   [Séparation des
    préoccupations](https://fr.wikipedia.org/wiki/S%C3%A9paration_des_pr%C3%A9occupations)

