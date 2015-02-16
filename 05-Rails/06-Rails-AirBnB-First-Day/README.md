## Background & Objective

This week, you will build your first serious Rails app and learn to work with a team on a software project. You will learn a lot from this experience, enjoy!

Here is a project roadmap. You can adopt the same organization on any app you will build in the future, as on your final projects.

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

Draw a basic mockup of your app on a paperbook. First list all the views suggested by your user-stories (home / signin / signup / flats index / flats show / profile / etc.. ). For each view, make a simple drawing, to know what info you will insert in it (owner's picture? Flat's picture? map? Flat's infos?), and what navigation and buttons (button "book this flat", links in the navbar to go back to the search page etc..). No need to be Michelangelo, just think about 1) the infos you want to display 2) the buttons and navigations to make the glue between your different views.


### 4 - Setup

Before splitting the tasks among the team, setup your project. The lead-developper should:

- Create the Rails project with Postgres config
- Push the project on Github
- Add his team mates as collaborators on the Github repo
- Deploy on heroku

From this point you can start splitting the tasks. Spend time on the setup, because everything will be simpler if you do it right from the beginning

### 5 - Software management guidelines

**kick-off**

When trying to split work in your team, you'll realize that many tasks depend on other ones.. How to integrate facebook connect if there is no User model? How to implement bookings if there is no Flat model? Here are some guidelines to help you organize your work:

You will always detect **core models** in your app on which all future features relie. In our case, they are clearly `User` and `Flat`. Once these models are integrated, then it's easier to split work on remaining features. As a kick-off phase, you can therefore separate two main tasks:

- group #1: `User` with signin, `Flat` listing and creation (from ownser's perspective)
- group #2: Front-end setup, layout with navbar/footer, home page.

Once both groups are done, you can all move on to integrate remaining features.

**tasks organization**

Here is a list of different thinks to do

- navbar with working links (signin/signout, "My bookings", "Publish an announce", etc..)
- flat's booking
- add pictures to flat
- add reviews to flat
- add geocoding to flat and Gmaps in views
- Facebook connect
- Automatic mailing between owner / user

Some of these features are more important than others. It's your role to prioritize them to get an MVP at the end of the week! In any case, when you work on a task:

- tell the rest of the team on which files you will work exactly. That will avoid conflicts or quiproquo and help you clarify what you have to do:

**Example - bookings integration**:
- I will add bookings routes in `routes.rb`
- I will create a new `BookingsController`
- I will create `views/bookings/new.html.erb` for the booking form and `views/bookings/index.html.erb` to list current user's  bookings.
- I will a connect the "book it" button of the flat view to my booking form, and I will connect the "My bookings" link in the navbar to my bookings index view.
- when you code your feature, make it perfect from the routing to **the view**. Don't neglect the view. If add a form, make it a nice centered Bootstrap form. If you code the flats index, build a nice grid (with flat picture on left and flat infos on right..).

