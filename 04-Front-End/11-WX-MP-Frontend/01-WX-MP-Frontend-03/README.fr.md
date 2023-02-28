## Contexte et objectifs

L'objectif de ce challenge est de s'entraîner à utiliser des attributs WXML avancés pour créer des vues dynamiques.

## Spécifications

On veut montrer plus d'une anecdote sur la **page Anecdotes** sans répéter le même markup WXML.

### 1. Commence avec les données !

- Dans `stories.js`, localise la clé de données en haut. Ajoute un array `stories` à l'intérieur.

```js
//stories.js
data: {
  stories: []
}
```

- Chaque anecdote sera un **nouvel objet** stocké dans l'array `stories`.
- Chaque anecdote aura du contenu (**content**) et un nom (**name**).

```js
{ content: "Building a mini program is fun!!! FMC.", name: "Yinghui" },
```

Tu vas créer 2 à 5 anecdotes. Une fois ces données locales enregistrées, tu peux les prévisualiser dans l'onglet **AppData** de la console ("debugger"). Tout ce que tu as stocké ici est disponible dans notre modèle WXML !

### 2. Restituer une liste

Tu peux maintenant restituer ta liste d'anecdotes en utilisant l'attribut de contrôle [`WX:FOR`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/list.html).

Sur ta page **stories.wxml** :

- Enveloppe ton composant card (carte) dans un un élément `<view>` ou `<block>` (ils sont équivalents, ce sont simplement des conteneurs)
- Utilise l'attribut de contrôle `wx:for` pour répéter cet élément de conteneur pour chaque élément de ton array d'anecdotes
- Utilise `wx:for-item` pour spécifier le nom de la variable de l'élément actuel de l'array
- Utilise de la syntaxe `{{mustache}}` dans ta card (carte) pour afficher les clés de contenu (**content**) et de nom (**name**) de tes anecdotes !

### 3. Avec des conditions

Et s'il n'y a **aucune anecdote à afficher** ? Une page vide, ce n'est pas très esthétique ! 😱

On peut utiliser l'attribut de contrôle [`WX:IF`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/conditional.html) pour anticiper ce cas de figure.

- Crée une card (carte) avec un message de bienvenue : "*There's nothing here yet!*"
- Restitue cette card IF (SI) l'array ``stories`` est vide !

👉 Conseil : Un array vide a une longueur égale à 0

