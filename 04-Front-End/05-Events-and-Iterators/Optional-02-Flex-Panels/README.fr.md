## Contexte et objectifs

Utilisons le concept de Flexbox afin de récapituler le topic de ce module: Iterators & Events

Un boilerplate est fourni pour te lancer, contenant :

- `index.html` avec tout le code HTML dont tu auras besoin
- `application.css` où tu devras utiliser Flexbox pour finir de styler la page
- `src/panels.js` où tu devras coder ta solution JavaScript

### Mise en place

Lançons un serveur web local en exécutant :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

### Spécifications

L'objectif est de coder un effet JavaScript propre pour ta page. Pour cela, tu devras utiliser des itérateurs JavaScript et des événements DOM, ainsi qu'un peu de CSS. Tu devras également styler la page en utilisant FlexBox, puis ajouter un comportement JavaScript sympa pour que nous puissions cliquer sur chaque panneau pour révéler l'image complète et le message correspondant.

Chaque fois que nous cliquons sur un panneau, il devrait s'agrandir et révéler le texte complet comme ceci :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-reference.gif)

### Styling avec FlexBox

Nous avons une structure HTML simple avec des panneaux. Chaque panneau a une image de fond et du texte séparé en 3 paragraphes.

Cela semble assez étrange au début, donc notre première étape est de le rendre plus joli. Comment placer les images côte à côte ? [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox) est ton ami dans cette partie de l'exercice. La page doit ressembler à ceci avant de passer à la partie JavaScript de l'exercice :

<img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/flex-panels-styled.png"  width="600" height="300">

Conseils :

- Réfléchis à la raison pour laquelle les images sont toutes écrasées les unes contre les autres. Comment pouvons-nous les faire grandir pour prendre toute la largeur de l'écran ?
- N'oublie pas de faire de chaque panneau un conteneur flex pour t'aider à tout styler. (Pense à ajouter `display: flex` aux panneaux).
- Tu remarqueras peut-être que les mots supérieurs et inférieurs de chaque panneau devraient être hors de vue. Nous devons nous assurer qu'ils ne sont pas visibles, mais qu'ils sont toujours sur la page pour qu'ils puissent être déplacés dans la vue. Peut-être que [Translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) pourrait aider ?

### Problème JavaScript

La partie JavaScript de notre problème devrait être plus claire après avoir correctement stylé la page.

Nous voulons faire apparaître les mots cachés chaque fois que le panneau correspondant est cliqué. Le panneau devrait également s'agrandir, révélant plus de l'image.

N'oublie pas de :

- Sélectionner les bons éléments HTML
- Ajouter des écouteurs d'événements sur eux (endroit parfait pour l'itération) sous la forme d'un clic.
- Coder ce qui doit se passer lorsque l'événement est déclenché. Que dirais-tu d'ajouter des classes `.open` et `.closed` ?
- L'attribut `flex-grow` est proportionnel. Un élément qui a `flex-grow: 2` grandira deux fois plus vite qu'un élément qui a `flex-grow: 1`.
