## Contexte et objectifs

Dans ce challenge, on va jouer avec l'[API OpenWeatherMap](https://openweathermap.org/) ! On continuera à s'entraîner avec L'AJAX et on découvrira comment demander aux utilisateurs leur position actuelle  !

## Spécifications

Tu peux lancer ton serveur local avec :

```bash
rake webpack
```

Va à [`localhost:8080`](http://localhost:8080/) et ouvre ta console.

### Récupérer ta clé API (1 pour toi et ton buddy)

Commence par aller à l'[API OpenWeatherMap](https://home.openweathermap.org/users/sign_up) et crée un compte pour obtenir ta clé API. Tu devrais la trouver [ici](https://home.openweathermap.org/api_keys). Vous allez tous créer un compte en même temps, ce qui risque de retarder l'activation des clés par Open Weather. Pour éviter ce problème, **partage ta clé API avec ton buddy** pour limiter le nombre de clés à activer.

Tu as le droit de réaliser gratuitement 60 appels / minute, ce qui devrait largement suffire pour ce challenge.

### Météo actuelle

Lis la[documentation de l'API sur la météo actuelle](https://openweathermap.org/current) pour trouver l'endpoint (point de terminaison) qu'on appellera avec `fetch`. Tu l'as trouvé ? **N'oublie pas qu'une URL commence toujours par `http://`** (ou `https://`).

Avant de coder, essaie d'ouvrir l'URL dans ton navigateur pour voir si tu obtiens une réponse. Si tu obtiens `401`, cela signifie que tu as oublié de passer ta clé API ! Tu peux l'ajouter à la **string de requête** de l'URL avec le paramètre `appid` :

```bash
&appid=YOUR_API_KEY
```

Une fois que tu as réussi à afficher la réponse de l'API dans ton navigateur, continue et commence à écrire ta requête `fetch` dans le fichier `lib/index.js`.

Tu te souviens de la syntaxe ? Utilise `console.log()` pour voir ce que tu as obtenu de l'API et t'assurer que tout fonctionne avant d'aller plus loin.

### Afficher des données sur ta page

Avec les données renvoyées à l'API, construis la page suivante :

![Météo actuelle](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

**Ne te lance pas tout de suite** dans le code :

- Commence par imaginer ton HTML avec un papier et un crayon ✏️
- Code le HTML avec les bons attributs (principalement des `id`)
- Code ton JS pour injecter des données aux bons endroits
- Code ton CSS pour rendre tout ça joli ✨

**Astuce :** Pour obtenir la température en degrés Celsius, tu peux ajouter `&units=metric` dans l'URL de ta requête.

### Quel temps fait-il à Kuala Lumpur ?

Maintenant, on va ajouter un formulaire (`<form>`) avec une entrée (`<input>`) de `type="text"` pour demander la météo dans n'importe quelle ville ! Ajoute un bouton `submit` et écoute l'événement `submit` du formulaire pour réaliser un nouvel appel API.

Ta page doit se mettre à jour et afficher les bonnes données, sans se recharger ! Si ton HTML se recharge, cela signifie que tu as oublié d'**empêcher** quelque chose...

![Météo à Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### Ajouter le paquet NPM Select2

Pendant le cours de ce matin, tu as vu comment ajouter [select2](https://select2.org/):

1. Télécharge `jquery` et `select2` avec yarn

    ```bash
    yarn add jquery select2
    ```

2. Ajoute select dans ton fichier `index.html` (supprime l'entrée) :

    ```html
    <select id="city-input" class="select2"></select>
    ```

3. Active `select2` avec :

    ```js
    import $ from 'jquery';
    import 'select2';

    $('#city-input').select2();
    ```

On veut maintenant injecter une liste de villes sans toucher au fichier HTML. Heureusement, select2 [propose une option pour le faire](https://select2.org/data-sources/arrays) !

Copie-colle cet array dans ton code pour le passer à ton `select2` :

```js
const cities = ["Amsterdam","Bali","Barcelona","Belo Horizonte","Berlin","Bordeaux","Brussels","Buenos Aires","Casablanca","Chengdu","Copenhagen","Kyoto","Lausanne","Lille","Lisbon","London","Lyon","Madrid","Marseille","Melbourne","Mexico","Milan","Montréal","Nantes","Oslo","Paris","Rio de Janeiro","Rennes","Rome","São Paulo","Seoul","Shanghai","Shenzhen","Singapore","Stockholm","Tel Aviv","Tokyo"];

$('#city-input').select2({ data: cities, width: '100%' }); // <-- ajoute les options `data` et `width`
```

Tu devrais voir apparaître les villes sur le select, mais pas très bien mises en page. C'est normal, on n'a pas encore ajouté le CSS de select2 au code ! Pour cela, ajoute ce qui suit dans le `<head>` de ton HTML :

```html
<link rel="stylesheet" href="node_modules/select2/dist/css/select2.css">
```

C'est mieux, non ?

### Connaître la météo à l'emplacement actuel

Pour finir, on va ajouter un lien pour connaître la météo à l'**emplacement actuel**. On peut le faire avec [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) depuis le navigateur.

Ajoute une balise `<a>` dans ton fichier `index.html` et associe-la au rappel suivant :

```js
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
});
```

Qu'est-ce que tu obtiens de ton navigateur ? Tes coordonnées GPS. Notre code utilise actuellement des **noms** de ville pour connaître la météo. Heureusement, il existe un endpoint (point de terminaison) qui prend les **coordonnées** dans l'URL. Tu peux faire défiler un peu [la doc](https://openweathermap.org/current) vers le bas pour trouver l'endpoint qui prend une latitude et une longitude comme paramètres.

Continue et définis une autre méthode `fetchWeatherByCoordinates` pour adapter l'URL que tu passes à ta requête `fetch`.

### Le moment est venu de réorganiser ton code !

Tu n'as pas tout à fait fini. Si tout fonctionne, tu peux être tenté de laisser ton code en l'état. Réorganiser ton code pour pouvoir en assurer la maintenance à long terme est impératif si tu veux gagner du temps à l'avenir.

Tu te souviens des règles ?

- Écris les fonctions dans des fichiers séparés
- Importe-les (`import`) dans `lib/index.js` pour les appeler

Amuse-toi bien !
