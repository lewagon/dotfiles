## Projects

First session of actual coding, let's get going!

**First things first**: if your team didn't get around to buying & setting up a domain name on the kickoff session, please select one of your team members to do that now.
We recommend using [Namecheap](https://www.namecheap.com) to buy the domain, and then follow [this guide](https://www.lewagon.com/blog/buying-a-domain-on-namecheap-and-pointing-it-to-heroku) to properly connect the domain to your heroku account.
The DNS propagation can (sometimes) take up to 24 hours. So if your domain doesn't connect right away, leave it and check back on it later. If you're still having connection issues at that point, please put in a ticket with a TA to troubleshoot it.

Please note that Le Wagon is an official partner of GitHub since 2015. Hence, our partnership allows you to redeem an access to the [Github Student Developer Pack](https://education.github.com/pack). You can find all the info [here](https://www.notion.so/lewagon/GitHub-Student-Developer-Pack-cc73194095034af1a0db32628b729bc3).

---
#### Daily Standup

Let's revise how and why the daily standups should occur:

Standup meetings are held a the beginning of each day with a TA. The whole team and assigned TA should take part. Notes of the meeting should be recorded clearly in the project Slack channel. Make sure to invite your assigned TA to your project Slack channel if you haven't done so.

The aim is to keep everybody on the same page with the decisions and progress of the project, and get general guidance on your product.

Before the standup:
- Update the Kanban board if needed
- Get the latest version of your master to discuss the current state of your app
- Then, when ready, please ping or add the TA to your slack call so you can start the Standup meeting.

During the standup:
- The Project Lead should share his/her screen with the Kanban board & App opened
- Previous day's recap: round table with everyone's actual completed tasks
- Today's program: round table for which features/page you will work on today
- Address every technical concern or difficulties
- Share your general state of mind, concerns or ideas. Communication is key!
- Discuss all together with the TA every change to user stories (+ / -)

The Kanban board should support your standup meeting discussions and be updated accordingly.

---
#### Feature Building
The purpose of the projects is for **everyone to learn**. We shouldn't pigeonhole each other / ourselves into either frontend or backend, but rather make sure everyone gets to experience the whole picture. For this reason, when you divide up your tasks amongst your team, you should divide them as **features** where the team member will see it all the way through from backend to frontend.

That means the feature flow is:
`route > controller action > view WITH initial (if not all) css`

---
#### Feature Dependencies
A big part of deciding how to delegate tasks is first figuring out which features, if any, are dependent on other features in order to be built.
While filling in your Kanban board, try to figure out these dependencies and make them clear so that every team member is aware (a good hint that there will be a dependency is a _nested route_). Consider adding a label to that feature card in the Kanban.

Ways to tackle feature dependencies:
- If you have enough user stories, give everyone a feature that doesn't have any dependency
- Or, start with a core feature that other features are dependent on, and pair program on it until you are able to split off onto individual tasks
- Divide tasks between frontend and backend while the dependent feature is being done, then switch back to feature building.

---
#### Best Branching Practices

The workflow we use is called **Feature Branching**. This means that each branch is one feature, or **part of one feature**. Ideally, you should not be working on the same branch for more than a day. If the backend and basic frontend is done, push it and then create a new branch to finish beautifying the view. Your branch should have a clear, descriptive name, like `restaurants-show` or `dashboard-page-frontend` or `animated-menu-items`.

NOTE: This also means **we never code on master**. If you realize you've accidentally been coding on master, don't fret! Just move into an existing branch or create a new one, and the un-committed changes will be brought along with you. You can review the git flow [here](https://kitt.lewagon.com/knowledge/cheatsheets/git_advanced). If for some reason you're having issues moving into a new branch, please open a ticket.

Once you think you've finished your feature, the process should be:

1. Push your branch - ask one team-member to review
2. Merge into master - if your code is approved by team
3. Communicate to the team that master was updated - so they can pull latest version
4. Deploy to Heroku - crash test / debug
5. Update the Kanban board

It's normal to have merge conflicts every now and then, minimize the risk by pushing and merging on a regular basis!

---
#### Continuous Deployment
The flow mentioned above 👆 is called continuous deployment. The idea of continuous deployment is to ship code to your production environment as often as possible. Ideally, every time a PR gets merged into `master`, the `master` branch should then be pushed to production. The advantages of this are:
- Prevent technical debt from stacking up. By pushing often and then crash testing the new code, you'll find any bugs right away and you'll know that they came from the most recent code that was pushed. This makes it much easier to find the source and to debug. If you instead wait to push to production after 5+ PR's have been merged, it's much harder to figure out where the bugs are stemming from.
- The code is in the hands of the user quicker. This means that if code was merged into master, then it is considered "done" and should be given to the user to actually use it. This also means that you'll receive any user feedback sooner, and can implement and iterate quickly and easily in order to provide the best possible product for your users. (In your MVP, you'll have to act as both the developer and the user 😉)

---
#### Browser Tabs
By now, we have likely learned that coding means having 100 browser tabs open at any one time 😂. So let's get ourselves set up for success by pinning (right click on the tab and select 'pin') the following tabs in your browser for easy access to help while coding:
- [Search through Kitt lectures](https://kitt.lewagon.com/knowledge/lectures)
- [Frequent Rails Error Messages](https://github.com/Eschults/useful_stuff#pgerror-fatal-myapp_development-does-not-exist)
- [Tutorials](https://kitt.lewagon.com/knowledge/tutorials)
- [Cheatsheets](https://kitt.lewagon.com/knowledge/cheatsheets)

---
#### Seeds
It's good to start off with some basic data that everyone can work with, especially for those working on the READ features. Prioritize the creation of some basic seeds to get going.

---
### Resources
- Some of your schemas may have more advanced relationships and foreign keys than we saw during Airbnb week. For example, a table that needs to store two instances (foreign keys) from another table (most often the `User` table). In this case you'll need to use something called `aliases`. Learn how to implement this with [a guide](https://kitt.lewagon.com/knowledge/cheatsheets/activerecord_advanced) on advanced Active Record.
- Make sure to authorize your user actions with [Pundit](https://kitt.lewagon.com/knowledge/cheatsheets/pundit)
- Start building out your frontend by grabbing components from the [Le Wagon UI Kit](https://uikit.lewagon.com/documentation) and customize them to your own design.
