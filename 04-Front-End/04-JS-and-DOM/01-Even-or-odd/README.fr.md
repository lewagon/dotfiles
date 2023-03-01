## Contexte et objectifs

Aujourd'hui c'est ton premier jour de JavaScript. L'objectif de cette première journée est de te montrer qu'il s'agit d'un langage de programmation, comme Ruby, avec des variables, des fonctions, des conditions, des boucles, etc. De plus, tu peux aussi sélectionner et manipuler des éléments du DOM avec JavaScript.

Dans ce challenge, nous aurons 2 processus pour tester notre code :
- Dans le navigateur
- Dans le terminal

## Coder avec ton navigateur

JavaScript est un langage qualifié de front-end. Cela signifie qu'il est exécuté dans le navigateur. Nous utiliserons la fonction `console.log` pour imprimer des valeurs dans le terminal.

Pour tester ton code dans le navigateur, lance ton programme avec la commande `serve` et va sur [http://localhost:8000](http://localhost:8000).

```bash
 serve
```

Quand tu ouvres ton navigateur, tu verras une liste de tests rouges. Ton but est de fixer la fonction `evenOrOdd` pour que tous les tests deviennent verts. Dès que tu fais un changement dans ton code, tu dois rafrachir la page pour voir les résultats.

Essaye de rajouter un `console.log(number)` dans la fonction `evenOrOdd`, ouvre la console de ton navigateur et regarde ce qui s'affiche. Tu devrais voir 3 valeurs : `0`, `1` et `2`. Ces résults viennent de la fonction `check` dans le fichier `event_or_odd_examiner.js` dans le dossier `spec`.

Tant que la fonction `evenOrOdd` n'est pas finie, les tests ne passeront pas. Ils seront verts quand tu auras réussi à l'implémenter correctement.

## Spécifications

Commençons par un algorithme très simple. Ouvre le fichier `lib/even_or_odd.js`. Code la fonction `evenOrOdd` qui prend un paramètre `number` (de type `number`) et retourne une `string` :

- `"even"` si le numéro est pair (0, 2, 4, etc.)
- `"odd"` si le numéro est impair (1, 3, 5, etc.)

**⚠️ Attention** : En JavaScript, tu dois **explicitement** écrire le mot-clé `return`, sinon [la fonction retournera `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax) ! Il n'existe qu'une seule exception à cette règle : quand tu utilises une fonction arrow à une ligne avec [retour implicite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Astuce : Tu te souviens de l'opérateur Ruby modulo ? Il existe aussi en JavaScript et pourrait être utile !_

Lance `rake` pour vérifier le style et l'exactitude de ta fonction !

## Tester avec le terminal

Le deuxième processus pour tester ton code est de lancer les tests dans le terminal. On va utiliser notre fameuse commande `rake` pour lancer les tests.

Pour ça, on utilisera [Node.js](https://nodejs.org/en/), pour exécuter du JavaScript dans le terminal. 

Tu devrais déjà avoir Node.js installé sur ton ordinateur avec une version supérieure à `10`. Vérifie en tapant:
  
```bash
node -v
# Tu devrais voir la version de node ici
```

Si ce n'est pas le cas, tu peux te référer à la section du setup dédiée pour [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) ou [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs).

Si lancer `rake` affiche une erreur, lance:
```bash
nvm list
```
puis choisis la version de Node.js la plus récente. Par exemple, si tu vois `v10.16.0`, lance:
```bash
nvm use 10.16.0
```

Une fois que l'exercice est entièrement vert (style + tests), **versionne et pousse** 🙏

## Astuces VSCode

Durant la journée de Setup, tu as installé l'extension `eslint` dans ton éditeur de code. Cela te permet de voir les erreurs de style en temps réel. Si tu n'as pas encore installé l'extension, tu peux le faire en suivant en lançant la commande:

```bash
code --install-extension dbaeumer.vscode-eslint
```