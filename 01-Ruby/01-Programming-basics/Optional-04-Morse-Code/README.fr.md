## Contexte et Objectifs

(De [Wikipedia](https://en.wikipedia.org/wiki/Morse_code)) À partir de 1836, l'artiste américain Samuel F. B. Morse, le physicien américain Joseph Henry et Alfred Vail ont développé un système de télégraphe électrique. Ce système envoyait des impulsions de courant électrique le long de fils qui contrôlaient un électroaimant situé à l'extrémité réceptrice du système de télégraphe. Un code était nécessaire pour transmettre le langage naturel en utilisant uniquement ces impulsions et le silence entre elles. Vers 1837, Morse a donc développé un précurseur précoce du moderne **code Morse international**.

Dans cet exercice, nous allons écrire un **encodeur** et un **décodeur** de code morse. Nous ne considérerons que les 26 lettres de l'alphabet anglais, ("A" -> "Z") et ignorerons tous les autres caractères (chiffres, ponctuation, etc.).

### Spécifications

Tout d'abord, implémente la méthode `encode` qui prendra du texte en paramètre et renverra la séquence Morse correspondante. Les lettres du même mot seront séparées par un espace et les mots seront séparés par un caractère de tube `|`.

Par exemple, la phrase `"Salut tout le monde"` devrait être encodée en `"... .- | .-.. .-.. | ..- -| --- ..- -"`
Une fois l'encodeur fonctionnel, tu pourras commencer à travailler sur la méthode `decode` qui fera l'inverse!
