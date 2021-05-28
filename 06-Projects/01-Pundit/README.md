## Projects - Kick off

You now belong to a team with a clear concept for the MVP you're going to be building for the rest of the bootcamp. The goal of the kick off is the same as Airbnb - Day 1.

The kick off will be broken up into two parts:
- Part 1 involves all the brainstorming discussions prior to coding (user stories, DB, routes etc.)
- Part 2 entails setting up your app and project management tools in order to start coding

For **each step of part 1**, you must put in a ticket to get it validated by a TA before proceeding.

---
## Part 1

### Step 1 - User stories
Duplicate this [spreadsheet](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (1 per team) and invite your teammates to collaborate.

Revisit your projects from Product Design Sprint. What worked? What didn’t work? First up, decide on **the core user journey**. Then divide the core user journey into user stories. You should end up with a dozen max, not counting Devise.

When coming up with your user stories with your team, we recommend to organize them with the MoSCoW method:
- 📗 **Must have**: critical in order for it to be a success
- 📒 **Should have**: important but not necessary for delivery in the current timebox
- 📙 **Could have**: desirable but not necessary
- 📕 **Won’t have**: the least-critical, lowest-payback items, or not appropriate

By thinking of your user stories this way, it will make it easier to label and prioritize them in your [Kanban board](https://en.wikipedia.org/wiki/Kanban_board).

### Step 2 - Database Schema
Next up, open [Kitt's DB schema builder](https://kitt.lewagon.com/db) and figure out the **database schema** needed for your user stories. This is usually the trickiest bit of the day, and it can be easy to get carried away. Spend time talking it out amongst your group, focusing on your **core user journey**. What kind of relationships do you have in your app -- 1:N, N:N? If you have any N:N relationships, don't forget to include your join tables.

If you notice your schema is getting rather large (i.e. more than 6 tables), think about scaling it down to the **must haves** that you determined above. It's always better to start small with an approachable schema than to start with an overly complicated schema. Complicated schemas == dependencies == hard to divide features and get your MVP up and running in time. Instead, divide it into stages based on priority. Once you accomplish one stage, move onto the next and update the schema if needed. Repeat until done (or you run out of time 😅).

### Step 3 - Routes & Mockups
Open your [Figma](https://www.figma.com/) from the Product Design Sprint and see if the user flow still matches what your team has in mind. If it doesn't, take some time to think about it as a team, and rework your wireframe based on the flow you've decided on. You can use a tool like [Whimsical](https://whimsical.com) or [Excalidraw](https://excalidraw.com/) to keep it super basic and clear. At this point, your Figma is still a wireframe. Now is **not** the time to start adding your visual identity, you will have more time later to work on a high-fidelity version.

Based on your user stories and the different screens of your wireframe, figure out the **routes** for each and add them to your spreadsheet, along with the corresponding **controller** and **action**.  

---
## Part 2


As not everyone will be able to code the app setup, now is the perfect time to divide up the rest of the steps amongst your team so that everyone has something to work on.

### Task 1 - Rails New
First, decide amongst your team who will be the Lead Developer for this project. This can be the same person from your Airbnb project, or a new team member can give it a go. That person will then continue with the following steps for setting up the app.

When starting your rails project, you **must** use one of the [**Wagon Rails Templates**](https://github.com/lewagon/rails-templates/tree/master). Make sure you use the [Devise template](https://github.com/lewagon/rails-templates/tree/master#devise) if you need a `User` model!

After the app is created, create your Github Repository and add all teammates as collaborators. Check out the [Github lecture slides](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F06-Airbnb-Devise#/1/3/0) for an overview of the process.

Then create the Heroku app and do your initial deploy. Check out [the Heroku lecture slides](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F05-Rails-MC-with-images#/0/2/5) if you need a refresher on the steps.

Tip: always run `heroku run rails db:migrate` after pushing to Heroku to make sure your production database is up to date with any changes.

### Task 2 - Figma
As you likely found out during Airbnb Week, having a thorough and fully fleshed-out Figma can make a world of a difference for your team's working process. Knowing exactly what each feature should look like, with a consistent design pattern, is what takes your app to the next level!

While you created your initial mockup on the Product Design Sprint, now is the time to take another look and update it based on the decisions you & your team made earlier about user stories, routes, etc.
Figma is an incredible tool with loads of cool features that you can utilize here to make a high-fidelity prototype. Make sure to create your [components library](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-Components-in-Figma), add some plugins like [unsplash](https://www.figma.com/community/plugin/738454987945972471/Unsplash), [color palettes](https://www.figma.com/community/search?model_type=public_plugins&q=color%20palettes) and explore even more in the [community](https://www.figma.com/community/explore) section.

Choose a team member to work on improving the Figma while the others continue with the next tasks.

### Task 3 - Kanban Board
A [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) is an agile project management tool designed to help visualize work, track progress, and maximize efficiency (or flow). There are many different resources out there ([Trello](https://trello.com/), [Github Projects](https://github.com/features/project-management/), [Notion](https://www.notion.so/), just to name a few). 

We've prepared two drafts for you to start from if you choose Trello or Github Projects but feel free to use another tool if you are more familiar with it:

1. Trello Draft - Make a copy of [this Trello Board](https://trello.com/b/WB3fRTj2) (menu > more options > copy board > board name for your project). Then add all team members to the board and start importing all your user stories and tasks (order by priority).

2. Github Projects Draft - To set up your kanban board on Github, you'll need to have the repository created already and to have all the collaborators added. Then, a team member can use [this board](https://github.com/users/tonipanacek/projects/1) as the basis for your project board. Follow the instructions [here](https://docs.github.com/en/github/managing-your-work-on-github/copying-a-project-board) to see how to copy and add the board to your own project's repository. Two things to note: Github doesn't copy over the cards from the original board, so you'll have to add them yourself. Feel free to copy/paste the cards to get you going, or just start from scratch. Second, Github uses markdown syntax for text formatting like headings, font style, and checkboxes. It's not required, but can be nice to add formatting to your cards. You can read more about it [here](https://guides.github.com/features/mastering-markdown/).

### Task 4 - Domain Name
Having a custom domain name will make your MVP seem much more legit than using the free `.herokuapp.com` url. We recommend using [Namecheap](https://www.namecheap.com/) to buy your domain name. Please follow [this guide](https://www.lewagon.com/blog/buying-a-domain-on-namecheap-and-pointing-it-to-heroku) to purchase and setup your custom domain. Then follow [this guide](https://www.lewagon.com/blog/setting-up-a-free-ssl-certificate-on-heroku) to setup your SSL certificate.

Please note that Le Wagon is an official partner of GitHub since 2015. Hence, our partnership allows you to redeem an access to the [Github Student Developer Pack](https://education.github.com/pack). You can find all the info [here](https://www.notion.so/lewagon/GitHub-Student-Developer-Pack-cc73194095034af1a0db32628b729bc3). There is a [special offer](https://education.github.com/pack?sort=popularity&tag=Domains) for Namecheap if the domain name registers with a `.me` TLD.

### Task 5 - Team Slack Channel
It's good to have a centralized location where all communication, resource-sharing, and notes can be kept relating to your project. Use a channel named `#batch-<user.batch_slug>-your_project_name` with your team. Add a topic to the channel with the following links for your project:

1. Trello or Github Project
2. Heroku
3. DB Schema
4. Github Repo
5. Figma

In order to get everything to fit in the description area, you will likely need to use a tool like [bitly](https://bitly.com/) to shorten the URLs.

Important: This channel **must not** be used as an alternative ticketing system. Tickets still need to be created the normal way.

### Task 6 - Product Page
On Kitt, we also centralize all your different links for your project. Please go on your batch's [Products page](https://kitt.lewagon.com/camps/<user.batch_slug>/products), select your product and click on `view details`. Take the time to fill out the different sections of your product page. This will allow the teaching crew to have an overview of your project. 

---
#### End of day
Before signing off, ask your teammates if there is any work done that can be merged in `master` and deployed 🚀

```zsh
git status # must be clean
git co master
git pull origin master
git push heroku master
```

---
#### Resources

- Remind yourself how to properly use git with [this cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/git_advanced).
- Refresh your Active Record knowledge [here](https://kitt.lewagon.com/knowledge/cheatsheets/activerecord) before starting to create your models.
- Some of your schemas may have more advanced relationships and foreign keys than we saw during Airbnb week. For example, a table that needs to store two instances (foreign keys) from another table (most often the `User` table). In this case you'll need to use something called `aliases`. Learn how to implement this with [a guide](https://kitt.lewagon.com/knowledge/cheatsheets/activerecord_advanced) on advanced Active Record.
