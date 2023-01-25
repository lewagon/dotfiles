## Contexte et objectifs

Félicitations ! Tu es désormais un pro d’Active Record 😊 Prenons un peu de recul sur tout ce que tu as appris depuis le setup le premier jour :
- Stocker des informations dans des variables
- Définir des méthodes pour implémenter un comportement générique sur des arguments et réutiliser du code
- Utiliser plusieurs types, simples (`Integer`, `String`) ou complexes (`Hash`, `Array`)
- Utiliser le conditionnement avec `if`
- Créer des boucles sur des collections avec `for`, `while` ou `Enumerable#each`

Tu maîtrises maintenant les bases de n’importe quel langage de programmation. Si tu comprends ces concepts, tu es désormais un programmeur, et tu devrais réussir à saisir rapidement n’importe quel nouveau langage orienté objet. Il te suffit de savoir comment fonctionnent les éléments évoqués plus haut. Après ça, il n’y a plus de nouveaux concepts, seulement de nouvelles syntaxes.

Tu as aussi commencé à aborder des éléments plus complexes qui t’aideront à créer des logiciels plus grands et plus complexes.

- Classe - pour encapsuler des **données** et un **comportement** dans un objet
- **MVC** - pour créer des logiciels dans lesquels chaque classe a une responsabilité unique
- Active Record - une couche appliquée par-dessus la base de données pour abstraire les requêtes SQL (écrire du code Ruby plutôt que du SQL)

On se rapproche sérieusement de Rails maintenant :) Mais il manque quelque chose : le niveau Vue. On est là pour construire des sites Web, et pas des outils de ligne de commande ! Où est le HTML ? Et le CSS ?

Joue avec la librairie [Sinatra](http://www.sinatrarb.com) pour te faire une idée de tout ce qui t’attend !

## Configuration

Installe les gems spécifiées dans ton `Gemfile` avec la commande suivante :

```bash
bundle install
```

On t’a déjà donné la migration et la seed. Exécute-les avec :

```bash
rake db:drop db:create db:migrate db:seed
```

Lance l’application Sinatra.

```bash
ruby lib/app.rb
```

Regarde ! Tu peux maintenant aller sur <http://localhost:4567>. Tu exécutes désormais un petit serveur Web auquel tu accèdes avec ton navigateur. Plus de ligne de commande !

## À propos de Sinatra

Le fichier `app.rb` fait office de contrôleur. La couche du routeur est gérée par Sinatra. On a déjà créé une méthode de contrôleur pour gérer la racine de l’application Web. Sinatra fait correspondre l’URL dans le navigateur à la bonne méthode dans `app.rb`. Jette un œil à la [documentation sur le routage](http://www.sinatrarb.com/intro.html#Routes) pour en savoir plus.

```ruby
# app.rb
# [...]

get '/' do # <- Routeur

  # [...]   #
  # [...] # <- Contrôleur
  # [...]   #

end
```

Renseigne-toi sur les Vues (Views), le Routage (Routing) et les `params` [ici](https://github.com/lewagon/sinatra-101#views) avant de commencer à coder.

## ERB

As-tu entendu parler du **templating** ? C’est une manière d’écrire du code HTML dans lequel tu injectes de la donnée **de façon dynamique** en utilisant du code.

Dans un framework Ruby comme Sinatra, on peut utiliser **erb**, qui signifie "embedded ruby" (soit Ruby intégré).

La syntaxe est la suivante :

```erb
<% first_name = "Boris" %>

<h1>Hello, I'm <%= first_name %></h1>
```

Utilise `<% %>` pour le code que tu **ne souhaites pas afficher**, et `<%= %>` quand tu veux **injecter** le résultat dans le HTML.

On définit généralement les variables dans le contrôleur :

```ruby
get '/' do
 @first_name = "Boris" # <-- le `@` permet de le rendre disponible dans la vue !
 erb :home
end
```

Et on les utilise dans la vue `home.erb` :

```erb
<h1>Hello, I'm <%= @first_name %></h1>
```

Pense à définir des **variables d’instance avec un `@`** dans ton contrôleur pour les variables que tu souhaites utiliser dans tes vues !

**On utilisera aussi erb dans Rails !** Prends le temps de lire [cette section](https://github.com/lewagon/sinatra-101#passing-stuff-to-the-view) attentivement.

## Spécifications

Cet exercice est assez ouvert ; voici quelques éléments pour commencer :
- Affiche tous les posts sur la page d’accueil du site
- Chaque post doit être un lien cliquable. Cliquer dessus ouvrira un nouvel onglet et renverra au site Web
- Affiche les posts par ordre descendant des votes (regarde les portées [`scopes`](http://guides.rubyonrails.org/active_record_querying.html#scopes))
- [Difficile] Ajoute un formulaire en haut pour publier un nouveau post (astuce : utilise une route `post` dans `app.rb`)
- [Très difficile] Ajoute un moyen de voter sur un post.

Amuse-toi !

Il n’y a pas de test pour cet exercice ; `rake` exécutera simplement Rubocop pour vérifier que le style est bon ;)

### Partage

N’hésite pas à partager ton travail sur Slack avec [`ngrok`](https://ngrok.com/). Installe `ngrok` (avec `brew install --cask ngrok` ou [manuellement pour Ubuntu](https://ngrok.com/download)), et exécute-le dans une autre fenêtre.

```bash
ngrok http 4567
```

Vérifie que ton URL est publique (`*.ngrok.com`) pour la partager avec tout le monde !
