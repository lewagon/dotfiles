## Contexte et objectifs

Dans ce challenge, tu vas apprendre à **utiliser le stockage global** pour envoyer des données de page en page.

Tu vas également découvrir de nouveaux composants comme **form** (formulaire) et **tab bar** (barre d'onglets) pour la navigation !

## Spécifications

### 1. De l'échelle globale à l'échelle locale

Chaque Page (e.g `stories.js`) a ses propres données *locales* séparées à restituer dans sa vue.

Heureusement, l'ensemble de l'application (`app.js`) partage un stockage de données *global* auquel on peut accéder de n'importe où. C'est là que tu vas stocker tout ce que tu souhaites réutiliser. Exemple : les informations de ton utilisateur !

Bien que la [documentation ici](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/app.html) en dise peu, tu remarqueras que le WXML ne peut pas accéder directement au stockage de données *global*. Tu devras d'abord passer par les données *locales* !

```js
//app.js
App({
  globalData: {
  	userInfo: { nickName: "salmon", gender: 1 }
  }
})
// setting globalData
```

```js
//page.js
let app = getApp() // register the app instance

Page({
  data: { userInfo: app.globalData.userInfo }
})
// take from app.globalData and set the local data
```

```html
<!-- index.wxml -->
<view>Hello {{userInfo.nickName}}</view>
<!-- display our local data -->
```

En suivant cette logique, tu vas :

- utiliser `App.js` pour ajouter un stockage **globalData** à ton array `stories` ;
- utiliser getApp() en haut de `stories.js` pour obtenir une instance de ton application ;
- Dans la **fonction onShow** de ton `stories.js`, réinitialiser ton **stockage local** pour égaler le stockage globalData

```js
Page({

      ...

      data: {
        stories: []
      }

      onShow: function () {
        this.setData({
          stories: app.globalData.stories
        })
      }

      ...

    })
```

**Vérifie à nouveau la vue.**

Si tout se passe bien, ta boucle **WX:FOR** continue à restituer toutes tes anecdotes !

### 2. Publie de nouvelles anecdotes !

Tu veux **ajouter un nouveau chemin** sur ton application pour permettre aux utilisateurs de PUBLIER une nouvelle anecdote FMC.

- Modifie ton fichier `app.json` pour ajouter une nouvelle page de publication.
- Toujours dans `app.json`, crée une nouvelle barre d'onglets ('tabBar') ! Elle servira à naviguer entre les 2 onglets principaux : les **anecdotes** à gauche, et la page de **publication** à droite. Consulte la [documentation sur les paramètres](https://developers.weixin.qq.com/miniprogram/en/dev/framework/config.html) pour coder correctement l'objet tabBar.

**Et maintenant, teste le tout !** Dans ton simulateur, tu devrais maintenant pouvoir basculer entre les onglets. Prends le temps de [configurer une icône sympa](https://www.iconfont.cn/).

**Et maintenant, on va créer un formulaire cool** 🎨

- Sur ta page de vue `post.wxml`, utilise le composant [formulaire](https://developers.weixin.qq.com/miniprogram/en/dev/component/form.html) et son attribut **bindsubmit**.
- Tu vas avoir besoin de deux [entrées](https://developers.weixin.qq.com/miniprogram/en/dev/component/input.html) (nom et contenu), et bien sûr d'un bouton pour envoyer le formulaire !

Sais-tu comment **recevoir les données de ce formulaire** à l'intérieur de la couche logique `post.js` ? Via l'attribut `bindsubmit` de ton formulaire !

Crée une fonction appelée **formSubmit**. Cette fonction reçoit un argument `event` avec toutes les données de ton formulaire 😉

```js
Page({
  ...
  formSubmit: function (event) {
    console.log(event.detail.value.name)
    console.log(event.detail.value.content)
  }
  ...
})
```

Vas-y et **code cette fonction** :

- en prenant les valeurs des entrées de ton formulaire ;
- en les enregistrant dans le stockage `globalData` de ton application* ;
- en renvoyant l'utilisateur à la page des anecdotes grâce à l'API [`wx.switchTab`](https://developers.weixin.qq.com/miniprogram/en/dev/api/ui-navigate.html#wxswitchtabobject) API

*👉 *conseil : rappelle-toi comment on a utilisé `getApp()` pour obtenir une instance de l'application à l'intérieur de la page !*

**Teste et reteste !** Utilise console.log à chaque étape ! 🤓
