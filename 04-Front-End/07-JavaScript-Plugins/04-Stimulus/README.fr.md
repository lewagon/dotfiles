## Contexte et objectifs

Dans cet exercice, on utilisera le framework JavaScript [Stimulus](https://stimulusjs.org/). Ce framework a été créé par [Basecamp](https://basecamp.com/), la société qui est aussi derrière le framework Ruby on Rails.

Ce framework se vante d'être le « modeste framework de HTML que tu possèdes déjà ». C'est un framework que tu pourras utiliser pendant tes projets pour t'aider à organiser ton code JavaScript. Il fonctionne bien avec Rails, car il te permet de générer du HTML de façon dynamique côté serveur (souviens-toi de MVC, Sinatra, etc.) et d'ajouter du comportement JS.

Le gros avantage de Stimulus est que si tu l'utilises, tu n'auras presque jamais à effectuer manuellement `querySelector` ou `addEventListener` ! Au lieu de cela, tu utiliseras les attributs HTML de données (`data-`) sur un élément spécifique.

Ce framework utilise les [classes ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), un ajout bien utile depuis 2015 (date de publication d'ES6) pour ajouter la programmation orientée objet à JavaScript.

## Texte standard

Continue : ouvre `index.html` et jette un œil au code à l'intérieur.

C'est un formulaire HTML avec des cases à cocher :
- 1 case à cocher « Tout cocher » ("Check All")
- 4 cases à cocher avec des Catégories

Tu peux lancer le serveur webpack :
```bash
yarn install
rake webpack
```

et ouvrir la page dans ton navigateur :
```bash
open http://localhost:8080
```

Tu peux cocher chacune des cases individuellement, mais la case à cocher « Tout cocher » ("Check all") ne fonctionne pas encore. C'est le comportement qu'on va chercher à coder avec JavaScript et notre nouvel ami : Stimulus.


## Démarrer : installation de Stimulus

Avant de passer au code, prends le temps de lire les pages suivantes du manuel (Handbook) pour te faire une idée de la philosophie derrière la création de ce framework :

- [L'origine de Stimulus](https://stimulusjs.org/handbook/origin)
- [Introduction](https://stimulusjs.org/handbook/introduction)
- [Bonjour, Stimulus](https://stimulusjs.org/handbook/hello-stimulus)
- [Créer quelque chose de réel](https://stimulusjs.org/handbook/building-something-real)

Une fois que tu as terminé, [configure](https://stimulusjs.org/handbook/installing) le projet avec Stimulus :

```bash
yarn add stimulus
mkdir lib/controllers # C'est là que l'on ajoutera notre code Stimulus
```

Puis ouvre `lib/index.js` et ajoute ce qui suit au début du fichier :

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
```

Ces lignes sont nécessaires pour **charger** Stimulus dans ton application.

Tu vas maintenant coder ton **premier contrôleur Stimulus** !

## Ton premier contrôleur Stimulus

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!");
  }
}
```

Examine la méthode `connect()`. Les contrôleurs Stimulus s'accompagnent de rappels du cycle de vie :
- `initialize()` (différent du constructeur ES6)
- `connect()`
- `disconnect()`

`connect()` se déclenche quand le contrôleur est connecté à un élément du DOM, avec l'attribut `data-controller`.

Si tu veux en savoir plus sur les cycles de vie des contrôleurs Stimulus, [lis cette documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks)

Tu vas maintenant modifier ton HTML pour **connecter** le contrôleur :
- Sur quel élément du DOM vas-tu connecter le contrôleur ?
- Quelle est la syntaxe à utiliser pour le connecter ?

Important : On sait que le contrôleur va devoir interagir avec la case à cocher « Tout cocher » ("Check all"), et avec les 4 autres cases à cocher des catégories. Dans Stimulus, un contrôleur peut interagir avec des éléments à sa portée, à savoir avec les éléments enfants de l'élément du DOM auquel il est connecté. La question est donc : "Quel élément enveloppe à la fois la case à cocher « Tout cocher » ('Check All') et les cases à cocher des catégories ?"

<details>
  <summary markdown='span'>Hint</summary>

  ```html
  <form data-controller='check-all-checkboxes'>
    <!-- ... -->
  </form>
  ```
</details>

Une fois que tu as connecté le contrôleur, retourne à ton navigateur, ouvre la console et recharge la page.
Tu devrais voir apparaître le message `The 'check-all-checkboxes' controller is now loaded!` dans la console.

## Écouter un événement

On veut maintenant que toutes les cases se cochent quand on coche la case « Tout cocher » ("Check all").
Cela signifie qu'on veut écouter l'événement qui se produit sur la case « Tout cocher » ("Check all"), puis déclencher la logique du code pour les autres cases à cocher.

Si tu lis la documentation Stimulus, tu verras [ici la syntaxe](https://stimulus.hotwire.dev/reference/actions) pour écouter un événement. Dans Stimulus, on parle d'**Action**.

Mais quel événement vas-tu écouter ?

D'après la (documentation MDN)[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox], une case à cocher émet 2 sortes d'événements : `change` et `click`.
On va utiliser `change` (comme dans un « changement » d'état).

```html
<input id='check-all' type="checkbox" class="form-check-input" data-action='change->check-all-checkboxes#checkAll'>
```

Ici, on dit clairement : « quand l'événement 'change' se produit, appelle la méthode 'checkAll' sur le contrôleur 'check-all-checkboxes' ».

## Rappel d'événement

Maintenant qu'on écoute l'événement 'change' sur la case à cocher, on va coder la méthode `checkAll`.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  checkAll(event) {
    // Your code here
  }
}
```

Tu remarqueras que cette méthode prend un paramètre `event`. Par défaut, les actions Stimulus appellent la méthode avec un objet `event` passé en argument (comme la [bonne vieille fonction `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Dans cette méthode, tu vas devoir :
- Vérifier le statut de la case à cocher « Tout cocher » ("Check All") quand on clique dessus ;
- Si elle est cochée, on va cocher toutes les autres cases
- Si elle n'est pas cochée, on va décocher toutes les autres cases

Mais comment accéder à toutes les autres cases à cocher dans cette méthode ? Bonne question !

## Cibles

En plus des actions (qui remplacent `addEventListener` dans le contexte d'un contrôleur Stimulus), Stimulus introduit les cibles ou `targets` (qui remplacent tes fonctions `querySelector` ou `getElementById` dans le contexte d'un contrôleur Stimulus).

Pour ajouter des cibles, jette un œil à la [documentation Stimulus](https://stimulus.hotwire.dev/reference/targets).

On doit d'abord lister les cibles dans le contrôleur. Dans notre cas, on n'a qu'une seule sorte de cible : les cases à cocher.
On va donc se contenter d'ajouter `static targets = ["checkbox"]`.

```js
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    // Ton code ici
  }
}
```

Puis on va préciser dans le HTML quel élément du DOM doit être ciblé comme une case à cocher ('checkbox').

La syntaxe à utiliser pour cela est… `data-attributes` ! Plus précisément : `data-CONTROLLER_NAME-target="TARGET_NAME"`.

On va donc ajouter `data-check-all-checkboxes-target='checkbox'` à tous les éléments `<input type="checkbox" …>` (à l'exception de « Tout cocher » ou "Check All").

Une fois que c'est fait, le contrôleur Stimulus peut facilement récupérer les cibles avec une syntaxe Stimulus simple :

```js
this.checkboxTarget // -> retourne la première cible de case à cocher
this.checkboxTargets // -> retourner une collection (Array) de toutes les cibles de cases à cocher
```

## Mettre en place la logique

Une fois les cibles en place, on va retourner à la méthode `#checkAll`.

Voici ce que tu dois faire :
- Vérifie le statut de la case « Tout cocher » ("Check All") quand on clique dessus.
- Si elle est cochée, on va itérer sur toutes les cibles de cases à cocher et passer leur propriété `checked` à `true`
- Si elle n'est pas cochée, on va itérer sur toutes les cibles de cases à cocher et passer leur propriété `checked` à `false`

Tu as désormais tout ce qu'il te faut pour résoudre le reste du challenge.

N'oublie pas de tester le comportement de ton contrôleur Stimulus dans le navigateur (test manuel), et n'hésite pas à ajouter `console.log` pour comprendre ce que les méthodes `checkAll` recouvrent

À ton tour !

## Conclusion

Jette un dernier œil à ton fichier `lib/controllers/check_all_checkboxes_controller.js`.

- Tu vois une fonction `querySelector` ? Non, elle a été remplacée par le mécanisme **cible**, qui lie automatiquement les variables `this.$$$Target` aux éléments `data-controller-name-target` définis
- Tu vois une fonction `addEventListener` ? Non, elle a été remplacé par `data-action` avec la syntaxe `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. Tu dois simplement coder le CALLBACK dans ton contrôleur, et c'est bon !

Une fois le contrôleur Stimulus en place, il est très facile de le réutiliser partout sur un site Web avec les bonnes balises HTML.
