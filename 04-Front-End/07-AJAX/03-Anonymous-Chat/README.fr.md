## Contexte et objectifs

Dans ce challenge, tu vas jouer avec une API imposée : l'API de chat du Wagon (**wagon-chat**).
Cette API te permettra de discuter avec tes camarades du Wagon 😉

Pendant cet exercice, tu devras faire des requêtes `GET` et `POST` à un code API. Tu utiliseras des appels AJAX pour mettre en place un chat dynamique, où tu pourras instantanément voir les derniers messages et en publier de nouveaux.


![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/chat-room.gif)

## Ressources
La [documentation de l'API wagon-chat](https://github.com/lewagon/wagon-chat-api/blob/master/README.md)

## Spécifications

Lance ton serveur local avec `serve`. Va sur `localhost:8000`.

### Logique de la vue

Dans le fichier `index.html` du challenge, tu trouveras une page structurée en deux parties :

* Un **bouton d'envoi** avec un formulaire, pour pousser tes messages vers l'API de chat.
* Un **bouton de rafraîchissement** avec une balise, où tu afficheras tous les nouveaux messages.

Commence par lire la [documentation de l'API](https://github.com/lewagon/wagon-chat-api/blob/master/README.md). Combien d'endpoints (points de terminaison) repères-tu ? Sais-tu quel endpoint est lié au formulaire ? Et lequel est lié au bouton de rafraîchissement ?

Code ton JavaScript dans `lib/index.js`.

### Bouton de rafraîchissement : récupérer les messages récents

Dans le markup, tu trouveras le bouton `#refresh`. Quand on clique dessus, on veut afficher les derniers commentaires de toutes les personnes de ton batch !

Tu devras faire une requête `GET` à l'API en JS en utilisant `fetch` : lis la [documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) pour voir comment cette requête est structurée et ce que l'API retournera. Trouve les messages dans les données que tu reçois et affiche chacun d'eux dans le DOM.

Voici un exemple de message :

```html
<li>A sample message (posted <span class="date">10 minutes ago</span>) by John</li>
```

### Bouton d'envoi : pousser tes messages vers l'API

Le moment est venu de prendre part au chat et de publier tes messages !

Le formulaire `#comment-form` a deux entrées (`#your-message` et `#your-name`). Commence par coder un script simple pour récupérer les valeurs des entrées. En premier lieu, tu peux te contenter d'utiliser `console.log()` pour voir les valeurs et t'assurer que tout fonctionne comme voulu. Il s'agit d'un exercice de DOM basique, il n'y a pas encore d'AJAX !

**Astuce** : Tu devras éviter le comportement par défaut d'envoi du formulaire (en utilisant la méthode `preventDefault()`).

Ton code ne publie aucune donnée sur le serveur pour le moment. Pour cela, tu dois améliorer ton code JavaScript en ajoutant une requête `POST` pour envoyer des données à stocker dans la base de données de l'API. Lis la [documentation](https://github.com/lewagon/wagon-chat-api/blob/master/README.md) pour voir comment construire ta requête en utilisant `fetch`.

Voici un exemple d'utilisation de `fetch` sur une [balise JSON d'API](https://jsonplaceholder.typicode.com/):

```js
const message = { name: "George", body: "Hello from Kitt" };
const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url, {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then((data) => {
  console.log(data);
});
```

### Rafraîchissement automatique

Le moment est venu de rafraîchir automatiquement ton application. Débarrasse-toi du bouton de rafraîchissement ("Refresh chat") !

Place à la discussion !
