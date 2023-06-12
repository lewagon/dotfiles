## Contexte et objectifs

Dans ce challenge, tu vas créer la **même liste de to-do**, mais cette fois, en utilisant **[Mustache.js](https://github.com/janl/mustache.js)**.

### Préparation

Lançons un serveur web local avec :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

### Données

Dans le fichier `index.html`, nous avons désormais :

```html
<script type="importmap">
  {
    "imports": {
      "mustachejs": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js"
    }
  }
</script>
```

Cela veut dire que nous sommes prêts à utiliser la librairie Mustache.js, importée ici depuis un CDN.

Comme dans le challenge précédent, nous t'avons préparé une liste de to-do dans le fichier `lib/to-do-list.js`.

```js
const todos = [
  { title: "Code a to-do list", done: false },
  { title: "Eat breakfast", done: true },
  { title: "Do some exercise", done: false },
  { title: "Water the plants", done: true },
];
```

### HTML

Voici le snippet HTML pour une to-do que nous avons utilisé dans le challenge précédent :

```html
<div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
  <input class="d-flex form-check-input me-1" type="checkbox" />
  <div>Water the plants</div>
</div>
```

Plaçons ce HTML dans une balise `<template>` dans le fichier `index.html` (il n'y est pas encore cette fois-ci !). Assure-toi d'ajouter une `id` sur ta balise `<template>` pour pouvoir la sélectionner facilement plus tard 💪

### Afficher la liste

Ensuite, il te faudra itérer sur tes `todos` (comme pour le challenge précédent) et afficher le HTML dans le `<template>` pour chaque to-do. Mais cette fois, utilisons Mustache.js pour le faire. Voici un exemple de la façon d'utiliser Mustache.js pour générer du HTML (depuis le JS) :

```js
# En supposant que nous avons un élément `<template>` sur la page avec l'`id` `#myTemplate`.
const template = document.querySelector("#myTemplate").innerHTML
const output = Mustache.render(template, {});
```

#### Rendre le titre dynamique

Toutefois, toutes nos tâches vont maintenant dire : "Arroser les plantes" puisque nous avons codé en dur cette partie 😿 Alors, rendons-la dynamique ! Dans un template Mustache, tu peux rendre une partie du template dynamique en utilisant... des moustaches dans le HTML 👨 comme ceci :

```html
<template id="myTemplate">
  <div>{{ message }}</div>
</template>
```

Ensuite, dans le JavaScript, tu peux passer des informations dans ces slots dynamiques comme ceci :

```js
const template = document.querySelector("#myTemplate").innerHTML;
const output = Mustache.render(template, { message: "Hello, world!" });
```

Le deuxième argument de `Mustache.render` est un objet JavaScript qui contient toutes les informations nécessaires pour remplir les espaces entre les moustaches `{{ }}` en fonction des clés de l'objet.

C'est maintenant à toi de jouer. Essaye d'utiliser les moustaches `{{ }}` dans ton modèle pour changer dynamiquement le titre de chaque tâche.

#### Rendre la case à cocher dynamique

Mais, malgré tout, toutes nos cases à cocher seront décochées par défaut 🥶 Elles sont statiques/codées en dur et devraient être dynamiques parce que chaque tâche doit avoir sa case à cocher correspondante cochée ou décochée en fonction de la valeur vrai/faux de `done`. Utilisons donc quelques moustaches `{{ }}` pour résoudre le problème !

Astuce : Tout comme nous avons utilisé les moustaches `{{ }}` pour le contenu d'une balise HTML, tu peux aussi les utiliser comme valeur pour des attributs HTML comme `class="{{ myClassNames }}"`.
