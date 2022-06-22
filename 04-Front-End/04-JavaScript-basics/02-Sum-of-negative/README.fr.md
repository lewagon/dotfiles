## Contexte et objectifs

Dans cet exercice, tu vas devoir coder des **boucles** et des **conditions**, et jouer avec des **nombres**.

L'objectif est de te familiariser avec la syntaxe JavaScript.

## Spécifications

Ouvre le fichier `lib/sum_of_negative.js`. Code la fonction `sumOfNegative` qui prend un paramètre `numbers` (de type `array`) et retourne un nombre (`number`) : la somme des nombres négatifs dans l'array. Par exemple :
- `sumOfNegative([-1, 4, -2, 9, 18])` doit retourner `-3`
- `sumOfNegative([15, 16, 17, 1000])` doit retourner `0`

👨‍🏫 Tu te souviens quand le prof t'a demandé de ne plus utiliser rake et de te tester toi-même en Ruby ? Il te conseillait d'appeler ta méthode avec tes propres arguments de test au bas du fichier, puis d'exécuter `ruby <file>` dans le terminal. En JavaScript, tu peux utiliser la même technique ! Il te suffit d'appeler ta méthode sous sa définition (au-dessus de la ligne `module.exports`), comme ceci :

```js
console.log(sumOfNegative([-4, 5, -2, 9]));
```

Puis d'exécuter ceci dans le terminal :

```bash
node lib/sum_of_negative.js
```

Si ton code fonctionne, tu devrais obtenir `-6`. Ajoute d'autres déclarations `console.log` dans la fonction `sumOfNegative` pour débugger ton code.
