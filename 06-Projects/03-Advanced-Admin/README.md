## Projects

Let's keep up the good work!

---
#### Domain name

If your team hasn't set up a custom domain yet, do that first thing. You can check the previous days instructions to follow the correct guide. Otherwise, confirm that the domain is connected correctly and fill in the info on [your product page](https://kitt.lewagon.com/camps/<user.batch_slug>/products).

As Le Wagon is an official partner of GitHub since 2015, you can redeem your access to the [Github Student Developer Pack](https://education.github.com/pack), and learn more about them [here](https://www.notion.so/lewagon/GitHub-Student-Developer-Pack-cc73194095034af1a0db32628b729bc3).

---
#### Debug Heroku

A lot of progress was likely made on the previous session. If your team hasn't pushed all that new merged code to Heroku yet, now is the time to (ask the team member with the `heroku` remote):
```zsh
git status # must be clean, if not add / commit your WIP
git co master
git pull origin master
git push heroku master
```

Once it's there, you can `heroku open`, test all the features and prioritize fixing any bugs first 👌

---
#### Seeds

If you don't have any seeds yet, create some. If you already have some, think about how you can improve them and bulk them out. The more seeds you have and the better they are, the more legit your app will look.

In Le Wagon projects context, you may find it useful to have a seed that "resets" the database to your Demo's starting point. In "real-life" projects, **never code any destructive behaviour** in a seed ⚠️ you don't want to run `User.destroy_all` by mistake 😱

---
#### Homepage

The landing page is the first page your user will see. Spend time making this look really nice! Imagine a brand new user coming to your site for the first time -- they should be able to easily figure out what the general idea of your app is about just by reading the landing page. Make sure to include clear, descriptive images and text here.

---
#### Well-formatted HTML

Having well structured and **properly indented** HTML code is necessary for 2 main reasons:
1. Debugging: when your HTML code is acting funny (an element wasn't closed at all or was closed in the wrong place), it can be nearly impossible to figure out where the problem is coming from if your indentation is all over the place. Save yourself (and the TAs 😉) hours of pain by taking 10-15 minutes to go through your views and properly format each line of your HTML.
This goes for embedded ruby as well - make sure it's indented correctly along with the rest of your HTML code.
When you look at your HTML structure, it should look like a very satisfying [V formation of ducks](https://banner2.cleanpng.com/20180719/kjo/kisspng-duck-bird-flight-goose-flock-ducks-5b50e654b71ed8.2895934015320285007501.jpg).

2. Teamwork: if you're having a hard time understanding your HTML structure, then it's very likely the rest of your team will too. Make your and your team's life easier by creating code that anyone can come into and understand. This concept isn't limited to your bootcamp experience, but will extend into your professional career as a developer (if that's the path you go after Le Wagon).

---
#### Resources
We all know by now that Google is our best friend... but so is Kitt! Check out the Library section for cheatsheets and tutorials including the following (and much more):
- Behold the holy grail of [all things simple form](https://kitt.lewagon.com/knowledge/cheatsheets/simple_form), including how to target specific simple-form-generated CSS classes
- Need any realtime content streams for your users, like for a chat? Use [ActionCable](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/06-Projects%2F01-Pundit)
- Position things perfectly with [flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- Need a calendar in your app? Check out [the Simple Calendar gem](https://kitt.lewagon.com/knowledge/tutorials/simple_calendar)
- Add [a star rating](https://kitt.lewagon.com/knowledge/tutorials/star_rating) to your reviews
- How about a QR code? Add one easily with [this tutorial](https://kitt.lewagon.com/knowledge/tutorials/qr_code)
- Make your alerts sweeter with [Sweet Alert](https://kitt.lewagon.com/knowledge/tutorials/sweetalert)
- Need a 'bookmark' feature? Try the `acts_as_favoritor` [gem](https://github.com/jonhue/acts_as_favoritor)
- Do your users need to be able to purchase something in your app? Let [Stripe](https://kitt.lewagon.com/knowledge/tutorials/stripe) handle that.
