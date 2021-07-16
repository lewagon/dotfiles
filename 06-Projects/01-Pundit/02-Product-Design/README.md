
### User Stories
Duplicate this [spreadsheet](https://docs.google.com/spreadsheets/d/1_q-wwWiWUY5VL0gZVtqWIidWEtfwhX8FHEbwaW0LuFI/edit?usp=sharing) (1 per team) and invite your teammates to collaborate.

Revisit your projects from Product Design Sprint. What worked? What didn’t work? First up, decide on **the core user journey**. Then divide the core user journey into user stories. You should end up with a dozen max, not counting Devise.

When coming up with your user stories with your team, we recommend to organize them with the MoSCoW method:
- 📗 **Must have**: critical in order for it to be a success
- 📒 **Should have**: important but not necessary for delivery in the current timebox
- 📙 **Could have**: desirable but not necessary
- 📕 **Won’t have**: the least-critical, lowest-payback items, or not appropriate

By thinking of your user stories this way, it will make it easier to label and prioritize them in your [Kanban board](https://en.wikipedia.org/wiki/Kanban_board).

**Done? Put in a ticket to validate with a TA before proceeding further.**

### DB Schema
Next up, open [Kitt's DB schema builder](https://kitt.lewagon.com/db) and figure out the **database schema** needed for your user stories. This is usually the trickiest bit of the day, and it can be easy to get carried away. Spend time talking it out amongst your group, focusing on your **core user journey**. What kind of relationships do you have in your app -- 1:N, N:N? If you have any N:N relationships, don't forget to include your join tables.

If you notice your schema is getting rather large (i.e. more than 6 tables), think about scaling it down to the **must haves** that you determined above. It's always better to start small with an approachable schema than to start with an overly complicated schema. Complicated schemas == dependencies == hard to divide features and get your MVP up and running in time. Instead, divide it into stages based on priority. Once you accomplish one stage, move onto the next and update the schema if needed. Repeat until done (or you run out of time 😅).

**Done? Put in a ticket to validate with a TA before proceeding further.**


### Routes & Mockup
Open your [Figma](https://www.figma.com/) from the Product Design Sprint and see if the user flow still matches what your team has in mind. If it doesn't, take some time to think about it as a team, and rework your wireframe based on the flow you've decided on. You can use a tool like [Whimsical](https://whimsical.com) or [Excalidraw](https://excalidraw.com/) to keep it super basic and clear. At this point, your Figma is still a wireframe. Now is **not** the time to start adding your visual identity, you will have more time later to work on a high-fidelity version.

Based on your user stories and the different screens of your wireframe, figure out the **routes** for each and add them to your spreadsheet, along with the corresponding **controller** and **action**.

**Done? Put in a ticket to validate with a TA before proceeding further.**
