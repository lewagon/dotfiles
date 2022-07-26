## Contexte et objectifs

S'entraîner avec la grid (grille) Bootstrap. Apprendre à créer plusieurs grilles avec différents comportements réactifs (responsive).

## Spécifications

Voici [les grilles de smileys](http://lewagon.github.io/bootstrap-challenges/01-New-Bootstrap-grid/) que tu dois reproduire dans cet exercice. Le point de départ de ces 3 grilles est le même :

```html
<div class="container">
  <div class="row">
    <!-- Différentes variations en fonction du comportement responsive souhaité -->
  </div>
</div>
```

Après ça, tu devras ajouter différentes colonnes (`.col-??-??`) à l'intérieur de la ligne (`.row`) en fonction du comportement recherché.

⚠️ **Ne casse pas la grille**

N'ajoute PAS de classes de grille Bootstrap au même niveau que d'autres classes CSS.

```html
<div class="container">
  <div class="row">
    <!-- 👎 -->
    <div class="card bg-light col-6">
      😀
    </div>
  </div>
</div>
```

Crée plutôt une grille autour du contenu, puis ajoute-la comme ceci :


```html
<div class="container">
  <div class="row">
    <!-- 👍 -->
    <div class="col-6">
      <div class="card bg-light">
        😀
      </div>
    </div>
  </div>
</div>
```

## Suggestions et ressources supplémentaires

- Lorsque tu codes une grille, commence toujours par la classe `.col` pour la plus petite résolution. Interroge-toi sur la proportion que tu souhaites obtenir sur un appareil mobile : plein écran (`.col-12`), moitié d'écran (`.col-6`), quart d'écran (`.col-3`) ?
- Puis passe à la résolution suivante (`sm`) et pose-toi la même question 🤔. Et ainsi de suite jusqu'à `xxl`.
- Tu n'es pas obligé d'écrire toutes les classes `sm/md/lg/xl/xxl`. Si tu ne les écris pas toutes, c'est toujours la classe précédente qui s'applique. Par exemple, une grid (grille) `<div class="col-12 col-lg-6">` occupera tout l'écran sur un appareil moins large que 960px et la moitié de l'écran sur un écran plus large.

N.B. : N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Cmd` / `Ctrl` + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !
