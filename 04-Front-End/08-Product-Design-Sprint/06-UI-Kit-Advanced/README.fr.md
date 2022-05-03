## Kit UI avancé (30 min)

Maintenant que tu as créé tes premiers composants UI, il est temps de passer à des composants plus avancés. Tu vas créer une card (carte) responsive en utilisant la fonction [Auto Layout](https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-Auto-layout) de Figma.

**Auto Layout** te permet de créer des composants dynamiques (appelés frames), qui s'adaptent au contenu qu'ils accueillent, en s'agrandissant ou en se réduisant selon les besoins. Avec Auto Layout, tu peux aussi définir un espace de remplissage sur un frame et aligner les éléments à l'intérieur horizontalement et verticalement, comme dans une flexbox CSS ! 💪

### Crée un composant card (carte) dynamique avec Auto Layout

Commence par créer deux rectangles ; l'un sera ta card (carte) et l'autre sera une image appliquée par-dessus. Place-les l'un sur l'autre, mets-les en surbrillance et sélectionne l'option `Auto Layout` dans le panneau de design à droite. Si tu ne vois pas l'option dans le panneau à droite, fais un clic droit sur ta sélection et choisis `add auto layout` dans le menu.

![Créer un frame avec Auto Layout](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_one.gif)

Tu crées ainsi un **frame** qui te propose de nouvelles options de design dans le panneau à droite. Par exemple, tu peux désormais définir un espace de remplissage sur la card (carte) avec le nombre de pixels que tu souhaites ajouter de chaque côté.

![Définir l'espace de remplissage sur la card (carte)](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_two.png)

Tu peux maintenant prendre d'autres composants comme un texte ou un bouton et les faire glisser sur ton frame. Attends de voir apparaître une ligne bleue sur la card (carte) avant de les déposer. Tu verras alors ta card (carte) s'agrandir pour s'adapter au nouveau contenu **tout en** conservant l'espace de remplissage que tu as défini à l'étape précédente ! 😎

![La card (carte) s'agrandit pour s'adapter au contenu à l'intérieur](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_three.gif)

Voyons voir ce qu'il se passe avec une longue description pour la card (carte). Ajoute du texte et ta mise en page se brise. On peut corriger ça en modifiant l'option de redimensionnement (`Resizing`) sur le `text` de `Hug contents` à `Fill container`.

**Options de redimensionnement** :
- **Fill container** fait en sorte qu'un objet s'étire pour remplir son conteneur. Il peut uniquement être défini sur les enfants d'un frame, en l'occurrence sur le texte.
- **Hug contents** fait en sorte qu'un parent s'adapte à la taille de ses enfants.
- **Fixed** signifie que l'objet ne pourra pas être redimensionné en fonction de ses parents ou ses enfants.

![Conserver la mise en page en utilisant les options de redimensionnement](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_four.gif)

Tu peux jouer avec le positionnement des enfants dans le frame pour les aligner au centre, à l'extrémité d'un frame ou ailleurs. Si tu cliques sur la flèche à côté du mot-clé `Packed`, tu repéreras une autre option de distribution appelée `Space between` qui, tu l'auras deviné, te permet d'aligner les enfants dans ton cadre comme tu le ferais dans une flexbox CSS 🤩

![Aligner les éléments de ta card (carte) comme dans une flexbox](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_five.png)

Et si tu as besoin de redimensionner ta card (carte) ? Sélectionne l'option de redimensionnement `Fill container` sur l'image et le texte (et sur n'importe quel élément qui s'étire du début à la fin de la card (carte)) et tu n'auras pas de problème pour agrandir ou réduire ta card (carte) sans briser la mise en page 🎉

![Redimensionner ta card (carte)](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_six.gif)

### Plus d'infos sur Auto Layout

Auto Layout est un super moyen de créer des composants dynamiques. Mais ce n'est pas tout : ce système te permet également de réordonner rapidement tes éléments ou de créer des écrans pleins compatibles avec plusieurs appareils ! Jette un œil à [Auto Layout Playground](https://www.figma.com/community/file/784448220678228461) pour en savoir plus.

Profite bien de la magie Auto Layout ! ✨
