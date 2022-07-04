## Contexte et objectifs

Dans cet exercice, on va pratiquer nos compétences en AJAX. On va commencer simple avec une requête `GET`. Ici, on utilisera l'[API Geocoding de MapBox](https://www.mapbox.com/search/). On va chercher à créer un outil dans lequel il sera possible de saisir une adresse, d'appuyer sur un bouton et d'obtenir des **coordonnées GPS** en retour ! Et pour couronner le tout, on affichera la carte.


<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/mapbox_ajax_geocoder.gif" alt="MapBox Geocoding demo" width="100%">
</div>

## Spécifications

Tu peux lancer ton serveur local avec :

```bash
rake webpack
```

### Geocoding

Pour commencer, tu vas devoir créer un compte MapBox et obtenir une clé d'API (l'inscription est gratuite !). Lis ensuite la [documentation sur l'API Geocoding de MapBox](https://docs.mapbox.com/api/search/geocoding/). Tout se résumera à une requête HTTP `GET` avec une adresse comme paramètre de string de la requête.

```javascript
'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR-API-KEY'
```

REMARQUE : La requête à l'API Mapbox aura besoin de ta clé API comme paramètre. Tu trouveras ta clé sur ton [compte](https://www.mapbox.com/account/) une fois que tu te seras inscrit et connecté.

Continue et examine le formulaire déjà présent dans le texte standard du challenge `index.html`. Il contient une entrée (`input`) de type `"text"` où un utilisateur peut saisir une adresse, et une entrée (`input`) de type `"submit"` pour afficher un bouton.

Utilise l'événement `submit` pour capturer le moment où le formulaire est envoyé par l'utilisateur. C'est à ce moment-là que tu voudras déclencher la requête AJAX au service Geocoding de MapBox Geocoding en utilisant `fetch` (relis les diapos du cours d'hier).

**Rappel : tu dois coder ton JavaScript dans un contrôleur Stimulus**

Retourne voir l'exercice Stimulus pour suivre les instructions d'installation.

Comme toujours quand tu récupères des données d'une API, commence par afficher ce que tu obtiens de MapBox avec `console.log()`. C'est un énorme JSON ! Maintenant que tu l'as, détermine où se trouvent les coordonnées GPS et affiche-les à l'écran.

Astuce : MapBox retourne les coordonnées avec la longitude d'abord, puis la latitude !

### [FACULTATIF] Afficher une carte

Pour afficher une carte MapBox avec un marqueur à l'adresse spécifiée, on utilisera une deuxième API, l'[API JavaScript de MapBox](https://www.mapbox.com/mapbox-gl-js/api/).

Pour l'utiliser, ajoute cette ligne dans le `head` de ton fichier HTML, afin de pouvoir utiliser la feuille de style de MapBox pour ta carte :

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css" rel="stylesheet">
```

Pour ajouter une carte, tu auras besoin d'un élément HTML de soutien vide. Par exemple :

```html
<div id="map" style="height: 300px; width: 600px"></div>
```

Pour créer facilement la carte et ajouter un marqueur dessus, on utilisera le [paquet mapbox-gl de npm](https://yarnpkg.com/en/package/mapbox-gl).

Il te faut `yarn add mapbox-gl` pour ajouter ce paquet à ton projet.

Pour afficher une carte dans ton élément HTML `#map` avec le paquet `mapbox-gl`, tu dois d'abord importer ce paquet en haut de ton contrôleur Stimulus :

```javascript
import mapboxgl from "mapbox-gl"
```

Puis ensuite, affiche la carte :

```javascript
mapboxgl.accessToken = "yourApiKey"
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [ -0.077, 51.533 ],
  zoom: 12
})
```

Pour ajouter un marqueur à la carte, si la variable `map` possède l'objet `mapboxgl`, tu peux exécuter :

```js
new mapboxgl.Marker()
  .setLngLat([ -0.077, 51.533 ])
  .addTo(map)
```

Amuse-toi bien à géocoder ! 🌎 🌍 🌏
