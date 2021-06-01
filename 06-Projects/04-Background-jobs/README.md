## Projects

The next session will be your **intermediate demo**!

---
#### Core User Journey

At this point, your **core user journey** should essentially be complete. If it's not, this should be the main focus for today. Put aside any features that are not a part of the core user journey, and come back to them once the absolutely necessary features are complete.

---
#### Seeds

If the majority of your backend is working and you haven't pimped out your seeds yet, now is the time. Having plenty of well-thought-out, realistic data in your app will make it seem that much more legit. Using a gem like faker is great and creating them all from scratch is even better but can be pretty time-consuming -- have you thought about using an API? There's pretty much an API for everything at this point, try searching google to check if there's a dataset that would fit your use-case. Then you can use [this lecture code](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F09-Airbnb-SMTP#/0/1/3) as a reference for how to import and use the data to create instances of your models in your seeds file.

---
#### Testing your mobile apps with ngrok

While using your laptop browser in mobile view is easy and works well for the initial views, the problem is that it's never exactly the same as it'll be in native mobile browsers. In order to make sure your app looks great on the phone too, we need to test it there. However, having to wait until a PR is merged and pushed to Heroku before being able to check is a pain. Let's set up a way to check localhost on our phone through a tool called `ngrok`. The way it works is that it creates a tunnel from your localhost to a public url that you can then access from your phone's browser (you can read more about it [here](https://ngrok.com/product)).

Installation for Macs:
```zsh
brew install --cask ngrok
```

Installation for Ubuntu/WSL:
```zsh
sudo wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz -O - | sudo tar xz -C /usr/local/bin
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
#### Resources
We all know by now that Google is our best friend... but so is Kitt! Check out the Library section for cheatsheets and tutorials including the following (and much more):
- Behold the holy grail of [all things simple form](https://kitt.lewagon.com/knowledge/cheatsheets/simple_form), including how to target specific simple-form-generated CSS classes
- Need any realtime content streams for your users, like for a chat? Use [ActionCable](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/06-Projects%2F01-Pundit)
- Position things perfectly with [flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- Need a calendar in your app? Check out t[he Simple Calendar gem](https://kitt.lewagon.com/knowledge/tutorials/simple_calendar)
- Add [a star rating](https://kitt.lewagon.com/knowledge/tutorials/star_rating) to your reviews
- How about a QR code? Add one easily with [this tutorial](https://kitt.lewagon.com/knowledge/tutorials/qr_code)
- Make your alerts sweeter with [Sweet Alert](https://kitt.lewagon.com/knowledge/tutorials/sweetalert)
- Need a 'bookmark' feature? Try the `acts_as_favoritor` [gem](https://github.com/jonhue/acts_as_favoritor)
- Do your users need to be able to purchase something in your app? Let [Stripe](https://kitt.lewagon.com/knowledge/tutorials/stripe) handle that.
