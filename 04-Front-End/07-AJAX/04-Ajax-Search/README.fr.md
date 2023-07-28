## Contexte et objectifs

Dans ce challenge tu vas utiliser [l'API de OMDb](https://www.omdbapi.com/) (The Open Movie Database).
Cette API te permet de récupérer des informations sur des films à partir de mots-clés.

Pour cela, tu vas devoir implémenter une requête `GET` sur l'API de OMDb afin de récupérer des informations sur les films que tu souhaites et d'implémenter un callback qui va insérer une carte pour chaque film dans le DOM.

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/ajax-search.gif)

## Ressources

La [documentation pour l'API de OMDb](https://www.omdbapi.com/)

## Spécifications

Comme d'habitude, lance ton server avec `serve` depuis ton terminal et va sur `localhost:8000`.

### Logique pour la vue HTML

Dans le fichier `index.html`, tu trouveras une page structurée en deux parties :

* Un **formulaire** avec un champ de texte et un bouton pour envoyer ta recherche à l'API
* Une **div avec l'id `movie-cards`** dans laquelle tu vas injecter une carte pour chaque film

Voici la structure d'URL que tu dois utiliser pour faire une requête à l'API :

```
http://www.omdbapi.com/?s=MOVIE_TITLE&apikey=YOUR_API_KEY
```

Par exemple, cette URL va te renvoyer une liste de films qui contiennent le mot-clé `Harry Potter` :

```
http://www.omdbapi.com/?s=Harry Potter&apikey=adf1f2d7
```

Tu peux utiliser une de ces trois clés API afin d'envoyer tes requêtes (n'hésite pas à changer celle que tu utilises si tu as des erreurs) :

```
- adf1f2d7
- 48727053
- 8691812a
```

Tu peux maintenant coder la logique JavaScript dans ton `lib/index.js`.

### Capture le mot-clé de recherche et fais la requête à l'API

Ajoute un écouteur d'événement sur le clic du bouton `Search` ou lorsque l'utilisateur presse `Entrée` sur son clavier afin de capturer le mot-clé et de faire la requête à l'API.

Tu peux ensuite stocker ce mot-clé dans une variable et construire l'URL que tu vas utiliser dans la requête `fetch`.

N'oublie pas que cette API va te renvoyer un JSON, donc tu vas devoir faire plusieurs opérations avant d'accéder aux résultats.

A chaque étape, pense à ajouter des `console.log` pour voir l'objet que tu manipules.

### Insère une carte pour chaque film dans le DOM

Une fois que tu as accès aux résultats de la requête, tu peux commencer à implémenter le callback qui va insérer une carte pour chaque film dans la div avec l'id `movie-cards`.

Voici le HTML de la carte que tu peux utiliser (mais n'hésite pas à créer la tienne) :

```html
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="card mb-2">
    <img src="https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg" class="card-img-top" alt="Harry Potter and the Half-Blood Prince">
    <div class="card-body">
      <span class="badge bg-primary mb-2">2009</span>
      <h5 class="card-title">Harry Potter and the Half-Blood Prince</h5>
    </div>
  </div>
</div>
```

### Optionnel : rafraîchis les résultats à chaque lettre tapée par l'utilisateur, sur le `keyup`

Maintenant que toute la logique est implémentée, essaie de mettre à jour ton code pour rafraîchir les résultats à chaque fois que l'utilisateur tape une nouvelle lettre.

Bonne recherche !
