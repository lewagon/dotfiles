## Contexte et objectifs

Lorsque tu construis une application, il se peut que tu aies besoin d'afficher certaines données à l'aide de graphiques. Pour cela, nous utilisons généralement la bibliothèque [*Chart.js*](https://www.chartjs.org/docs/latest/).

Amusons-nous un peu et affichons quelques statistiques mondiales (ratio hommes/femmes, population d'une année sur l'autre, communautés religieuses dans le monde).

## Configuration

Lance le serveur depuis ton terminal avec :

```bash
serve
```

Et visite `localhost:8000`. Tu peux voir que nous utilisons Bootstrap.

`Stimulus` est déjà installé dans le head `index.html`.

Cependant, il est important que tu continues à t'entraîner à faire la partie configuration du JavaScript toi-même. Dans cet exercice, nous allons créer un contrôleur séparé pour chaque type de graphique.
-  Importe et enregistre le contrôleur Stimulus dans `index.js`.
-  Crée ton fichier de contrôleur dans le dossier `controllers` et n'oublie pas d'y ajouter le template de contrôleur Stimulus.

Si tu as du mal à t'en souvenir, n'hésite pas à jeter un coup d'œil aux exercices précédents.

##  Spécifications

Nous allons importer le plugin `Chart.js` avec `importmap`. Stimulus est déjà ajouté dans le boilerplate, mais tu devras ajouter `Chart.js` toi-même (instructions ci-dessous).

Ensuite, nous utiliserons le plugin pour implémenter 3 types différents de graphiques dans l'exercice :
-  un [diagramme en forme de beignet](https://www.chartjs.org/docs/latest/charts/doughnut.html)
-  un [graphique linéaire](https://www.chartjs.org/docs/latest/charts/line.html)
-  un [graphique polar](https://www.chartjs.org/docs/latest/charts/polar.html)

Regarde la documentation pour comprendre comment chaque type fonctionne.

### 1. Prépare ton HTML

Il y a 3 sections distinctes dans ton HTML. Dans chacune d'entre elles, tu afficheras chaque type de graphique comme indiqué. Tu remarqueras dans le fichier `index.html` qu'il y a 3 en-têtes : "Ratio de Genre", "Population Mondiale" et "Communautés Religieuses". Nous voulons mettre le graphique pour chacun d'eux près de son en-tête respectif.

_Note : La structure HTML est déjà configurée pour toi, mais prends un moment pour regarder le fichier et assure-toi de le comprendre._

### 2. Configurer `Chart.js` avec `importmap`

Dans le `index.html`, tu peux remarquer que Stimulus est déjà installé via `importmap`. Tu devras ajouter ces deux lignes au `<script type="importmap"></script>` pour installer `Chart.js` :

```html
{
  "imports": {
    ...,
    "chart.js": "https://ga.jspm.io/npm:chart.js@4.2.0/dist/chart.js",
    "@kurkle/color": "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"
  }
}
```

`Chart.js` a besoin d'une autre dépendance appelée `@kurkle/color` pour fonctionner, c'est pourquoi nous l'importons également.

Ensuite, dans ton `lib/index.js`, ajoute les lignes suivantes en haut de ta page :

```javascript
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
```

Ces lignes importeront toutes les fonctions de la bibliothèque.

Et un peu plus bas dans la page :

```javascript
const charts = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chart.register(...charts);
```

Ces lignes [chargent toutes les fonctions pour chaque type de graphique que Chart.js a disponibles](https://www.chartjs.org/docs/latest/getting-started/usage.html).

### 3. Comprendre le plugin Chart.js

Voici un [diagramme en forme de beignet](https://www.chartjs.org/docs/latest/charts/doughnut.html). Nous allons l'utiliser pour représenter le ratio hommes-femmes dans le monde.

En 2020, selon l'[INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), le nombre d'hommes et de femmes dans le monde était à peu près égal. Plus précisément, sur 1 000 personnes, 504 sont des hommes (50,4 %) et 496 sont des femmes (49,6 %).

Construisons un Objet JavaScript pour représenter ces données :

```javascript
const worldPopulation = {
  "men": 504,
  "women": 496
}
```

Nous utiliserons cet Objet pour construire les tableaux `labels` et `data`, qui sont requis par Chart.js pour rendre le graphique. Voici un exemple tiré de la documentation de Chart.js de ce à quoi la structure de données devrait ressembler (avec quelques données d'exemple aléatoires) :

```javascript
data = {
    datasets: [{
        data: [300, 50, 100]
    }],

    // Ces labels apparaissent dans la légende et dans les infobulles lorsque tu survoles différents arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```

Voici un exemple de la façon dont nous pourrions construire un graphique à barres avec Chart.js en utilisant ces données :

```javascript
const labels = ['Red', 'Blue', 'Yellow']
const data = [300, 50, 100]

new Chart(this.element, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: data,
      backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});
```

En se basant sur notre objet `worldPopulation`, comment peux-tu construire un tableau `labels` contenant `"men"` et `"women"` et un second tableau `data` contenant `504` et `496` ?

Jette un coup d'œil aux méthodes existantes sur les objets JavaScript comme `Object.keys()` dans les [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) pour te donner une idée de la façon de créer des tableaux basés sur un Objet.

### 4. Implémenter la logique

Maintenant que tu as une meilleure compréhension du fonctionnement du plugin, implémentons la logique.

Assure-toi d'attacher ton contrôleur Stimulus et de définir la cible correcte pour le rendu de ton graphique.

Chaque graphique aura un contrôleur Stimulus séparé. Appelons celui-ci `DoughnutChartsController`.

En haut de la page, importe le plugin `Chart.js` :

```javascript
// lib/controllers/doughnut_charts_controller.js
import { Chart } from "chart.js";
```

Dans ta méthode `connect()` :
-  crée tes 2 tableaux `labels` et `data`
-  crée ton instance `Chart` avec le bon `type`, `data` et `datasets` (garde toujours un œil sur la documentation lorsque tu utilises des bibliothèques externes)
-  passe des couleurs de fond à tes `datasets` pour chaque label

💡 Une question clé à considérer est quand le graphique doit être rendu ? Devrait-il être affiché dès le chargement de la page ? Ou après que l'utilisateur clique ou interagit avec quelque chose ? N'oublie pas que la méthode `connect()` dans Stimulus se déclenche chaque fois que le contrôleur est connecté à la page, généralement au chargement initial. Cela devrait t'aider à déterminer où mettre la majeure partie de ton code.

Si nécessaire, ajoute un peu de CSS pour réduire la taille du graphique.

Si tu as besoin de quoi que ce soit d'autre, jette un œil aux alternatives `options` pour les graphiques en forme de beignet de Chart.js.

### 5. Implémenter le graphique en ligne

Pour le graphique linéaire, nous allons suivre le même processus. Cette fois, nous allons afficher un graphique de la croissance de la population mondiale année par année depuis 2010.

Utilisons cette [ressource](https://www.worldometers.info/world-population/world-population-by-year/).

Construis un objet `worldPopulationGrowth` avec la structure suivante :

```javascript
const worldPopulationGrowth = {
  "2020": 7794798739,
  // maintenant c'est à toi de compléter le reste de l'objet jusqu'en 2010
}
```

Ensuite, utilise cet objet pour construire tes tableaux `labels` et `data`. Ensuite, implémente l'instance `Chart` pour rendre le graphique linéaire.

💡 N'oublie pas que tu voudras avoir un contrôleur Stimulus séparé pour ce graphique. Appelons-le `LineChartsController`.

### 6. Implémenter le graphique de l'aire polaire

Jetons un coup d'œil à la page [Wikipedia](https://en.wikipedia.org/wiki/List_of_religious_populations) sur les populations religieuses dans le monde.

Sélectionnons 10 d'entre elles et construisons un objet à partir de celles-ci :

```javascript
const worldReligions = {
  "christianity": 2382000000,
  // maintenant c'est à toi de compléter le reste de l'objet
}
```

Ensuite, utilisons la même logique que précédemment pour implémenter le graphique de l'aire polaire.
