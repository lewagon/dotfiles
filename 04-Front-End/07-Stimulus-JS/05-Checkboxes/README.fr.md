## Contexte et objectifs

Dans cet exercice, on utilisera le framework JavaScript [Stimulus](https://stimulus.hotwired.dev/). Ce framework a été créé par [Basecamp](https://basecamp.com/), la société qui est aussi derrière le framework Ruby on Rails.

Ce framework se vante d'être le « modeste framework de HTML que tu possèdes déjà ». C'est un framework que tu pourras utiliser pendant tes projets pour t'aider à organiser ton code JavaScript. Il fonctionne bien avec Rails, car il te permet de générer du HTML de façon dynamique côté serveur (souviens-toi de MVC, Sinatra, etc.) et d'ajouter du comportement JS.

Le gros avantage de Stimulus est que tu n'auras jamais plus à écrirele de `querySelector` ou d'`addEventListener` ! Au lieu de cela, tu utiliseras les attributs HTML de données (`data-`) sur un élément spécifique.

Ce framework utilise les [classes ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), un ajout bien utile depuis 2015 (date de publication d'ES6) pour ajouter la programmation orientée objet à JavaScript.

## Texte standard

Continue : ouvre `index.html` et jette un œil au code à l'intérieur.

C'est un formulaire HTML avec des cases à cocher :
- 1 case à cocher « Tout cocher » ("Check All")
- 4 cases à cocher avec des catégories

Tu peux lancer le serveur webpack :

```bash
yarn install
rake webpack
```

et ouvrir [localhost:8080](http://localhost:8080) dans ton navigateur.

Tu peux cocher chacune des cases individuellement, mais la case à cocher « Tout cocher » ("Check all") ne fonctionne pas encore. C'est le comportement qu'on va chercher à coder avec JavaScript et ton nouvel ami : Stimulus.

## Installation de Stimulus

Tout d'abord, ajoute le paquet Stimulus à ton projet :

```bash
yarn add @hotwired/stimulus
yarn add @hotwired/stimulus-webpack-helpers
```

Puis ouvre le fichier `lib/index.js` et ajoute les lignes suivantes au début du fichier :

```javascript
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
```

Ces instructions proviennent du [guide d'installation de Stimulus](https://stimulus.hotwired.dev/handbook/installing#using-webpack-helpers) et sont nécessaires pour **charger** Stimulus dans ton application.

## Ton premier contrôleur Stimulus

Tout d'abord, crée le dossier `controllers` où sera ton code :

```bash
mkdir lib/controllers
```

Maintenant, crée le fichier de ton premier contrôleur Stimulus :

```bash
touch lib/controllers/check_all_checkboxes_controller.js
```

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!")
  }
}
```

Tu vois la méthode `connect()` ? Cette méthode est déclenchée lorsque le contrôleur est **connecté** au document, c'est-à-dire lorsque l'élément HTML avec l'attribut `data-controller` est présent dans le DOM.

La méthode `connect()` est ce que l'on appelle une méthode du cycle de vie (**lifecycle callback**). Si tu veux en savoir plus sur les cycles de vie des contrôleurs Stimulus, [lis cette documentation](https://stimulus.hotwire.dev/reference/lifecycle-callbacks).

## Relie le contrôleur au HTML

Maintenant, modifie ton HTML pour **connecter** le contrôleur :
- Sur quel élément du DOM vas-tu connecter ton contrôleur ?
- Quelle est la syntaxe pour le connecter ?

Important : nous savons que le contrôleur va devoir interagir avec la case à cocher "Check all" et aussi avec les 4 autres case à cocher de catégorie. Dans Stimulus, un contrôleur ne peut interagir qu'avec les éléments à sa portée, c'est-à-dire uniquement avec les éléments enfants de l'élément auquel il est connecté. Donc la question ici est : "Quel est l'élément qui enveloppe à la fois la case à cocher 'Check all' et les cases à cocher de catégorie ?"

<details>
  <summary markdown="span">Indice</summary>

  ```html
  <form data-controller="check-all-checkboxes">
    <!-- ... -->
  </form>
  ```
</details>

Une fois que tu as connecté le contrôleur, retourne à ton navigateur, ouvre la console et recharge la page.

Tu devrais voir apparaître le message `The 'check-all-checkboxes' controller is now loaded!` dans la console 🎉

## Écouter un événement

On veut maintenant que toutes les cases se cochent quand on coche la case « Tout cocher » ("Check all"). Cela signifie qu'on veut écouter l'événement qui se produit sur la case « Tout cocher » ("Check all"), puis déclencher la logique du code pour les autres cases à cocher.

Si tu lis la documentation Stimulus, tu verras [ici la syntaxe](https://stimulus.hotwire.dev/reference/actions) pour écouter un événement. Dans Stimulus, on parle d'**Action**.

Mais quel événement vas-tu écouter ?

D'après la [documentation MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), une case à cocher émet 2 sortes d'événements : `change` et `click`.

On va utiliser `change` (comme dans un « changement » d'état).

```html
<input id="check-all" type="checkbox" class="form-check-input" data-action="change->check-all-checkboxes#checkAll">
```

Ici, on dit clairement : « quand l'événement 'change' se produit, appelle la méthode 'checkAll' sur le contrôleur 'check-all-checkboxes' ».

## Méthode d'événement

Maintenant qu'on écoute l'événement "change" sur la case à cocher, on va coder la méthode `checkAll`:

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  checkAll(event) {
    console.log(event)
  }
}
```

Tu remarqueras que cette méthode prend un paramètre `event`. Par défaut, les actions Stimulus appellent la méthode avec un objet `event` passé en argument, comme la [bonne vieille fonction `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Dans ton navigateur, ouvre la console et coche ou décoche la case "Check all" : tu devrais voir l'événement s'imprimer 🎉

Maintenant, dans cette méthode, tu vas devoir :
- Vérifier le statut de la case à cocher "Check All"
- Si elle est cochée, on coche toutes les autres cases
- Si elle n'est pas cochée, on décoche toutes les autres cases

Mais comment accéder à toutes les autres cases à cocher dans cette méthode ? Avec des "Targets"

## Targets (cibles)

Dans Stimulus, en plus des actions, qui remplacent les `addEventListener`, tu peut utiliser des cibles ou **targets** qui remplacent tous tes `querySelector` et tes `getElementById`.

Si tu lis la documentation Stimulus, tu verras [ici la syntaxe](https://stimulus.hotwire.dev/reference/targets) pour ajouter des targets.

Tout d'abord, tu dois lister tes targets dans ton contrôleur. Dans notre cas, nous n'avons qu'un type de target : les cases à cocher catégorie.

Tu vas donc ajouter `static targets = ["checkbox"]` en haut de ton contrôleur :

```javascript
// lib/controllers/check_all_checkboxes_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox"]

  checkAll(event) {
    console.log(event)
  }
}
```

Puis tu vas préciser dans le HTML quel élément du DOM doit être ciblé comme une case à cocher ('checkbox').

La syntaxe à utiliser pour cela est... `data-attributes` ! Plus précisément : `data-CONTROLLER_NAME-target="TARGET_NAME"`.

On va donc ajouter `data-check-all-checkboxes-target='checkbox'` à tous les éléments `<input type="checkbox" ...>` (à l'exception de la case "Check All").

Une fois que c'est fait, le contrôleur Stimulus peut facilement récupérer les cibles avec une syntaxe simple :

```javascript
this.checkboxTarget // -> retourne la target checkbox, comme querySelector
this.checkboxTargets // -> retourne toutes les targets checkbox, comme querySelectorAll
```

## Mettre en place la logique

Une fois les cibles en place, retourne à la méthode `#checkAll`.

Voici ce que tu dois faire :
- Vérifie le statut de la case "Check All" quand on clique dessus.
- Si elle est cochée, itère sur toutes targets checkbox et change leur propriété `checked` à `true`.
- Si elle n'est pas cochée, itère sur toutes les targets checkbox et change leur propriété `checked` à `false`.

Tu as désormais tout ce qu'il te faut pour résoudre le reste de l'exercice.

N'oublie pas de tester le comportement de ton contrôleur Stimulus dans le navigateur (test manuel) et n'hésite pas à ajouter `console.log` pour comprendre ce qu'il se passe dans la méthode `checkAll`.

À ton tour !

## Enseignements clés

Jette un dernier œil à ton fichier `lib/controllers/check_all_checkboxes_controller.js`.

- Est-ce que tu vois une fonction `querySelector` ? Non, elle a été remplacée par le mécanisme de **target** qui lie automatiquement les variables `this.$$$Target` aux éléments `data-controller-name-target` définis.
- Est-ce que tu vois une fonction `addEventListener` ? Non, elle a été remplacé par `data-action` avec la syntaxe `EVENT_TYPE->CONTROLLER_NAME#CALLBACK`. Tu dois simplement coder la méthode dans ton contrôleur, et c'est bon !

Une fois le contrôleur Stimulus en place, il est très facile de le réutiliser partout sur un site Web avec les bonnes balises HTML.

**À partir de maintenant, nous coderons toujours notre JavaScript dans des contrôleurs Stimulus**

## Aller plus loin

Si tu veux en apprendre plus à propos de Stimulus, nous te conseillons de lire les pages suivantes (en anglais) :

- [The Origin of Stimulus](https://stimulus.hotwired.dev/handbook/origin)
- How to pass data from your HTML to your Stimulus controller using [Values](https://stimulus.hotwired.dev/reference/values)
- How to pass CSS classes from your HTML to your Stimulus controller using [CSS Classes](https://stimulus.hotwired.dev/reference/css-classes)
