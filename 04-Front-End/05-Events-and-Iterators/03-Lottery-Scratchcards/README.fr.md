## Contexte et objectifs

Dans le développement front-end, les attributs de données - `data-attributes` - sont une manière très efficace d'injecter et de stocker des valeurs dans le DOM HTML, facilement accessibles depuis le JavaScript.

Rappelez-vous que tu as déjà travaillé avec des attributs, tels que **id**, **class**, **href**, **style**, etc. Ce sont des attributs standards qui sont utilisés pour un but spécifique. Mais parfois nous avons besoin de stocker d'autres types de données dans le HTML et de créer nos propres attributs pour le faire. C'est là que les **data attributes** entrent en jeu.

Dans ce challenge, tu vas apprendre à interagir avec ces attributs de données via JavaScript.

## Mise en place

Commence par lancer un serveur et va sur [localhost:8000](http://localhost:8000).

```bash
serve
```

## Ce que tu vas construire

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/scratchcards.gif"  width="800" height="552">

Prépare-toi à jouer 🎲

Ta mission est de vendre des tickets de grattage. Si tu ouvres [localhost:8000](http://localhost:8000), tu devrais voir une grille de tickets de grattage. Mais ces tickets sont vides !

Chaque ticket coûte 10€. Mais, l'utilisateur ne sait pas combien il va gagner avec chaque ticket. Ça peut être rien, ou ça peut être des milliers d'euros. Il doit "gratter" le ticket pour voir ce qu'il a gagné après l'avoir acheté. C'est pourquoi le montant n'est pas affiché à l'écran 😶‍🌫️

## Acheter un ticket

Tout d'abord, nous voulons créer un comportement où l'utilisateur peut acheter un ticket pour 10€. L'utilisateur le fera en cliquant sur un de ces tickets. Réfléchissons donc aux étapes pour y arriver :

1. Sélectionne tous les tickets de grattage de la page (en utilisant `querySelector` ou `querySelectorAll`).
2. "Écoute" quand l'utilisateur clique sur un de ces tickets.
3. Quand il le fait, soustrais `10` du montant d'argent qu'il a. Ne t'inquiète pas pour le calcul du montant qu'il a gagné pour l'instant (c'est la prochaine section).
4. Affiche son solde sur la page.

Tu remarqueras dans notre HTML qu'il y a :

```html
<div id="footer" class="footer">
  Your balance is: <span id="balance">100</span>€
</div>
```

Il te faut donc afficher le montant d'argent que l'utilisateur a à cet endroit. L'utilisateur commence avec 100€ (comme écrit dans le HTML). Bien sûr, son solde ne peut pas descendre en dessous de `0` ; c'est "game over" à ce moment-là 👾

Tu pourras voir que ça marche si, dans ton navigateur, le solde descend de 10€ à chaque fois que tu cliques sur un ticket jusqu'à atteindre 0€.

## Calculer le montant gagné

Ça ne serait pas du jeu si l'utilisateur savait combien il va gagner pour chaque ticket ! Alors, où est cachée cette information ?

Si tu regardes le HTML, tu remarqueras que chaque ticket ressemble à ça :

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

Le détail clé est le `data-amount="5"`. Ce ticket nous ferait gagner 5€ 🎉

Alors, comment pouvons-nous accéder à cet attribut de données depuis JavaScript ? **Tu devras utiliser le [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) pour ça**. Le dataset est une propriété JavaScript qui nous permet d'accéder aux attributs de données des éléments HTML. Voici un exemple de syntaxe :

```js
// si tu as dans ton HTML : <div id="hotel" data-name="Azure Ocean"></div>

const hotel = document.querySelector("#hotel");
console.log(hotel.dataset.name);
// et cela affichera : Azure Ocean
```

Est-ce que la syntaxe `hotel.dataset.name` te rappelle quelque chose ? Oui, le `dataset` est un `Object` (comme un `Hash` en Ruby) qui a des clés des propriétés `data-` du HTML ! Donc, si nous avons `data-name="Azure Ocean"`, alors `dataset.name` nous donnera `"Azure Ocean"`.

Revenons à nos tickets, et appliquons cela pour pouvoir ajouter le montant gagné à notre total :

1. Trouve l'endroit dans ton code où tu soustrais `10`. Tu voudras continuer à soustraire `10` (c'est le prix de tous les tickets de grattage), mais tu voudras modifier ce code pour aussi _ajouter_ le montant gagné.
2. Prends l'élément du ticket de grattage que tu as obtenu du DOM et utilise le `dataset` pour obtenir le `data-amount`. _Note : les propriétés `dataset` sont toujours des strings, donc tu devras peut-être convertir si tu veux un autre type._
3. Ajoute ce montant au solde de l'utilisateur.

Tu sauras que tu as réussi si, quand tu cliques sur les tickets, parfois le programme ajoute au solde de l'utilisateur au lieu de toujours soustraire 10€.

## Gratter un ticket

Le seul problème est que, pour l'instant, tu peux cliquer plusieurs fois sur le même ticket ! Cela signifie que si l'utilisateur trouve un ticket gagnant, il peut continuer à cliquer pour toujours.

Si tu regardes le HTML tu remarqueras :

```html
<li class="scratchard" data-amount="5" data-scratched="false"></li>
```

Il y a aussi un `data-scratched="false"` que nous n'avons pas encore utilisé. Tu peux avoir autant d'attributs de données que tu veux sur un élément HTML (tant qu'ils ont des noms différents), donc ce n'est pas un problème d'utiliser à la fois `data-amount` et `data-scratched` ici.

Voici tes tâches :

1. Quand l'utilisateur clique sur un ticket, peux-tu définir son attribut `data-scratched` pour que `data-scratched="true"` ? _Indice : Si tu fais cela correctement, le CSS est déjà configuré pour que tu remarques que le ticket devient plus clair quand tu cliques dessus._
2. Si l'utilisateur essaie de cliquer sur le même ticket plus d'une fois, peux-tu faire en sorte qu'il ne puisse pas l'acheter à nouveau ?

## Afficher le montant gagné sur le ticket

Pour finir, comme amélioration supplémentaire à notre application, peux-tu faire en sorte que, quand tu cliques sur un ticket, ce ticket montre le montant gagné par l'utilisateur ?
