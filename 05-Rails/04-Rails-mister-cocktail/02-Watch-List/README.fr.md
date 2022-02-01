## Contexte et objectifs

On va maintenant créer une application à 3 modèles ! Et tu l'auras deviné, on va introduire une relation `n:n`. Qu'est-ce qu'on va créer ? Une application avec des listes dans lesquelles tu pourras enregistrer tes films préférés.

## Générer l'application Rails

Tu devrais déjà avoir [yarn](https://yarnpkg.com) installé sur ton ordinateur. Tu peux le vérifier en tapant :

```bash
yarn -v
# You should see your yarn version here
```

Si ce n'est pas le cas, retourne sur la section dédié du setup [macOS](https://github.com/lewagon/setup/blob/master/macos.fr.md#yarn), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#yarn) ou [Windows](https://github.com/lewagon/setup/blob/master/windows.fr.md#yarn).

**Remarque** : Tu devrais maintenant pouvoir exécuter ces étapes sans cette fiche d'aide ! N'oublie pas la base de données `--database=postgresql` (on en parlera au prochain cours). 😉

```bash
cd ~/code/<user.github_nickname>
rails new rails-watch-list --database=postgresql --skip-action-mailbox -T
cd rails-watch-list
```

On doit ensuite créer la base de données postgresql pour cette nouvelle application Rails.

```bash
rails db:create
```

On va maintenant configurer git, créer un dépôt sur Github et pousser notre squelette.

```bash
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

On va importer les spécifications du prof pour évaluer notre progression avec `rake`.

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-watch-list-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Tu pourras tester ton code avec :

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
rspec spec/models                # Launch tests
```

Avant de commencer à coder, n'oublie pas de configurer ton application Rails pour le frontend. Comme dans le cours de ce matin, on va ajouter Bootstrap et ses dépendances JavaScript.

```bash
yarn add bootstrap@4.6 jquery popper.js
```

Et on va ajouter les gems dont on a besoin :

```ruby
# Gemfile
gem 'autoprefixer-rails', '10.2.5'
gem 'font-awesome-sass', '~> 5.12.0'
gem 'simple_form'
```

```bash
bundle install
rails generate simple_form:install --bootstrap
```

Puis on va télécharger les feuilles de style du Wagon :

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

Enfin, on va importer la bibliothèque JavaScript Bootstrap avec Webpack :

```js
// app/javascript/packs/application.js
import 'bootstrap';
```

N'oublie pas de versionner (`commit`) et pousser (`push`) régulièrement ton travail.

## Spécifications

### 1 - Modèles

Va sur [db.lewagon.com](http://db.lewagon.com) et dessine le schéma avec ton buddy. Les tables
dont on a besoin sont `movies`, `lists` et `bookmarks`. Réfléchis aux relations entre les tables et à qui stocke les *références*. 😉

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/db.png)

**Important**
N'utilise pas `rake` mais :

```bash
rspec spec/models
```

pour exécuter uniquement les tests dans le dossier `spec/models`. Assure-toi que tout soit en vert avant de passer à la partie applicative du challenge.

#### Attributs

- Un **film** a un **titre** (par ex. : `"Wonder Woman 1984"`), un **aperçu** (`"Wonder Woman entre en conflit avec l'Union soviétique pendant la Guerre Froide dans les années 1980 !"`), une **URL d'affiche** et une **note** (6.9).
- Une **liste** a un **nom** (par ex. :  `"Drama"`, `"Comedy"`, `"Classic"`, `"To rewatch"`, ... )
- Un **signet** ajoute un film à une liste (par ex. : Wonder Woman a été ajouté à la watch-list "Girl Power"). Chaque **signet** fait référence à un film et une liste, avec un **commentaire**. Le champ **commentaire** permet à l'utilisateur d'ajouter une remarquer au signet (par ex. : Alan Turing a recommandé ce film).

#### Validation

- Un film doit avoir un titre unique et un aperçu.
- Une liste doit avoir un nom unique.
- Un signet doit être lié à un film et une liste, et les associations [film, liste] doivent être uniques.
- Le commentaire associé à un signet ne peut pas avoir moins de 6 caractères.

#### Associations

- Une liste a plusieurs signets
- Une liste a plusieurs films avec des signets
- Un film a plusieurs signets
- Un signet appartient a un film
- Un signet appartient à une liste
- Tu ne peux pas supprimer de film s'il est indiqué en référence dans au moins un signet
- Quand tu supprimes une liste, tu dois supprimer tous les signets associés (mais pas les films, car ils peuvent être indiqués en référence dans d'autres listes)

### 2 - Générer une seed des films

**Notre application ne permettra pas aux utilisateurs de créer des films**.
À la place, on va générer une seed statique de films parmi lesquels l'utilisateur pourra choisir.
Voici un exemple de seed :

```ruby
# db/seeds.rb
Movie.create(title: "Wonder Woman 1984", overview: "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s", poster_url: "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", rating: 6.9)
Movie.create(title: "The Shawshank Redemption", overview: "Framed in the 1940s for double murder, upstanding banker Andy Dufresne begins a new life at the Shawshank prison", poster_url: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: 8.7)
Movie.create(title: "Titanic", overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic.", poster_url: "https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", rating: 7.9)
Movie.create(title: "Ocean's Eight", overview: "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century.", poster_url: "https://image.tmdb.org/t/p/original/MvYpKlpFukTivnlBhizGbkAe3v.jpg", rating: 7.0)
```

### Optionnel :

Amuse-toi et ajoute de faux films avec la [gem faker](https://github.com/faker-ruby/faker).

Encore mieux : utilise de vrais films avec [cette API](https://developers.themoviedb.org/3/movies/get-top-rated-movies) (avec les librairies Ruby `open-uri` et `json`).

**Configuration de l'API**

Les endpoints de l'API nécessitent que tu t'inscrives et génères une clé API. La procédure étant un peu longue, au Wagon, on t'a généreusement fourni un **proxy** pour cette API. Grâce à ce proxy, tu pourras utiliser cette API sans avoir à générer de clé API. On te fait confiance pour utiliser cet outil uniquement pour ce challenge !

Voici comment ça fonctionne :

1. L'API indique : utilise `https://api.themoviedb.org/3/movie/top_rated?api_key=<your_api_key>`.
2. Remplace cette partie de l'URL `https://api.themoviedb.org/3` par `http://tmdb.lewagon.com`.
3. Tu peux [essayer ici](http://tmdb.lewagon.com/movie/top_rated).

**Images de films**

Pour comprendre comment obtenir les images de films de l'API, lis attentivement [cette page](https://developers.themoviedb.org/3/getting-started/images) dans la documentation.

### 3 - Routes, contrôleur et vues pour les listes

**Important**
N'utilise pas `rake` pour coder la partie applicative. On va maintenant lancer `rails s` dans le terminal et ouvrir un navigateur sur [http://localhost:3000/](http://localhost:3000/). Rédige toujours ton code en silos :

- Commence par la **route**,
- puis code le **contrôleur**,
- et enfin code la **vue** et rafraîchis ton navigateur.

Une fois que ta fonctionnalité est prête (et a l'air de fonctionner), passe à la suivante. Et ainsi de suite !

Une fois que tu as terminé **tout** le challenge, utilise `rake` pour t'assurer qu'il répond aux spécifications.

**Fonctionnalités**
Une fois encore, tu dois avoir une idée précise des fonctionnalités de ton application pour créer tes routes. Voici la liste des fonctionnalités :

- Un utilisateur peut voir toutes les listes

```
GET "lists"
```

- Un utilisateur peut voir les détails d'une liste donnée et son nom

```
GET "lists/42"
```

- Un utilisateur peut créer une nouvelle liste

```
GET "lists/new"
POST "lists"
```

### 4 - Routes, contrôleur et vues pour les signets

- Un utilisateur peut ajouter un nouveau signet (association film/liste) à une liste existante
- Consulte la [documentation](https://github.com/heartcombo/simple_form#associations) `simple_form` à propos de `f.association` pour créer facilement une sélection dépliante de notre liste de films.

```
GET "lists/42/bookmarks/new"
POST "lists/42/bookmarks"
```

- Un utilisateur peut supprimer un signet d'une liste. Comment crée-t-on un lien de suppression ?

```
DELETE "bookmarks/25"
```

A-t-on besoin d'un contrôleur  `MoviesController` ?

### 5 - Mise en page au fil de l'eau

On va maintenant créer un chouette frontend ! Pour cela, on va jouer avec le CSS 😊 Est-ce que tu rejoindras le Hall of Fame ? Jette un œil à [dribbble](https://dribbble.com/) ou [onepagelove](https://onepagelove.com/) pour trouver l'inspiration.

N'oublie pas que tu peux avoir des images locales dans le dossier `app/assets/images`. Encore mieux : tu peux demander à l'utilisateur une `image_url` au moment de l'envoi.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/homepage.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/showpage.png)

### 6 - Formulaire de nouveau signet sur la page d'affichage d'une liste (optionnel)

Essaie de placer le formulaire de nouveau signet sur la page de la liste, pas sur une page séparée, pour ne pas avoir à quitter la page de la liste pour ajouter un nouveau film ! Qu'est-ce que ça change dans les routes ? Et dans les contrôleurs ?

### 7 - Select2 sur le menu dépliant des films (optionnel)

On va essayer d'ajouter un paquet npm à notre application Rails ! Reporte-toi aux diapos pour voir comment ajouter `select2` au menu dépliant des films.

### 8 - Avis sur les listes (optionnel)

Tout le monde devrait pouvoir commenter et donner son avis sur notre collection de films. On va donc ajouter des avis à nos listes !

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/watch-list/reviews.png)

### 9 - Aller plus loin

- Ajoute la possibilité de rechercher des films.
- Ajoute [typed.js](http://www.mattboldt.com/demos/typed-js/) pour donner un titre sympa à la page d'accueil.
- Ajoute des animations [animate on scroll](https://michalsnik.github.io/aos/) aux signets quand on fait défiler la page d'affichage des listes.
- Utilise [jquery-bar-rating](http://antennaio.github.io/jquery-bar-rating/) pour afficher des étoiles au lieu d'un champ `input` normal dans le formulaire des avis.

Là encore, utilise des contrôleurs Stimulus lorsque tu implémentes du JavaScript dans ton app ⚠️
