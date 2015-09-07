## AirBnB Week

The next 5 days will be in groups of 2 to 4 students, working on an AirBnB clone
(you don't have to rent **flats**, be creative!)

### Demos

You will demo your work (in production, no demo on `localhost`!) on Wednesday and Friday nights. Deadlines matter!

### 1 - User-stories

They will drive your software development and the way you split tasks in your team. Write all the user-stories of your airbnb MVP. Example:

```
- as a visitor, I can search for a flat in a city for given checkin/checkout dates
- as a visitor, I can signup
- as a user, I can login/logout
- as a user, I can book an available flat
- as a owner, I can add a flat announce
- etc..
```

### 2 - Data scheme

Draw your database scheme  (e.g. using [our db tool](http://db.lewagon.org/)) and validate it with a coach. The database scheme is the milestone of your app. If your DB scheme is wrong or too complicated, you are stuck and you cannot code any good app afterwards.

### 3 - Mockup

Draw a basic mockup of your app on a paperbook. First list all the views suggested by your user-stories (home / signin / signup / flats index / flats show / profile / etc.. ). For each view, make a simple drawing, to know what info you will insert in it (owner's picture? Flat's picture? map? Flat's info?), and what navigation and buttons (button "book this flat", links in the navbar to go back to the search page etc..). No need to be Michelangelo, just think about

1. The info you want to display
2. The buttons and navigations to make the glue between your different views.


### 4 - Setup

Before splitting the tasks among the team, setup your project. The lead-developer should:

- Create the Rails project with Postgres config
- Push the project on Github
- Add his team mates as collaborators on the Github repo
- Deploy on heroku

From this point you can start splitting the tasks. Spend time on the setup, because everything will be simpler if you do it the right way from the beginning.

### 5 - Software management guidelines

#### Kick-off

When trying to split work in your team, you'll realize that many tasks depend on other ones.. How to integrate facebook connect if there is no User model? How to implement bookings if there is no Flat model? Here are some guidelines to help you organize your work:

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

#### Example of feature - bookings integration

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

