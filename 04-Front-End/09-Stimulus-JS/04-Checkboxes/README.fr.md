## Contexte et objectifs

Créons un nouveau contrôleur Stimulus qui nous permettra de cocher toutes les cases d'un formulaire à la fois.

## Configuration

Lance le serveur depuis ton terminal avec :

```bash
serve
```

Et visite `localhost:8000`. Tu peux voir que nous utilisons Bootstrap.

Cette fois, `Stimulus` est déjà installé dans le head `index.html`.

Cependant, il est important que tu continues à t'entraîner à faire la partie configuration du JavaScript toi-même. Ouvre `index.js`, importe le contrôleur Stimulus en haut et enregistre le contrôleur en bas. Tu peux nommer ce contrôleur `CheckAllCheckboxesController`.

Crée un fichier `check_all_checkboxes_controller.js` dans le dossier `controllers` vide, et copie-colle le template :

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

Nous sommes prêts !

##  Spécifications

Ton objectif est d'implémenter une case à cocher qui cochera toutes les cases en même temps.

### 1. Prépare ton HTML

Cette fois-ci, le HTML est déjà fourni.

Modifions-le pour **connecter** le contrôleur :
- Sur quel élément du DOM vas-tu connecter le contrôleur ?
- Quelle est la syntaxe pour le connecter ?

Nous savons que le contrôleur devra interagir avec la case à cocher "Tout cocher", ainsi qu'avec les 4 autres cases à cocher de la catégorie. Dans Stimulus, un contrôleur ne peut interagir qu'avec les éléments de sa portée - c'est-à-dire, seulement avec les éléments enfants de l'élément DOM auquel il est connecté. La question qui se pose ici est donc la suivante : Quel est l'élément qui englobe à la fois la case à cocher "Tout cocher" et les cases à cocher de la catégorie ?

Une fois que tu as connecté le contrôleur, ajoute un `console.log` dans la méthode `connect()`. Retourne dans ton navigateur, ouvre la console et recharge la page. Tu devrais voir ton message dans la console.

### 2. Écouter un événement

Nous voulons maintenant cocher toutes les cases à cocher lorsque nous cochons la case "Check all". Cela signifie que nous voulons écouter l'événement qui se produit sur la case à cocher "Check all", puis déclencher une logique de code pour les autres cases à cocher.

Dans Stimulus, l'écoute d'un événement est appelée **Action**. Mais quel événement écoutons-nous ?

D'après la [page de documentation MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), une case à cocher émet 2 types d'événements : `change` et `click`. Utilisons `change` (comme dans "changement" d'état).

Lorsque l'événement `change` est émis, nous allons appeler la méthode `checkAll()` sur le contrôleur 'check-all-checkboxes'.

Implémentons cette action Stimulus dans notre HTML.

### 3. Implémenter le callback de l'événement

Maintenant que nous écoutons l'événement `change` de la case à cocher, codons la méthode `checkAll` dans notre contrôleur Stimulus.

Tu remarqueras que cette méthode prend un paramètre `event`. Par défaut, les actions Stimulus appellent la méthode avec un objet `event` passé en argument - comme le [bon vieux `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Dans cette méthode, tu vas devoir :
- Vérifier le statut de la case à cocher "Check All".
- Si elle est cochée, alors vérifions toutes les autres cases à cocher
- Si elle n'est pas cochée, alors décochons toutes les autres cases.

Mais comment accéder à toutes les autres cases à cocher dans cette méthode ? Bonne question !

### 4. Réfléchir aux cibles

Tout d'abord, nous devons lister les cibles dans le contrôleur. Quel élément du DOM doit être ciblé en tant que "checkbox" ? Gardons à l'esprit qu'il nous sera utile de les sélectionner tous et d'itérer sur chacun d'entre eux pour les marquer comme des cases à cocher.

Une fois que tu as repéré la cible, ajoutons-la dans le HTML.

### 5. Implémentation de la logique

Après avoir implémenté les cibles, retournons à notre méthode `#checkAll`.

Voici ce que nous devons faire :
- Vérifier le statut de la case à cocher "Check All".
- Si elle est cochée, alors itérons sur toutes les cibles de la case à cocher, et changeons leur propriété `checked` en `true`
- Si elle n'est pas cochée, alors itérons sur toutes les cibles de cases à cocher, et changeons leur propriété `checked` en `false`

Tu as maintenant tout en main pour relever le reste de ce challenge !

N'oublie pas d'essayer le comportement de votre contrôleur Stimulus dans le navigateur (teste-le manuellement), et n'hésite pas à ajouter des `console.log` pour comprendre ce que tu manipules dans les méthodes `checkAll`.

A toi de jouer !

### Aller plus loin : Comprendre les cycles de vie

Regarde la méthode `connect()`. Les contrôleurs Stimulus sont livrés avec des rappels de cycle de vie :
- `initialize()` (différent du constructeur ES6)
- `connect()`
- `disconnect()`

`connect()` est déclenché lorsque le contrôleur est connecté à un élément DOM, avec l'attribut `data-controller`.

Si tu souhaites en savoir plus sur les cycles de vie des contrôleurs Stimulus, [lis cette documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)
