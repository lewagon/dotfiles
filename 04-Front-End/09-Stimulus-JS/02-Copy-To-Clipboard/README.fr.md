## Contexte et objectifs

Dans cette unité, nous allons passer du temps à coder des composants utiles pour tes futurs projets. Il s'agit d'une première étape vers la construction de ta propre bibliothèque de composants.

Dans ce challenge, tu vas coder un composant Copy to Clipboard (Copier dans le presse-papiers). Ce composant sera utilisé pour copier une clé API telle que vous la trouverez sur de nombreux services en ligne.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/copy-to-clipboard.gif)

## Configuration

Lance le serveur depuis ton terminal avec :

```bash
serve
```

Et visite `localhost:8000`. Tu peux y voir un formulaire avec un champ en lecture seule contenant une clé API et un bouton permettant à l'utilisateur de la copier facilement.
Ta mission est d'implémenter la fonctionnalité de copie dans le presse-papier.

Cette fois, `Stimulus` est déjà installé dans le head `index.html`.

Cependant, tu dois encore t'habituer à faire la partie configuration du JavaScript toi-même. Ouvre `index.js`, importe le contrôleur Stimulus en haut et enregistre le contrôleur en bas. Tu peux nommer le contrôleur `CopyToClipboardController`.

Crée un fichier `copy_to_clipboard_controller.js` dans le dossier `controllers` vide, et copie-colle le template :

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO : console.log quelque chose !
  }
}
```

Tout est prêt !

## Spécifications

Ton but est d'implémenter le callback qui copie le texte dans la valeur de l'entrée dans le presse-papier.

Une fois que tu as cliqué sur le bouton *Copy to Clipboard*, tu peux utiliser `ctrl + v` pour coller le texte dans une autre zone de texte.

### 1. Inspecter le HTML existant

Le HTML fourni contient un champ avec des attributs intéressants. L'attribut `value` est déjà défini pour contenir une clé API par défaut au chargement de la page.
L'attribut `readonly` garantit que personne ne pourra modifier le texte existant ou introduire une faute de frappe.

### 2. Implémenter le contrôleur Stimulus

Assure-toi d'attacher ton contrôleur Stimulus au DOM avec `data-controller`.

Dans ton contrôleur Stimulus, tu devras implémenter la méthode `copy()`. Cette méthode sera appelée lorsque l'utilisateur cliquera sur le bouton (pensez à `data-action`). Comme toujours, assure-toi que la méthode `copy()` est appelée dans le bon contexte. Met un `console.log` dans la méthode, clique sur le bouton et vérifie que tu vois bien le message dans la console du navigateur.

Une fois que c'est fait, réfléchis au pseudocode de la méthode `copy()`. Que dois-tu faire pour copier le texte de l'entrée dans le presse-papiers ?

### 3. Implémenter la méthode `copy()`.

Tu vas devoir utiliser l'[API Presse-papiers](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard). Jette un coup d'œil à la documentation, quelle méthode de l'API dois-tu utiliser ?

Que se passe-t-il lorsque nous cliquons sur le bouton (regarde le gif ci-dessus) :
- Le texte contenu dans la valeur de l'entrée est copié dans le presse-papiers (en termes plus techniques, la chaîne de texte est *écrite* dans le presse-papiers du système). Pour obtenir la valeur de l'entrée, pourquoi ne pas implémenter une cible de données (`data-target`) appelée `input` dans ton contrôleur Stimulus ?
- Lorsqu'il est cliqué, le bouton devient `désactivé`. Il n'est plus cliquable.
- Le texte à l'intérieur du bouton devient "Copied!". Ce texte pourrait être modifié d'un contexte à l'autre si nous devions réutiliser ce contrôleur Stimulus. Au lieu de le coder en dur dans le JavaScript, créons une valeur Stimlus (`data-value`) appelée `feedback-text` et utilisons-la dans le contrôleur Stimulus. Le bouton, lorsqu'il sera désactivé, affichera le texte assigné à la data-value `feedback-text`.
