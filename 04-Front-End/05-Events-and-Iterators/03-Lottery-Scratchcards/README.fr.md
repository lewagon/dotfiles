## Contexte et objectifs

Dans le développement Web front-end, les **attributs de données** sont très utiles pour injecter des valeurs dans ton HMTL auxquelles tu peux facilement accéder dans ton JavaScript.

Tu as déjà travaillé avec des attributs, tels que **id**, **class**, **src**, **style**, etc. Ces attributs sont standards et servent à un but précis. Mais parfois, on a besoin de stocker d'autres types de données dans le HTML et créer nos propres attributs pour cela. C'est là que les **attributs de données** entrent en jeu.

Dans ce challenge, on va apprendre comment créer un attribut de données et le sélectionner depuis le DOM avec une API afin de pouvoir l'utiliser dans ton code JavaScript.

## Préparation

Démarre un serveur et va sur [localhost:8000](http://localhost:8000).

```bash
serve
```

Tu peux voir une carte de burger avec une catégorie, un titre et un prix. Imaginons que tu aies une offre spéciale sur ce burger pour une soirée pour obtenir 2€ de réduction sur le prix original. Tu ne veux pas vraiment changer le prix dans la base de données parce que tu devras ensuite le remettre à jour le lendemain.

Au lieu de cela, on peut ajouter un **attribut de données** à ce burger avec le prix temporaire et remplacer le prix réel avec celui-ci à l'aide de JavaScript.

### Ajouter un attribut de données

Les attributs de données ressemblent exactement aux attributs "normaux", sauf qu'ils ont le préfixe `data-`. Après le `data-`, tu peux choisir ton propre nom pour l'attribut, idéalement, il devrait refléter les données que tu veux injecter.

Par exemple, si tu mets un `id` à ta classe `.card` pour la styliser, tu dirais

```html
<div class="card" id="burger">
```

Mais si tu veux injecter un id d'un enregistrement de base de données, tu pourrais utiliser un attribut de données comme ceci :

```html
<div class="card" data-id="42">
```

Cela peut-être utile lorsqu'on veut combiner de la donnée dynamique avec de l'information venant de la base de donnée, comme pour créer des tabs avec de la donnée dynamique (tu verras ça lors du module Rails).

### Sélectionner l'attribut de données

Maintenant que nous savons comment ajouter un `data-attribute` à notre HTML, voyons comment nous pouvons y accéder depuis le DOM !

**Avec `.getAttribute()`**

Comme n'importe quel autre attribut, tu peux l'obtenir en utilisant la méthode `getAttribute(attributeName)` et l'appeler sur l'élément sur lequel tu as mis l'attribut.

Pour revenir à notre exemple

```html
<div class="card" data-id="burger">
```

Tu peux obtenir l'`id` avec :

```javascript
const burger = document.querySelector(".card");
burger.getAttribute("data-id");
```

**Avec `.dataset`**

Pour les attributs de données, on peut également utiliser [l'API dataset]("https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset").

Pour l'utiliser, on appelle seulement `dataset` puis le nom de l'attribut sur l'élément qu'on veut l'obtenir.

```javascript
const burger = document.querySelector(".card");
burger.dataset.id;
```

## Instructions

1. Ajoute un attribut de données `price` à ton burger avec la valeur `13`. Puis va sur `lib/data.js` et sélectionne l'attribut en utilisant l'API dataset.

Puis, code du JavaScript pour remplacer le prix actuel de 15€ par le prix temporaire de 13€.

Il n'y a pas de `rake` à faire pour ce challenge, mais tu peux toujours vérifier ton code en rafraichissant la page.