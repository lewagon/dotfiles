## Semaine Airbnb

Pendant les prochaines séances, tu travailleras avec ton groupe de projet sur un clone d'Airbnb (vous n'êtes pas obligés de louer des **appartements**, soyez créatifs !)

### Démos

Vous ferez la démo de votre travail (en production, pas de démos sur `localhost` !) pendant les séances de **Géocodage** et **Authorization & Pundit**. Faites attention aux échéances !

### Partie I

Travaillez sur les étapes suivantes et faites-les valider par un prof au début de la séance, avant de créer votre application Rails et de passer à la Partie II. Vous gagneras du temps, faites-nous confiance.

#### 1 - Stories utilisateur

Un membre de l'équipe doit dupliquer ce [tableur](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (1 par équipe) et invite ses coéquipiers à collaborer.

![dupliquer](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/duplicate.png)
![renommer](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/rename.png)

Commencez par réfléchir aux **parcours utilisateur** que vous présenteras pendant la démo. Les scénarios possibles sont nombreux pour un produit comme Airbnb, mais essayez de vous limiter au minimum viable pour que l'application fonctionne.

<details><summary markdown='span'>View solution
</summary>

- 1 parcours utilisateur pour l'utilisateur qui crée une offre
- 1 parcours utilisateur pour l'utilisateur qui réserve une offre
- 1 parcours utilisateur pour le propriétaire qui accepte ou refuse une demande de réservation

</details>

Chaque parcours utilisateur contient plusieurs **stories utilisateur** : notez-les dans le tableur en utilisant la bonne terminologie. Une fois que vous avez terminé, créez un ticket pour les faire valider par un prof.

Vous pouvez dessiner des croquis des différents écrans et des principaux éléments qu'ils contiennent. Cela vous aidera à visualiser vos parcours utilisateur. Fais attention : vous n'avez pas besoin d'être trop spécifique à ce stade ! C'est un sprint, vous devez répartir intelligemment votre temps et vos ressources.

#### 2 - Schéma de base de données

