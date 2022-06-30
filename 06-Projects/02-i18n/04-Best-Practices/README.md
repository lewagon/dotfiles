## How to Branch

The workflow we use is called **Feature Branching**. This means that each branch is one feature, or **part of one feature**. Ideally, you should not be working on the same branch for more than a day. If the backend and basic front-end is done, push it and then create a new branch to finish beautifying the view. Your branch should have a clear, descriptive name, like `restaurants-show` or `dashboard-page-front-end` or `animated-menu-items`.

NOTE: This also means **we never code on master**. If you realize you've accidentally been coding on master, don't fret! Just move into an existing branch or create a new one, and the un-committed changes will be brought along with you. You can review the git flow [here](https://kitt.lewagon.com/knowledge/cheatsheets/git_advanced). If for some reason you're having issues moving into a new branch, please open a ticket.

Once you think you've finished your feature, the process should be:

1. Push your branch - ask one team-member to review
2. Merge into master - if your code is approved by team
3. Communicate to the team that master was updated - so they can pull latest version
4. Deploy to Heroku - crash test / debug
5. Update the Kanban board

It's normal to have merge conflicts every now and then, minimize the risk by pushing and merging on a regular basis!

## Continuous Deployment

The flow mentioned above 👆 is called continuous deployment. The idea of continuous deployment is to ship code to your production environment as often as possible. Ideally, every time a PR gets merged into `master`, the `master` branch should then be pushed to production. The advantages of this are:
- Prevent technical debt from stacking up. By pushing often and then crash testing the new code, you'll find any bugs right away and you'll know that they came from the most recent code that was pushed. This makes it much easier to find the source and to debug. If you instead wait to push to production after 5+ PR's have been merged, it's much harder to figure out where the bugs are stemming from.
- The code is in the hands of the user quicker. This means that if code was merged into master, then it is considered "done" and should be given to the user to actually use it. This also means that you'll receive any user feedback sooner, and can implement and iterate quickly and easily in order to provide the best possible product for your users. (In your MVP, you'll have to act as both the developer and the user 😉)

## Browser Tabs

By now, we have likely learned that coding means having 100 browser tabs open at any one time 😂. So let's get ourselves set up for success by pinning (right click on the tab and select 'pin') the following tabs in your browser for easy access to help while coding:
- [Search through Kitt lectures](https://kitt.lewagon.com/knowledge/lectures)
- [Frequent Rails Error Messages](https://github.com/Eschults/useful_stuff#pgerror-fatal-myapp_development-does-not-exist)
- [Tutorials](https://kitt.lewagon.com/knowledge/tutorials)
- [Cheatsheets](https://kitt.lewagon.com/knowledge/cheatsheets)

## Seeds

It's good to start off with some basic data that everyone can work with, especially for those working on the READ features. Prioritize the creation of some basic seeds to get going.

