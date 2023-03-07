## Contexte et objectifs

Dans ce challenge, on va jouer avec l'[API OpenWeatherMap](https://openweathermap.org/) ! On continuera à s'entraîner à appeler des APIs et on découvrira comment demander aux utilisateurs leur position actuelle  !

## Spécifications

Tu peux lancer ton serveur local avec :

```bash
serve
```

Va à [`localhost:8000`](http://localhost:8000/) et ouvre ta console.

### Récupérer ta clé API (1 pour toi et ton buddy)

Commence par aller sur le site de l'[API OpenWeatherMap](https://home.openweathermap.org) et crée un compte pour obtenir ta clé API. Tu devrais la trouver [ici](https://home.openweathermap.org/api_keys). Vous allez tous créer un compte en même temps, ce qui risque de retarder l'activation des clés par Open Weather. Pour éviter ce problème, **partage ta clé API avec ton buddy** pour limiter le nombre de clés à activer.

Tu as le droit de réaliser gratuitement 60 appels / minute, ce qui devrait largement suffire pour ce challenge.

### Météo actuelle

Lis la[documentation de l'API sur la météo actuelle](https://openweathermap.org/current) pour trouver l'endpoint (point de terminaison) qu'on appellera avec `fetch`. Tu l'as trouvé ? **N'oublie pas qu'une URL commence toujours par `http://`** (ou `https://`).

Avant de coder, essaie d'ouvrir l'URL dans ton navigateur pour voir si tu obtiens une réponse. Si tu obtiens `401`, cela signifie que tu as oublié de passer ta clé API ! Tu peux l'ajouter à la **string de requête** de l'URL avec le paramètre `appid` :

```bash
&appid=YOUR_API_KEY
```

Une fois que tu as réussi à afficher la réponse de l'API dans ton navigateur, passons à l'implémentation JavaScript.

### Afficher les données sur ta page

Avec les données renvoyées à l'API, construis la page suivante :

![Météo actuelle](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_api.png)

Pour récupérer la température en degrés Celsius, tu peux ajouter `&units=metric` dans l'URL de ta requête.

Pour récupérer l'image de l'icône, à partir de l'id de l'icône, tu peux utiliser cette URL : `https://openweathermap.org/img/w/{iconId}.png`

### Quel temps fait-il à Kuala Lumpur ?

Maintenant, écoute l'événement `submit` sur le `<form>` pour récupérer les données utilisateur dans l'`<input>` et modifie l'URL avant de faire ta requête à l'API.

Ta page doit se mettre à jour et afficher les bonnes données, sans se recharger ! Si ta page se recharge, cela signifie que tu as oublié d'empêcher (**prevent**) quelque chose...

![Météo à Kuala Lumpur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/weather_in_kuala_lumpur.png)

### Connaître la météo à la position actuelle

Maintenant nous aimerions avoir la météo à la position où se trouve l'utilisateur.

Tout d'abord, dans le HTML, retire la classe `d-none` du lien :

```html
<a href="" class="d-none position"><i class="bi bi-geo-alt"></i></a>
```

Tu dois voir un icône de localisation apparaître.

Tu peux récupérer la **position actuelle** d'un utilisateur avec la méthode [`getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) du navigateur :

```javascript
navigator.geolocation.getCurrentPosition((data) => {
  console.log(data)
});
```

Qu'est-ce que tu obtiens de ton navigateur ? Tes coordonnées.

Pour le moment, ton code utilise des **noms** de villes pour récupérer la météo. Heureusement, il existe un endpoint (point de terminaison) qui prend les **coordonnées** dans l'URL. Tu peux faire défiler un peu [la doc](https://openweathermap.org/current) vers le bas pour trouver l'endpoint qui prend une latitude et une longitude comme paramètres.

Continue et ajoute un event listener au clic de l'icone de localisation, qui va appeler l'API avec les coordonnées de l'utilisateur, et mettre à jour la page avec les bonnes données.

Si ta page HTML se recharge, c'est sûrement parce que tu as oublié d'empêcher (**prevent**) quelque chose...

### Le moment est venu de réorganiser ton code !

Tu n'as pas tout à fait fini. Lorsque tout fonctionne, tu peux être tenté de laisser ton code en l'état. Réorganiser ton code pour pouvoir en assurer la maintenance à long terme est impératif si tu veux gagner du temps à l'avenir.

Est-ce que tu vois du code qui se répète ? Tu devrais pouvoir réécrire ton code dans des méthodes séparées afin qu'il devienne plus lisible 🙌
