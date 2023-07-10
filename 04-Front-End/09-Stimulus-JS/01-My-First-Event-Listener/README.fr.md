## Contexte et objectifs

Le but de ce challenge est de te familiariser avec la manipulation du DOM en utilisant JavaScript mais avec Stimulus à la place. Il s'agit d'une démonstration très simple pour te lancer avec Stimulus. Tu la reconnais sûrement du cours 😉. Essaye de le faire par toi-même.

## Configuration

Lance le serveur depuis ton terminal avec la commande suivante :

```bash
serve
```

Ensuite, rends-toi sur `localhost:8000`. Tu peux voir que nous utilisons Bootstrap. De plus, il y a un gros bouton dans la balise `<body>`. Nous y reviendrons dans un instant.

Pour installer [`Stimulus`](https://stimulus.hotwired.dev/handbook/installing), commençons par ton fichier `index.html`. Comme indiqué dans le cours sur AJAX, nous allons importer Stimulus avec importmap.

Pour rappel, qu'est-ce que `importmap` ? Lorsque nous importons de nombreux plugins JS dans notre code, ajouter de nombreuses balises `<script>` peut rapidement devenir désordonné. `importmap` nous permet de créer une bibliothèque pour épingler et importer tous les plugins JS dont nous avons besoin. C'est un peu comme un `Gemfile` en Ruby.

Tout d'abord, tu dois commencer par importer `es-module-shims` pour t'assurer que `importmap` fonctionne avec les anciens navigateurs. Ensuite, tu peux importer la bibliothèque Stimulus. En gros, copie-colle ceci dans la balise `<head>` de ton index.html :

```html
<script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
  {
    "imports": {
      "@hotwired/stimulus": "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
    }
  }
</script>
```

Une fois cela fait, passons à notre fichier `index.js`. Tu dois importer la bibliothèque `Stimulus` et enregistrer un contrôleur. Le contrôleur sera chargé de réagir au clic sur le bouton. Dans ce cas, nous appellerons notre contrôleur `EventListenerController` :

```javascript
import { Application } from "@hotwired/stimulus";

import EventListenerController from "./controllers/event_listener_controller.js";

window.Stimulus = Application.start();
window.Stimulus.register("event-listener", EventListenerController);
```

Ensuite, dans le dossier vide `controllers`, crée un fichier `event_listener_controller.js`. C'est là que nous écrirons le code pour réagir au clic sur le bouton. Copie-colle ce template dans le fichier comme point de départ :

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

Essaie de faire un `console.log` depuis la méthode connect. Si tu le vois dans la console, c'est bon ! Si tu ne vois rien, vérifie que tu as correctement attaché ton contrôleur Stimulus au DOM. Par exemple, tu peux le faire en ajoutant l'attribut `data-controller="event-listener"` au `<button>` dans le fichier `index.html`.

## Spécifications

Ton objectif est de mettre en œuvre du code JavaScript dans le fichier `lib/controllers/event_listener_controller.js`. **Tu dois réagir au clic sur le bouton bleu**. Lorsqu'il est cliqué, le contrôleur déclenchera une fonction `disable()` qui effectuera les actions suivantes :

- Désactiver le bouton. Cela peut être fait en ajoutant la classe `.disabled`.
- Changer le texte à l'intérieur du bouton de "Click me!" à "Bingo!"
- Optionnel : le fichier `sound.mp3` [se joue dans le navigateur](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript) lorsque le bouton est cliqué

Le son peut ne pas fonctionner sur certains navigateurs s'exécutant sous **Ubuntu**. Pour le résoudre, exécute simplement la commande suivante :

```bash
sudo apt-get install ubuntu-restricted-extras
```
