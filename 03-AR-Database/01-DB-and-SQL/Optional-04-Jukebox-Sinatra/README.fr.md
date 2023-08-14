## Contexte et objectifs

Nous souhaitons construire une petite application web [Sinatra](http://www.sinatrarb.com/) pour afficher toutes les informations de la base de données Jukebox que tu as utilisée dans certains des challenges de la journée.
Tu peux utiliser `rake` pour tester ton application Sinatra. Lance-le avec la commande habituelle `rake`.

## Mise en place

Installe les gems spécifiés dans ton `Gemfile` avec la commande suivante :

```bash
bundle install
```
Cela va créer un fichier `Gemfile.lock` généré automatiquement qui spécifie les versions de chaque gemme et les vérouille.

Lance ton application Sinatra :

```bash
ruby lib/app.rb
```

Regarde ! Tu peux aller sur [http://localhost:4567](http://localhost:4567). Tu es en train de faire tourner un petit serveur web et tu y accèdes avec ton navigateur. Fini la ligne de commande !

## Quelques mots sur Sinatra

Sinatra est ce qu’on appelle un « microframework » web. C’est essentiellement un micro Rails, qui suit également le **MVC** pattern.
Le fichier `app.rb` agit comme le contrôleur. La fonction de routage est gérée par Sinatra.
Nous avons déjà créé une méthode de contrôleur qui va sur la racine de notre application web, `/`. Sinatra fait correspondre l’URL dans le navigateur à la bonne méthode dans `app.rb`. Jette un coup d’œil à la [doc sur le routage](http://www.sinatrarb.com/intro.html#Routes) pour plus d’infos.

N’hésite pas à lire plus sur Sinatra dans notre [tutoriel](https://github.com/lewagon/sinatra-101) (tu peux passer la partie **Setup** car tu as déjà un boilerplate dans le dossier `lib`).

## Spécifications

### Page d’accueil

Tu dois coder une page d’accueil `/` qui affiche une liste de tous les artistes du Jukebox. En cliquant sur le nom d’un artiste, tu dois aller sur la page de cet artiste.

### Page d’artiste

Tu dois coder une page `/artists/:id` qui affiche tous les albums de cet artiste. En cliquant sur le nom d’un album, tu dois être redirigé vers la page de cet album.

### Page d’album

Tu dois coder une page `/albums/:id` qui affiche les morceaux de cet album. En cliquant sur le nom d’un morceau, tu dois être redirigé vers la page de ce morceau.

### Page de morceau

Tu dois coder une page `/tracks/:id` qui affiche toutes les infos du morceau, et si tu as le temps, tu peux jeter un œil à un service d’API vidéo comme YouTube pour ajouter une vidéo sur cette page.

Quand tu as fini, utilise [`ngrok`](https://github.com/lewagon/sinatra-101#share-with-the-world) pour lancer un serveur que tu pourras partager sur Slack! 👌