Dessinez le schéma de votre base de données avec [notre outil](https://kitt.lewagon.com/db/new) et **créez un ticket pour le faire valider par un prof**. Dessinez uniquement le minimum viable pour que votre application fonctionne. Utilisez les bonnes conventions (noms au pluriel pour les colonnes... etc - cf. les cours sur les bases de données).

#### 3 - Routes

Retournez à votre tableur avec les stories utilisateur et ajoutez les informations suivantes :
- Route : verbe + chemin
- Action
- Contrôleur

Créez un ticket pour les faire valider par un prof. C'est bon ? On peut passer à `rails new` !

### Partie II

Avant de répartir les tâches au sein de votre équipe, configurez le projet tous ensemble. Le **développeur principal** (et lui uniquement) devra :

#### 1. Créer le projet Rails avec une configuration Postgres

Utilisez le modèle minimal du Wagon, qui contient déjà une bonne configuration front-end :

```bash
cd ~/code/<user.github_nickname>
rails new \
  -d postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
```

Seul le **développeur principal** doit s'occuper de cette étape, pas toute l'équipe !

#### 2. Pousser le projet sur Github

```bash
cd your-rails-app-name
gh repo create --public --source=.
git push origin master
```

#### 3. Ajouter ses coéquipiers en tant que collaborateurs sur le dépôt Github

Allez sur [les paramètres de ton dépôt Github](https://github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration) et ajoutez les membres du groupe en tant que **collaborateurs** sur le dépôt.

Les autres membres de l'équipe peuvent maintenant **cloner** le projet. ⚠️**Attention à utiliser l'URL `SSH`**⚠️

Les autres membres de l'équipe devront ensuite exécuter :

```bash
bundle install
rails db:create db:migrate
```

#### 4. Déployer sur Heroku

Même s'il ne s'agit que d'un squelette de l'application, il est important de la déployer sur Heroku **dès le premier jour**, puis de continuer à la déployer tous les jours, à chaque nouvelle fonctionnalité.

```bash
heroku create airbnb-<user.lower_github_nickname> --region=REPLACE_WITH_REGION # (eu, us, or any region available in `heroku regions` list)
git push heroku master
heroku run rails db:migrate
```

À partir de ce point, vous pouvez commencer à vous répartir les tâches. **Ne bâclez pas la configuration, tout sera plus simple si vous faites les choses correctement dès le début**.

### Quelques lignes directrices pour la gestion de projet

#### Coup d'envoi

Au moment de répartir les tâches au sein de l'équipe, vous allez vous rendre compte que beaucoup de tâches dépendent d'autres... Comment intégrer facebook connect sans modèle `User` ? Comment coder des réservations sans modèle `Flat` ? Voici quelques lignes directrices pour vous aider à organiser votre travail :

Commencez toujours par les **modèles principaux** de votre application, dont toutes les fonctionnalités futures dépendront. Dans le cas d'Airbnb, il s'agit bien sûr des modèles `User` et `Flat`. Une fois ces modèles intégrés, il sera plus facile de répartir le travail pour les fonctionnalités restantes. Pour commencer, vous pouvez donc identifier deux grandes tâches :

**groupe #1 - Lancement des modèles** :
- Intégrer `User` en se connectant/s'inscrivant à Devise
- Intégrer `Flat` avec les actions `index` et `new/create`

**groupe #2 - Lancement du front-end** :
- Travailler sur une mise en page soignée avec barre de navigation/pied-de-page
- Créer une page d'accueil simple et attractive

Une fois que les deux groupes ont terminé (cela devrait prendre environ 2h à chaque groupe) et une fois que vous avez tous mergé votre travail sur GitHub, vous pouvez passer à la répartition des tâches pour le reste des fonctionnalités.

#### Organisation des tâches

Voici une liste des différentes stories utilisateur à coder sur le projet Airbnb :

- En tant qu'utilisateur, je peux naviguer sur le site Web depuis la barre de navigation (avec des liens fonctionnels, par ex. "connexion/déconnexion", "Mes réservations", "Publier une offre", etc.).
- En tant qu'utilisateur, je peux afficher la page d'un appartement.
- En tant qu'utilisateur, je peux réserver un appartement.
- En tant qu'utilisateur, je peux ajouter des photos de mon appartement.
- En tant qu'utilisateur, je peux ajouter un avis à propos d'un appartement dans lequel j'ai séjourné.
- En tant qu'utilisateur, je peux localiser des appartements sur une carte.
- En tant qu'utilisateur, je peux me connecter avec Facebook.
- En tant qu'utilisateur, je peux recevoir un e-mail quand quelqu'un réserve mon appartement.
- ...

**Certaines de ces fonctionnalités sont plus importantes que d'autres**. C'est à toi de les hiérarchiser pour obtenir un MVP à la fin de la semaine !

#### Exemple de fonctionnalité : Réserver un appartement

Quand tu travailles sur une fonctionnalité, fais-le **consciencieusement de la base de données au HTML/CSS**. Prenons l'exemple de la fonctionnalité de réservation :

*Modèle*
- Je vais créer un modèle `Booking` et sa migration associée.
- Je vais ensuite rédiger un modèle de travail avec des associations et des validations.
- Je vais ensuite tester mon modèle depuis la console `rails console` pour m'assurer que tout fonctionne dans le modèle.

*Construction de routes* :
- Je vais ajouter des routes de réservation dans `routes.rb`.

*Contrôleur* :
- Je vais créer un nouveau contrôleur `BookingsController` avec les actions `create` et `index`.
- Je vais coder ces deux actions.

*Modification des vues* :
- Je vais intégrer le formulaire de réservation dans les vues existantes (`views/flats/show.html.erb`).
- Je vais lister toutes les réservations actuelles d'un utilisateur sur une nouvelle page `views/bookings/index.html.erb`.

*Liens* :
- Je vais ajouter un lien vers la page `bookings#index` dans la barre de navigation.

*HTML/CSS* :
- Mon formulaire de réservation est propre, avec les bonnes classes Bootstrap pour les champs « input » et les boutons.
- Ma page de nouvelles réservations est propre, avec un conteneur (`container`) pour centrer le contenu, des en-têtes clairs et un design soigné pour chaque réservation.
- Je vais prendre le temps de refactoriser mon HTML en utilisant des partials si mon code HTML est trop long et difficile à lire.

**Rédigez votre code à la perfection, du modèle à la vue**

- Testez toutes les associations et les validations de votre modèle dans la console Rails.
- Ne négligez pas la vue. Si vous ajoutez un formulaire, optez pour un joli formulaire Bootstrap, centré et responsive. Si vous codez une liste des appartements, créez une jolie grille Bootstrap (par exemple, avec une photo de l'appartement sur la gauche et les informations de l'appartement sur la droite).
- Utilisez des partials pour refactoriser votre HTML et le rendre plus facile à lire et entretenir.
