## Contexte et objectifs

Créer un [formulaire d'inscription réactif](https://lewagon.github.io/bootstrap-challenges/10-Login-form/) (responsive).

**⚠️ Avant de commencer, lis attentivement toutes les instructions.⚠️**. Les formulaires sont parmi les composants les plus importants d'un site Web. Tu dois donc savoir comment les créer !

## La technique de l'offset dans une grille

Le meilleur moyen de rendre un formulaire réactif consiste à l'injecter dans une grille Bootstrap, dans une ligne possédant la classe d'alignement `justify-content-center`. **Souviens-toi** que chaque ligne (`.row`) est une flexbox et que l'on peut utiliser les mêmes astuces d'alignement que lorsqu'on a travaillé avec les flexbox pour rendre notre formulaire réactif.

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-sm-4">
      <form action="">
        <!-- Le contenu de ton formulaire -->
      </form>
    </div>
  </div>
</div>
```

- Le formulaire s'affichera entièrement sur les appareils mobiles
- Sur les tablettes et les appareils plus grands, il sera centré (grâce à la classe d'alignement `justify-content-center`) et occupera 33 % de l'écran.
- Si tu veux, tu peux le rendre encore plus réactif (affichage plein écran sur les appareils mobiles, affichage centré sur une moitié d'écran sur les tablettes, affichage centré sur 33 % de l'écran sur les ordinateurs portables, etc).

## Formulaires HTML

Un formulaire (`<form>`) HTML est composé de différentes entrées `<input>` (une pour chaque champ du formulaire). Chaque entrée peut être associée à une étiquette `<label>`. Le bouton de soumissions du formulaire est aussi une entrée de `type="submit"`. Voici à quoi ressemble un formulaire :

```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```

1. Il existe différents types d'entrée ou `<input>` (`type="text"`, `type="email"`, `type="date"`, etc.)
2. Le `placeholder` est un exemple de texte qui disparaît quand l'utilisateur commence à écrire.
3. L'étiquette `for="something"` sera associée à l'entrée avec `id="something"`. On n'associe pas les étiquettes et les entrées simplement pour s'amuser. Les associer permet de pouvoir cliquer n'importe où sur l'étiquette pour pouvoir faire passer le curseur dans l'entrée associée (plutôt que d'avoir à cliquer dans la zone de texte). Ce qui permet d'offrir une bien meilleure expérience utilisateur !
4. L'attribut `value` nous donne le texte qui s'affiche sur le bouton de soumission.

Les listes dépliantes sont un peu différentes. **Elles ont leurs propres balises `<select>` et `<option>` pour chaque option de la liste**. Le HTML d'une liste dépliante ressemble à ça :


```html
<label for="favorite">What's your favorite language?</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
</select>
```

## Classes de formulaire Bootstrap

On va maintenant parler des classes de formulaire Bootstrap :
- `.form-control` définit chaque entrée `<input>` ou sélection `<select>`, à l'exception du bouton de soumission.
- `.mb-3` regroupe chaque entrée `<input>` ou sélection `<select>` avec l'étiquette `<label>` pour créer de l'espace sous chaque groupe.

Exemple de formulaire Bootstrap **avec des étiquettes** :

```html
<form action="#">
  <div class="mb-3">
    <label for="email" class="form-label">Your email</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Your password</label>
    <input type="password" id="password" class="form-control">
    <div id="password" class="form-text">Your password must be at least 6 characters long and contain letters and numbers.</div>
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Exemple de formulaire Bootstrap **sans étiquette** :

```html
<form action="#">
  <div class="mb-3">
    <input type="email" class="form-control">
  </div>
  <div class="mb-3">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Maintenant, si tu veux un [formulaire en ligne](https://getbootstrap.com/docs/5.1/forms/layout/#inline-forms), tu peux **ajouter la classe `.form-inline` au formulaire `<form>`** (comme la classe `.list-inline` pour une liste `<ul>`) :

tu peux **ajouter les classes `.row` (qui est une flexbox) et `.row-cols-*-auto` au formulaire `<form>`** (la classe `.row-cols-*` te permet de décider à partir de quel breakpoint tu veux que tes champs `input` se mettent l'un à côté de l'autre. Par exemple, `.row-cols-sm-auto` signifie que sur mobile, chaque `input` prend la largeur totale alors que sur une tablette ou des écrans plus grands, les `input` seront l'un à côté de l'autre):

```html
<form action="#" class="row row-cols-lg-auto">
  <div class="col-12">
    <input type="email" class="form-control">
  </div>
  <div class="col-12">
    <input type="password" class="form-control">
  </div>
  <div class="col-12">
    <input type="submit" value="Sign In" class="btn btn-primary">
  </div>
</form>
```

## Utiliser la grille Bootstrap pour construire des formulaires plus complexes

Tu peux aussi ajouter la class `.row` à ton `<form>` et lui mettre plusieurs `col` de tailles différentes à l'intérieur. Par exemple, pour avoir deux `input` sur la même ligne avec un troisième `input` qui prend toute une ligne :

```html
<form action="#" class="row">
  <div class="col-6 mb-3">
    <label for="first-name" class="form-label">First name</label>
    <input id="first-name" type="text" class="form-control" placeholder="First name">
  </div>
  <div class="col-6 mb-3">
    <label for="last-name" class="form-label">Last name</label>
    <input id="last-name" type="text" class="form-control" placeholder="Last name">
  </div>
  <div class="col-12 mb-3">
    <label for="address" class="form-label">Address</label>
    <input id="address" type="text" class="form-control" placeholder="Address">
  </div>
  <!-- la suite du formulaire ici -->
</form>
```

## À toi de jouer

- À ton tour de créer un [formulaire d'inscription responsive](http://lewagon.github.io/bootstrap-challenges/10-Login-form/).
- Essaie de personnaliser un peu ton design dans `components/form.css`.

N.B. : N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Cmd + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !
