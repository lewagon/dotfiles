## AirBnB Week

The next 5 days will be in groups of 3 to 4 students, working on an AirBnB clone
(you don't have to rent **flats**, be creative!). You should start working with
your 2-week final project.

### Demos

You will demo your work (in production, no demo on `localhost`!) on Wednesday and Friday nights. Deadlines matter!

### 1 - User-stories

They will drive your software development and the way you split tasks in your team. Write all the user-stories of your airbnb MVP. Example:

- As a visitor, I can signup
- As a visitor, I can search for a flat in a city for given checkin/checkout dates
- As a user, I can book an available flat
- As an owner, I can create a flat ad
- Atc..

Please download and **print** [this template for your User Stories](https://github.com/lewagon/fullstack-images/raw/master/rails/rails-user-stories.pdf).

### 2 - Database Scheme

Draw your database scheme  (e.g. using [our db tool](http://db.lewagon.org/)) and validate it with a coach. The database scheme is the milestone of your app. If your DB scheme is wrong or too complicated, you are stuck and you cannot code any good app afterwards.

### 3 - Mockup

Draw a basic mockup of your app on paper. First list all the views suggested by your user-stories (home / signin / signup / flats index / flats show / profile / etc.. ). For each view, make a simple drawing, to know what info you will insert in it (owner's picture? Flat's picture? map? Flat's info?), and what navigation and buttons (button "book this flat", links in the navbar to go back to the search page etc..). No need to be Michelangelo, just think about:

1. The info you want to display
2. The buttons and navigations to make the glue between your different views.

### 4 - Setup

Before splitting the tasks among the team, setup your project. The **lead developer** (and only him/her) should:

#### 1. Create the Rails project with Postgres config

```bash
cd ~/code/<user.github_nickname>
rails new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  rails-airbnb-clone
```

Again, only the **lead developer** will do this! Not everyone in the team...

#### 2. Push the project on Github

```bash
cd rails-airbnb-clone
hub create
git push origin master
```

#### 3. Add his team mates as collaborators on the Github repo

Go to [github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration](https://github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration) and add your teammates as **collaborators** to the repo.

The other teammates can now **clone** the project. **⚠️ Be careful, use `SSH` url**

#### 4. Deploy on Heroku

Even if it's just a skeleton app, it's important to deploy on Heroku from Day one.

```bash
heroku create airbnb-<user.lower_github_nickname> --region=eu
git push heroku master
heroku run rails db:migrate
```

From this point you can start splitting the tasks. Spend time on the setup, because everything will be simpler if you do it the right way from the beginning.

### 5 - Software management guidelines

#### Kick-off

When trying to split work in your team, you'll realize that many tasks depend on other ones... How to integrate facebook connect if there is no User model? How to implement bookings if there is no Flat model? Here are some guidelines to help you organize your work:

You will always detect **core models** in your app on which all future features relie. In our case, they are clearly `User` and `Flat`. Once these models are integrated, then it's easier to split work on remaining features. As a kick-off phase, you can therefore separate two main tasks:

- group #1: `User` with signin, `Flat` listing and creation (from owner's perspective)
- group #2: Front-end setup, layout with navbar/footer, home page.

Once both groups are done and have merged their work on Github, you can all move on to remaining features.

#### Tasks organization

Here is a list of different things to do on the Airbnb project

- navbar with working links (signin/signout, "My bookings", "Publish an announce", etc..)
- flat's booking
- add pictures to flat
- add reviews to flat
- add geocoding to flat and Gmaps in views
- Facebook connect
- Mailing between owner / user

Some of these features are more important than others. It's your role to prioritize them to get an MVP at the end of the week!

#### Feature example: Book a flat

**Specify your feature**

When you work on a feature, tell the rest of the team on which files you will work exactly. That will avoid conflicts or quiproquo and help you clarify what work you have to do precisely.

- *Model*: I will create the `Booking` model and migration, with good associations and validations (crash-tested on rails console).
- *Routing*: I will add bookings routes in `routes.rb`
- *Controller*: I will create a new `BookingsController`
- *New Views*: I will create `views/bookings/new.html.erb` for booking form and `views/bookings/index.html.erb` for listing current user's bookings.
- *Existing Views*: I will connect the "book it" button of a flat's show view to my booking form and I will connect the "My bookings" link in the navbar to my bookings index view.

**Code it perfectly, from model to view**

When you code your feature, make it perfect from the model to the view.

- Crash test all your model associations and validations on the rails console.
- Don't neglect the view. If you add a form, make it a nice centered Bootstrap form. If you code a flats list, build a nice Bootstrap grid (for example, with flat picture on the left and flat info on the right..).
- Use partials to refacto your HTML when you have consistent blocks as a flat's info box for instance.
