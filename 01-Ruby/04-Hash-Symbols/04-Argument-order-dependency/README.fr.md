## Contexte et objectif

L’ordre dans lequel les arguments sont appelés dans une méthode est souvent une source d’erreurs. Tu ne dois pas te tromper. C’est ce que l'on appelle la **dépendance séquentielle** et c’est un véritable casse-tête.

Ce qu’il y a de bien quand tu utilises un hash, c’est que cette dépendance disparaît. L’ordre n’a plus d’importance, car le code cherche simplement la clé et prend la valeur associée.

## Spécification

- Exécute la méthode `#better_refrain` pour briser la dépendance séquentielle des arguments dans `#refrain`

## Enseignements clé

- As-tu **vraiment** compris pourquoi `#better_refrain` est plus flexible ? Essaie de l’expliquer à ton ou ta buddy.
