## Contexte et objectifs

L'objectif de ce challenge est de t'entraîner avec le langage de modèles WeChat.

## Spécifications


### 1. Configure une page de plus dans ton application

Utilise le fichier de configuration `app.json` pour ajouter encore un nouveau chemin à l'intérieur de l'array `pages:[]` :

```
"pages/stories/stories"
```

### 2. Crée un petit titre pour commencer

On va réutiliser le même [composant Bannière](https://uikit.lewagon.com/documentation#banners) que sur la page d'accueil et le transformer en un beau titre ! Tu peux à nouveau utiliser `inline CSS` pour personnaliser sa taille... Ex. : hauteur de 100px.

### 3. Puis une card (carte) pour nos anecdotes...

On a besoin d'un composant card (carte) pour afficher nos anecdotes FMC : chaque card (carte) aura du contenu (**content**) et un auteur (**author**).

Tu peux encore gagner du temps en utilisant le [composant card du Wagon](https://uikit.lewagon.com/documentation#card_product) (mais tu n'as pas besoin d'image produit).

Une anecdote suffit, puisqu'il ne s'agit que d'un modèle.

### 4. Introduction à la liaison de données

Le WXML va bien plus loin que le HTML : c'est un **langage de modèles** qui nous permet d'[injecter des variables JavaScript et même des boucles dans nos données locales](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/data.html) ! La magie opère quand tu utilises cette syntaxe : `{{variable ou opération}}`.

On l'appelle la **syntaxe moustache** 👨‍🦰 et elle est liée au JS et au HTML...

**Du JS au WXML ➡️**

- Stocke ‘Who is here?’ dans une variable `text` sur la page de données `stories.js`


```js
//stories.js
Page({
  data: {
    text: 'Who is here?'
  }
})
```

- Affiche le texte à l'intérieur de ta page `stories.wxml`


```html
<!— stories.wxml -->
<view>{{text}}</view>
```

N'importe quelle string stockée dans `text` s'affichera dynamiquement dans ta vue 🤓

**Du WXML au JS ⬅️**

- Crée un bouton avec l'attribut "bindtap" et un nom de fonction comme valeur

```html
<!— stories.wxml -->
<button bindtap="clickMe">{{text}}</button>
```

- Définis cette nouvelle fonction dans ton objet Page :

```js
//stories.js
Page({
  clickMe: function() {
    this.setData({ text: "Hello World" })
  }
})
```

Beau travail ! Tu as désormais un bouton qui déclenche un événement "bindtap" au niveau de la couche logique (le fichier JavaScript) et une fonction qui redéfinit les données locales sur une autre string... restituée immédiatement dans la vue.

⚠️ Ne brise pas l'objet Page ! **Chaque paire clé-valeur est unie avec une virgule.** Tu remarqueras que l'objet Page contient différentes clés fournies par le framework : `onReady`, `onShow` etc. On appelle ça des [fonctions lifestyle](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/page.html).

### Action bonus :

Transforme ton `<navigator>` de la page d'accueil en élément `<button>`, en appelant cette fonction sur **bindtap** :

```js
//landing.js
goToStoriesPage: function() {
  wx.navigateTo({
    url: '/pages/stories/stories'
  })
}
```
