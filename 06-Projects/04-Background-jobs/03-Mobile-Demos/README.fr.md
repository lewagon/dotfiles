## Tester tes applications mobiles avec ngrok

Le navigateur de ton ordinateur portable en affichage mobile est facile à utiliser et fonctionne bien pour les vues initiales ; le problème, c'est que le rendu n'est jamais exactement le même que sur un navigateur mobile natif. Pour t'assurer que ton app rend bien sur téléphone, tu dois la tester dessus. Mais devoir attendre que la PR soit mergée et poussée sur Heroku peut être pénible. On va donc trouver un moyen de vérifier l'hôte local sur notre téléphone à l'aide d'un outil appelé `ngrok`. Cet outil fonctionne en créant un tunnel entre ton hôte local et une URL publique à laquelle tu peux ensuite accéder depuis le navigateur de ton téléphone (plus d'infos là-dessus [ici](https://ngrok.com/product)).

Installation pour Mac :

```zsh
brew install --cask ngrok
```

Installation pour Ubuntu/WSL :

```zsh
sudo wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz  -O - | sudo tar xz -C /usr/local/bin
```

Si tu dois l'installer manuellement, tu peux le télécharger [ici](https://ngrok.com/download).

Une fois que tu auras installé ngrok, tu devras ouvrir un tunnel sur le port que tu utilises pour ton application Rails, à savoir le port `3000` (le nombre qui apparaît après `localhost:` est toujours le numéro de port).
```zsh
ngrok http 3000
```

Tu devrais obtenir une UI similaire à celle-ci :

```zsh
ngrok by @inconshreveable

Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:80
Forwarding                    https://92832de0.ngrok.io -> localhost:80

Connnections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Tu pourras ensuite accéder à ton hôte local depuis les adresses vers lesquelles il est redirigé. Il est généralement préférable de prendre l'adresse `https` que `http`. Envoie-toi cette URL sur Slack ou une application de messagerie, et voilà ! Tu peux désormais afficher les vues de ton hôte local sur ton navigateur mobile.

Remarque : à chaque fois que tu fermes puis redémarres un tunnel ngrok, tu obtiens une nouvelle adresse de redirection. Il peut être pénible d'avoir à te renvoyer l'adresse à chaque fois ; une bonne idée consiste généralement à laisser ngrok s'exécuter dans une fenêtre du terminal jusqu'à ce que tu n'en aies plus besoin.

---

Dans ton projet Rails, tu pourrais avoir besoin d'ajouter ce qui suit à ton fichier `config/environments/development.rb` pour permettre l'accès à ton `rails server` depuis ngrok :

```rb
# config/environments/development.rb
config.hosts << /.*\.ngrok\.io$/
config.hosts << /.*\.ngrok-free\.app$/
```

(N'oublie pas de redémarrer ton `rails server` après l'ajout.)
