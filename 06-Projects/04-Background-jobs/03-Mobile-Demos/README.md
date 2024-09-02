## Testing your mobile apps with ngrok

While using your laptop browser in mobile view is easy and works well for the initial views, the problem is that it's never exactly the same as it'll be in native mobile browsers. In order to make sure your app looks great on the phone too, we need to test it there. However, having to wait until a PR is merged and pushed to Heroku before being able to check is a pain. Let's set up a way to check localhost on our phone through a tool called `ngrok`. The way it works is that it creates a tunnel from your localhost to a public url that you can then access from your phone's browser (you can read more about it [here](https://ngrok.com/product)).

Installation for Macs:

```zsh
brew install --cask ngrok
```

Installation for Ubuntu/WSL:

```zsh
sudo wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz  -O - | sudo tar xz -C /usr/local/bin
```

If you need to install it manually, you can download it [here](https://ngrok.com/download).

After you've installed ngrok, you'll then need to open a tunnel on the port we're using for our rails app, aka `3000` (the number after the `localhost:` is always the port number).
```zsh
ngrok http 3000
```

This will then give you a UI similar to this:

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

You can then access your localhost from the addresses that it's being forwarded to. It's usually better to take the `https` rather than `http`. Send this URL to yourself over Slack or a messenger app, and then voilà! You can now see your localhost views on your mobile browser.

Note: every time you close and then restart an ngrok tunnel, you'll get a new forwarding address. As it can be a pain to resend the address to yourself every time, it's usually a good idea to just leave ngrok running in a terminal window until you no longer need it.

---

In your Rails project, you may need to add the following to your `config/environments/development.rb` file to allow accessing your `rails server` from ngrok:

```rb
# config/environments/development.rb
config.hosts << /.*\.ngrok\.io$/
config.hosts << /.*\.ngrok-free\.app$/
```

(Please restart your `rails server` after adding.)
