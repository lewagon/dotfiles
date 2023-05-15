## Contexte et objectifs

Pour continuer à ajouter des controlleurs à ta bibliothèque de composants Stimulus, tu vas maintenant implémenter un composant qui compte le nombre de caractères d'une entrée.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-animation.gif)

Les contrôleurs Stimulus sont conçus pour être réutilisables. Garde en tête que tu pourras les réutiliser plus tard dans de nombreuses fonctionnalités différentes de ton projet. Ces contrôleurs sont souvent appelés `utilities`.

## Configuration

Lance le serveur depuis votre terminal avec :

```bash
serve
```

Et visite `localhost:8000`. Tu peux voir que nous utilisons Bootstrap.

Cette fois, `Stimulus` est déjà installé dans le head `index.html`.

Cependant, il est important que tu continues à t'entraîner à faire la partie configuration du JavaScript toi-même. Ouvre `index.js`, importe le contrôleur Stimulus en haut et enregistre le contrôleur en bas. Tu peux nommer ce contrôleur `CharacterCountController`.

Crée un fichier `character_count_controller.js` dans le dossier `controllers` vide, et copie-colle le template :

```javascript
// lib/controllers/character_count_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

Nous sommes prêts !

## Spécifications

Le but est d'implémenter un compteur qui compte le nombre de caractères dans la zone de texte.

### 1. Imagine le concept

Maintenant que tu disposes d'une configuration de base, réfléchis au concept du composant. Quel est l'objectif de ce composant ? Comment vas-tu le coder ? Prends une feuille de papier et dessine ton composant. Il pourrait ressembler à ceci :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/tutorials/character_counter/character-counter-mockup.png)

Ensuite, pose-toi les questions suivantes :
- Aurai-je besoin d'ajouter des cibles Stimulus au HTML ? Par exemple, une cible `counter` qui affichera le nombre.
- Devrai-je ajouter des actions de stimulation au code HTML ?
- Devrai-je ajouter des valeurs de stimulation au code HTML ?

Lorsque tu as une idée approximative de ton composant, tu peux commencer à coder !

### 2. Prépare le HTML

Ajoute une balise `<textarea>` dans ton fichier `index.html`.

Ensuite, ajoute une petite balise `<div>` qui servira de compteur et affichera le nombre de caractères.

Ajoute des classes Bootstrap pour rendre ta page un peu plus jolie si nécessaire.

### 3. Implémente le contrôleur Stimulus

Assure-toi d'attacher ton Contrôleur Stimulus au DOM.

Nous devrons implémenter une méthode `updateCounter()` qui comptera et recomptera le nombre de caractères dans la zone de texte à chaque fois. Mais quel événement déclenche l'appel de cette méthode ? Lorsque tu le trouveras, ajoute l'attribut Stimulus `data-action` qui correspond à la zone de texte.

Dans ton contrôleur Stimulus, codons maintenant le callback de l'événement. Comme toujours, ajoute un `console.log` dans la méthode et vérifie qu'il fonctionne à chaque fois que l'événement est appelé.

Une fois cela fait, réfléchissez au pseudocode du callback.

### 4. Implémente la méthode `updateCounter()`

Lorsqu'un utilisateur tape un caractère dans la zone de texte, nous devons :

- Récupérer le nombre de caractères dans la zone de texte.
- Mettre à jour le compteur avec le nombre de caractères.

### Allons plus loin : Implémentons une limite de caractères !

Maintenant que tu disposes d'un compteur fonctionnel, ajoutons une limite de caractères. Lorsque l'utilisateur tape plus de 140 caractères, le compteur doit devenir rouge et afficher : `Nombre de caractères dépassé de X caractères`.
