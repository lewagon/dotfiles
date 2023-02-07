## Contexte et objectifs

Aujourd'hui c'est ton premier jour de JavaScript. L'objectif de cette première journée est de te montrer qu'il s'agit d'un langage de programmation, comme Ruby, avec des variables, des fonctions, des conditions, des boucles, etc.

Pas besoin de navigateur aujourd'hui. À la place, on utilisera [Node.js](https://nodejs.org/en/) pour exécuter un peu de JavaScript directement dans le terminal.

Tu devrais déjà avoir `node` installé avec une version supérieure à `10`. Vérifie-le en exécutant :

```bash
node -v
# Tu devrais voir ta version de node ici
```

Si ce n'est pas le cas, retourne à la section correspondante du setup [macOS](https://github.com/lewagon/setup/blob/master/macos.fr.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.fr.md#nodejs) ou [Windows](https://github.com/lewagon/setup/blob/master/windows.fr.md#nodejs).

## Spécifications

Commençons par un algorithme très simple. Ouvre le fichier `lib/even_or_odd.js`. Code la fonction `evenOrOdd` qui prend un paramètre `number` (de type `number`) et retourne une `string` :

- `"even"` si le numéro est pair (0, 2, 4, etc.)
- `"odd"` si le numéro est impair (1, 3, 5, etc.)

**⚠️ Attention** : En JavaScript, tu dois **explicitement** écrire le mot-clé `return`, sinon [la fonction retournera `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax) ! Il n'existe qu'une seule exception à cette règle : quand tu utilises une fonction arrow à une ligne avec [retour implicite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Astuce : Tu te souviens de l'opérateur Ruby modulo ? Il existe aussi en JavaScript et pourrait être utile !_

Lance `rake` pour vérifier le style et l'exactitude de ta fonction !

Une fois que le premier exercice est entièrement en vert (style + tests), **versionne et pousse** 🙏

## À propos de la configuration de test

Ouvre le fichier `Rakefile` dans ton éditeur de texte. Il contient deux tâches :

- `eslint`, un [linter JavaScript](http://eslint.org/), l'équivalent de Rubocop dans l'univers Ruby.
- `mocha`, un [framework de test JavaScript](https://mochajs.org), l'équivalent de Rspec dans l'univers Ruby.
