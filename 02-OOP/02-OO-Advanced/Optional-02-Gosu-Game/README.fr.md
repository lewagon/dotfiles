:warning: **Avertissement !** Cet ejercicio _ne fonctionne pas_ sur Windows, passe-le si tu utilises ce système d'exploitation (ou fais équipe avec quelqu'un sur macOS / Linux).

## Contexte & Objectifs

Il est temps de créer un jeu ! Pour cela, nous allons utiliser une gem appelée `gosu`.

## Installation

Ouvre ton terminal et exécute :

### macOS

%%%bash
brew update
brew install sdl2
gem install gosu
%%%

### Linux

%%%bash
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev libsdl2-ttf-dev\
  libpango1.0-dev libgl1-mesa-dev libfreeimage-dev libopenal-dev\
  libsndfile-dev libmpg123-dev
gem install gosu
%%%

## Snake

Codons le bon vieux jeu **Snake**. Les contrôles sont simples : touches fléchées. L'objectif est de grandir en mangeant de la nourriture et de rester en vie (ne touche pas les bords de la fenêtre !).

![](http://g.recordit.co/Wu3KJw9Jd1.gif)
![Jouer au jeu gosu en déplaçant les touches fléchées pour manger de la nourriture](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/gosu.gif)

## Spécifications

1. Suis le [tutoriel Gosu](https://github.com/gosu/gosu/wiki/ruby-tutorial) pour faire fonctionner une fenêtre dans `game.rb`
1. Nous allons dessiner un carré blanc de `20x20` pour représenter la **tête** du serpent. Introduisons la classe `Snake` avec une constante `SIZE` et refactorisons la méthode `initialize` de `Game` pour construire une fenêtre proportionnelle à la taille du serpent.
1. Faisons un peu de modélisation sur le `Snake`. Quel devrait être son état ? Quel est son comportement ? Tu auras peut-être besoin de [`Gosu::draw_rect`](https://www.rubydoc.info/gems/gosu/Gosu.draw_rect) et `Gosu::Color::WHITE`.
1. Ajoutons le concept de **direction** au `Snake`. Maintenant que nous avons une direction, ajoutons une méthode `#move` au `Snake`. Souviens-toi, il va mourir s'il dépasse le cadre de la fenêtre. Comment la direction change-t-elle quand tu appuies sur les boutons ? Tu auras peut-être besoin de [`Gosu.button_down?`](https://www.rubydoc.info/gems/gosu/Gosu.button_down%3F) et `Gosu::KB_LEFT`.
1. Pourquoi est-ce si rapide 😱 ? Essayons de ralentir un peu le serpent.
1. Faisons apparaître de la `Food`. La nourriture serait un carré rouge de la même taille que le serpent. Elle doit apparaître aléatoirement sur l'écran. Quelles devraient être les variables d'instance ? Implémente une méthode `draw`.
1. Mangeons ! Quand le serpent chevauche la nourriture, il devrait incrémenter le score, et un nouveau carré de nourriture devrait apparaître ailleurs. Tu auras peut-être besoin de [`Gosu::Font#draw`](https://www.rubydoc.info/gems/gosu/Gosu/Font).

Ouvre un terminal et exécute :

%%%bash
touch lib/game.rb
touch lib/snake.rb
touch lib/food.rb
curl https://themushroomkingdom.net/sounds/wav/smb/smb_bump.wav > lib/start.wav
curl https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav > lib/eat.wav
code .
%%%

Nous allons lancer le jeu avec :

%%%bash
ruby lib/game.rb
%%%

## Aller plus loin

1. Le serpent devrait grandir et ne pas rester un carré !
1. Le serpent devrait accélérer chaque fois qu'il grandit !
1. Joue un son chaque fois que le serpent mange ou meurt !
