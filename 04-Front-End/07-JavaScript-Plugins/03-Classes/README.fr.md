## Contexte et objectifs

Tu as passé pas mal de temps sur le concept d'OOP en Ruby au début du bootcamp (tu te souviens du livre de recettes ?).

Mais JavaScript est aussi un langage de programmation orientée objet et, depuis 2015 (ES6), il prend en charge les [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

Ce petit challenge présente les classes ES6.

## Démarrer : les classes JavaScript

Tu peux lancer tous les tests de ce petit exercice Node avec la bonne vieille fonction rake :

```bash
rake
```

Il y a 3 tests à faire passer en vert. Tout ce que tu dois savoir se trouve sur [cette page MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). On va chercher à coder la classe `User` dans le fichier `lib/user.js` avec :

- Une variable d'instance `firstName`
- Une variable d'instance `lastName`
- Les deux variables d'instance sont initiées par le constructeur (`constructor`).
- Une méthode d'instance `fullName()` retournant le prénom et le nom concaténés.

Ce sont 7 lignes de code JS. Repense à la programmation orientée objet en Ruby, les concepts sont exactement les mêmes !

Passons au challenge suivant à propos du framework JavaScript **Stimulus**, basé sur la syntaxe de classe ES6.
