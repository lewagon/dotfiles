## Contexte et objectifs

Lors de la création d'une application, il se peut que tu aies besoin d'afficher certaines données à l'aide de graphiques. Pour cela, nous utilisons généralement la bibliothèque [*Chart.js*](https://www.chartjs.org/docs/latest/).

Amusons-nous un peu et affichons quelques statistiques mondiales (ratio hommes/femmes, population d'une année sur l'autre, communautés religieuses dans le monde).

## Configuration

Lance le serveur depuis ton terminal avec :

```bash
serve
```

Et visite `localhost:8000`. Tu peux voir que nous utilisons Bootstrap.

`Stimulus` est déjà installé dans le head `index.html`.

Cependant, il est important que tu continues à t'entraîner à faire la partie configuration du JavaScript toi-même. Dans ce challenge, nous allons créer un contrôleur séparé pour chaque type de graphique.
- Importe et enregistre le contrôleur Stimulus dans `index.js`.
- Créé ton fichier de contrôleur dans le dossier `controllers` et n'oublie pas d'y ajouter le template de contrôleur Stimulus.

Si tu as du mal à t'en souvenir, n'hésite pas à jeter un coup d'œil aux challenges précédents.

##  Spécifications

Nous allons importer le plugin `Chart.js` avec `importmap`.

Ensuite, nous utiliserons le plugin pour implémenter 3 types de graphiques différents dans le challenge :
- un [diagramme en forme de beignet](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- un [graphique linéaire](https://www.chartjs.org/docs/latest/charts/line.html)
- un [graphique radar](https://www.chartjs.org/docs/latest/charts/radar.html)

Regarde la documentation pour comprendre comment chaque type fonctionne.

### 1. Prépare ton HTML

Il y a 3 sections distinctes dans ton HTML. Dans chacune d'entre elles, tu afficheras chaque type de graphique comme indiqué.

### 2. Configurer `Chart.js` avec `importmap`

Tout d'abord, ajoutons ces 2 lignes dans la liste `importmap` :

```html
{
  "imports" : {
    ...,
    "chart.js" : "https://ga.jspm.io/npm:chart.js@4.2.0/dist/chart.js",
    "@kurkle/color" : "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"
  }
}
```

`Chart.js` a besoin d'une autre dépendance appelée `@kurkle/color` pour fonctionner.

Ensuite, dans ton `index.js`, ajoute les lignes suivantes en haut de ta page :

```javascript
import { Chart } from "chart.js" ;
import * as Chartjs from "chart.js" ;
```

Ces lignes importeront toutes les fonctions de la bibliothèque.

Et ceci un peu plus bas dans la page :

```javascript
const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
) ;
Chart.register(...controllers) ;
```

Ces lignes chargent les fonctions spécifiques de chaque type de graphique.

### 3. Comprendre le plugin Chart.js

Voici un [diagramme en forme de beignet](https://www.chartjs.org/docs/latest/charts/doughnut.html). Nous allons l'utiliser pour représenter le ratio hommes-femmes dans le monde.

En 2020, selon l'[INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), le nombre d'hommes et de femmes dans le monde était à peu près égal. Plus précisément, sur 1 000 personnes, 504 sont des hommes (50,4 %) et 496 sont des femmes (49,6 %).

Construisons un Objet :

```javascript
const worldPopulation = {
  "men": 504,
  "women": 496
}
```

Cet objet sera utilisé pour construire les tableaux `labels` et `data`. (voir l'onglet Setup dans la documentation sous l'exemple).

Ensuite, nous devons passer quelques données à notre instance de `Chart` pour que le plugin puisse les récupérer, comme ceci :

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

En se basant sur notre objet `WorldPopulation`, comment construire un tableau `labels` contenant `"men"` et `"woman"` et un second tableau `data` contenant `504` et `496` ?

Jette un coup d'œil aux méthodes existantes sur les objets JavaScript comme `Object.keys()` dans les [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) pour te donner une idée de la façon de créer des tableaux basés sur un Objet.

### 4. Implémenter la logique

Maintenant que tu as une meilleure compréhension du fonctionnement du plugin, implémentons la logique.

Assure-toi d'attacher ton contrôleur Stimulus et de définir la cible correcte pour le rendu de votre graphique.

Chaque graphique aura un contrôleur Stimulus séparé. Appelons celui-ci `DoughnutChartsController`.

En haut de la page, importez le plugin `Chart.js` :

```javascript
// ...
import { Chart } from "chart.js" ;
```

Dans votre méthode `connect()` :
- créé tes 2 tableaux `labels` et `data`.
- créé ton instance `Chart` avec les bons `type`, `data` et `datasets` (garde toujours un oeil sur la documentation lorsque tu utilises des librairies externes)
- passe des couleurs de fond à tes `datasets` pour chaque étiquette

Si nécessaire, ajoute un peu de CSS pour réduire la taille du graphique.

Si tu as besoin de quoi que ce soit d'autre, jette un oeil aux alternatives `options`.

### 5. Implémenter le graphique en ligne

Pour le graphique linéaire, nous allons suivre le même processus. Cette fois, nous allons implémenter une croissance de la population mondiale d'une année sur l'autre depuis 2010.

Utilisons cette [ressource](https://www.worldometers.info/world-population/world-population-by-year/).

Construisons un objet `worldPopulationGrowth` avec la structure suivante :

```javascript
const worldPopulationGrowth = {
  "2020": 7794798739,
  // your turn now to fill the rest of the object until 2010
}
```

Utilise ensuite cet objet pour construire tes tableaux `labels` et `data`. Ensuite, implémente l'instance `Chart` pour rendre le graphique linéaire.

### 6. Implémenter le graphique de l'aire polaire

Jetons un coup d'œil à la page [Wikipedia](https://en.wikipedia.org/wiki/List_of_religious_populations) sur les populations religieuses dans le monde.

Sélectionnons 10 d'entre elles et construisons un objet à partir de celles-ci :

```javascript
const worldReligions = {
  "christianity" : 2382000000,
  // your turn now to fill the rest of the object until 2010
}
```

Ensuite, réutilisons la même logique que précédemment pour implémenter la carte des zones polaires.
