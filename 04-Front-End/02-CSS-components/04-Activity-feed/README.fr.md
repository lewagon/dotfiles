## Contexte et objectifs

Crée [un fil d'activité](http://lewagon.github.io/html-css-challenges/13-activity-feed/) semblable à celui de Dribbble.

1. Crée ton composant CSS `avatar`.
2. Code le design de tes onglets et de tes notifications dans `tabs.css` et `notification.css`.

Commence par **lire toutes les instructions** !

## Design des onglets

Les onglets sont assez faciles à créer. Le code HTML ressemble à ça :

```html
<div class="tabs">
  <a href="#" class="tab active">Traveling</a>
  <a href="#" class="tab">Hosting</a>
</div>
```

Une fois que c'est fait :

- Transforme `.tabs` en flexbox
- Ajoute de l'espace de remplissage (`padding`) sur chaque onglet (`.tab`)
- Tu n'as pas besoin d'espacer (`space-between`) ou d'aligner les éléments (`align-items`) ici, car les onglets sont déjà de la même hauteur (`height`)
- Tu peux aussi créer les états actifs (**active**) et de survol (**hover**) des onglets en utilisant `.tab.active` et `.tab:hover`. Tu devras sans doute ajuster l'opacité (`opacity`) et la bordure inférieure (`border-bottom`) 😬

## Design des notifications

Pour le design des notifications (`.notification`), **retourne aux diapos !** Il s'agit d'un scénario classique de flexbox, où le corps de la notification pousse les autres éléments grâce à la propriété `flex-grow`.

Une fois que c'est fait, tu n'as plus qu'à affiner tes marges (`margin`) et ton espace de remplissage (`padding`), et à choisir tes polices et tes couleurs.

Qu'est-ce que tu attends ? Le moment est venu de créer un fil d'activité sympa ! 🚀🚀

## [Conseil supplémentaire] Images des utilisateurs

Pour les images d'utilisateurs dans ton fil d'activité, tu peux utiliser un service de paramètre fictif qu'on a créé pour récupérer n'importe quelle image GitHub d'un utilisateur Kitt à l'aide de son nom d'utilisateur GitHub. Utilise simplement cette URL : `https://kitt.lewagon.com/placeholder/users/<user.github_nickname>`. Essaie avec différents pseudos GitHub.

## [Conseil supplémentaire] Premier et dernier sélecteurs enfants

Tu peux sélectionner la première (ou la dernière) notification avec ces sélecteurs :

```css
.notification:first-child {
  /* CSS code for the first element with class="notification" */
}
.notification:last-child {
  /* CSS code for the last element with class="notification" */
}
```

Cela peut être utile pour éliminer la bordure inférieure (`border-bottom`) sur la dernière notification du fil d'activité, par exemple !

N.B. : n'oublie pas de **forcer le rafraîchissement** de ton navigateur (`cmd + shift + r`) pour vider le cache si ta page n'affiche pas le code le plus récent !
