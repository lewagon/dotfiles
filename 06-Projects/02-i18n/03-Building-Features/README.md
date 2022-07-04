## Tasks as Features

The purpose of the projects is for **everyone to learn**. We shouldn't pigeonhole each other / ourselves into either front-end or backend, but rather make sure everyone gets to experience the whole picture. For this reason, when you divide up your tasks amongst your team, you should divide them as **features** where the team member will see it all the way through from backend to front-end.

That means the feature flow is:
`route > controller action > view WITH initial (if not all) css`

## Dependencies

A big part of deciding how to delegate tasks is first figuring out which features, if any, are dependent on other features in order to be built.
While filling in your Kanban board, try to figure out these dependencies and make them clear so that every team member is aware (a good hint that there will be a dependency is a _nested route_). Consider adding a label to that feature card in the Kanban.

Ways to tackle feature dependencies:
- If you have enough user stories, give everyone a feature that doesn't have any dependency
- Or, start with a core feature that other features are dependent on, and pair program on it until you are able to split off onto individual tasks
- Divide tasks between front-end and backend while the dependent feature is being done, then switch back to feature building.
