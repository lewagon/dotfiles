## Airbnb Week

You will spend the next sessions with your Project Group working on an Airbnb clone (you don't have to rent **flats**, be creative!)

### Demos

You will demo your work (in production, no demos on `localhost`!) during the **Geocoding** and **Authorization & Pundit** sessions. Deadlines matter!

### Part I

Work on the following steps and validate them with a teacher at the start of the session before creating your Rails app and moving on to Part II. You will save a lot of time by doing this, trust us.

#### 1 - User stories

Duplicate this [spreadsheet](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (1 per team) and invite your teammates to collaborate.

![duplicate](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/duplicate.png)
![rename](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/user-stories/rename.png)

Start by thinking of the **user journeys** you will showcase during the demo. There are lots of possible use cases for a product like Airbnb, but try to narrow them down to the minimum viable journeys to make it work.

<details><summary markdown='span'>View solution
</summary>

- 1 user journey for the user creating an offer
- 1 user journey for the user booking an offer
- 1 user journey for the owner accepting or declining a booking request

</details>

Each user journey contains several **user stories**: write them down in the spreadsheet by using the right terminology. When you are done, create a ticket to validate them with a teacher.

You can draw quick sketches with a pen and paper of the different screens and the rough elements they contain. This will help you visualize your user journeys. Be careful, no need to be too specific at this point! This is a sprint, you need to allocate your time and resources wisely.

#### 2 - Database Schema

Draw your database schema using [our db tool](https://kitt.lewagon.com/db/new) and **create a ticket to validate it with a teacher**. Draw only the minimum viable for your app to work. Use the right conventions (plural names for columns... etc - cf. the DB lectures).

#### 3 - Routes

Go back to your User stories spreadsheet and add the following information:
- Route: Verb + Path
- Action
- Controller

Create a ticket to validate them with a teacher. All good? Time for the `rails new`!

### Part II

Before splitting the tasks among the team, set your project up together. The **lead developer** (and only him/her) should:

#### 1. Create the Rails project with a Postgres config

Use Le Wagon's minimal template, which already has a good front-end setup:

```bash
cd ~/code/<user.github_nickname>
rails new \
  -d postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
```

Again, only the **lead developer** will do this! Not everyone in the team...

#### 2. Push the project on Github

```bash
cd your-rails-app-name
gh repo create --public --source=.
git push origin master
```

#### 3. Add your team mates as collaborators on the Github repo

Go to [your Github repo settings](https://github.com/<user.github_nickname>/rails-airbnb-clone/settings/collaboration) and add your teammates as **collaborators** to the repo.

The other teammates can now **clone** the project. ⚠️**Be careful, use `SSH` URL**⚠️

Then, the teammates should run:

```bash
bundle install
rails db:create db:migrate
```

#### 4. Deploy on Heroku

Even if it's just a skeleton app, it's important to deploy on Heroku **from day one**, and then continuously deploy every day with each new feature.

```bash
heroku create airbnb-<user.lower_github_nickname> --region=REPLACE_WITH_REGION # (eu, us, or any region available in `heroku regions` list)
heroku config:set WEB_CONCURRENCY=1 # fixes temporary Heroku bug
git push heroku master
heroku run rails db:migrate
```

### 5. Kanban Board

A [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) is an agile project management tool designed to help visualize work, track progress, and maximize efficiency (or flow). There are many different resources out there ([Trello](https://trello.com/), [Github Projects](https://github.com/features/project-management/), [Notion](https://www.notion.so/), just to name a few).

We've prepared three drafts for you to start from if you choose Trello, Github Projects or Notion, but feel free to use another tool if you are more familiar with it:

1. Trello Draft - Make a copy of [this Trello Board](https://trello.com/b/WB3fRTj2) (menu > more options > copy board > board name for your project). Then add all team members to the board and start importing all your user stories and tasks (order by priority).

2. Github Projects Draft - To set up your kanban board on Github, you'll need to have the repository created already and to have all the collaborators added. Then, a team member can use [this board](https://github.com/users/tonipanacek/projects/1) as the basis for your project board. Follow the instructions [here](https://docs.github.com/en/github/managing-your-work-on-github/copying-a-project-board) to see how to copy and add the board to your own project's repository. Two things to note: Github doesn't copy over the cards from the original board, so you'll have to add them yourself. Feel free to copy/paste the cards to get you going, or just start from scratch. Second, Github uses markdown syntax for text formatting like headings, font style, and checkboxes. It's not required, but can be nice to add formatting to your cards. You can read more about it [here](https://guides.github.com/features/mastering-markdown/).

3. Notion Draft - Make a copy of [this Notion page](https://www.notion.so/lewagon/Project-Weeks-a3961a7da7324637bea441832becb3ad) by selecting the `Duplicate` option in the navbar. Then add all team members to the board (by clicking `Share` and then inviting them by email) and start importing all your user stories and tasks, ordering by priority. The top right section of the page should house all your relevant app links. The ones there should be used as a guide for which ones you'll need to include but unfortunately you can't edit these, so you'll have to recreate them yourself with the correct links. Follow [this guide](https://www.notion.so/Web-bookmarks-00b4add1fc96477d8aa70e65e02ec4da) for getting the `Web bookmarks` added correctly. If you're new to Notion, feel free to check out [this page](https://www.notion.so/Help-Support-e040febf70a94950b8620e6f00005004) to learn more and become a Notion-expert in no-time 💯

From this point you can start splitting the tasks. **Spend time on the setup, because everything will be simpler if you do it correctly at the beginning**.

### Some guidelines for project management

#### Kick-off

When trying to split work in your team, you'll realize that many tasks depend on other ones... How to integrate facebook connect if there is no `User` model? How to implement bookings if there is no `Flat` model? Here are some guidelines to help you organize your work:

You must always start with the **core models** in your app that all future features will depend on. In Airbnb's case, they are clearly `User` and `Flat`. Once these models are integrated, it becomes easier to split work on remaining features. As a kick-off phase, you can therefore separate two main tasks:

**group #1 - Model kick-start**:
- Integrate `User` with Devise signin/signup
- Integrate `Flat` with listing (`index`) and creation (`new/create`)

**group #2 - Front-end kick-start**:
- Work on a clean layout with navbar/footer
- Build a simple, attractive home page

Once both groups are done (it should take you around 2h each) and once you have all merged your work on GitHub, you can move on and split tasks for the remaining features.

#### Tasks organization

Here is a list of different user stories to implement on the Airbnb project:

- As a user, I can navigate on the website from the navbar (with functional links, e.g. "signin/signout", "My bookings", "Publish an offer", etc.)
- As a user, I can view a flat's page
- As a user, I can book a flat
- As a user, I can add pictures for my flat
- As a user, I can add reviews for a flat I've stayed in
- As a user, I can locate flats on a map
- As a user, I can log in with Facebook
- As a user, I can receive an email when someone books my flat
- ...

**Some of these features are more important than others**. It's your role to prioritize them to get an MVP at the end of the week!

#### Feature example: Book a flat

When you work on a feature, work on it **conscientiously from the database to the HTML/CSS**. Let's take the example of the "booking" feature:

*Model*
- I will create a `Booking` model and its associated migration.
- Then I will write a working model with associations and validations.
- I will then crash-test my model from the `rails console` to make sure everything in the model works.

*Routing*:
- I will add bookings routes in `routes.rb`

*Controller*:
- I will create a new `BookingsController` with the `create` and `index` actions.
- I will implement these two actions.

*Views modification*:
- I will embed the booking form in the existing `views/flats/show.html.erb`
- I will list all current user's bookings on a new page `views/bookings/index.html.erb`.

*Links*:
- I will add a link to the `bookings#index`page in the navbar.

*HTML/CSS*:
- My booking form is clean with the correct Bootstrap classes for the inputs and buttons.
- My new bookings page is clean with a `container` to center the content, clear headers, and a clean design for each booking.
- I will take time to refactor my HTML using partials if my HTML code is too long and hard to read.

**Code it perfectly, from model to view**

- Crash test all your model associations and validations in the rails console.
- Don't neglect the view. If you add a form, make it a nice, centered and responsive Bootstrap form. If you code a flats list, build a nice Bootstrap grid (for example, with flat picture on the left and flat info on the right..).
- Use partials to refactor your HTML and make it more readable and maintainable.
