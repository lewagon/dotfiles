## Advanced UI Kit (30mn)

Now that you've created your first UI components, it's time to move on to a more advanced one. Let's build a responsive card using Figma's [Auto Layout](https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-Auto-layout) feature.

**Auto Layout** lets you design dynamic components (called frames) that respond to the contents they hold - they grow to fill and shrink to fit. With Auto Layout you can also set padding on a frame and align the items inside horizontally and vertically, just like in a CSS flexbox! 💪

### Design a dynamic card component with Auto Layout

Start by creating two rectangles, one which will be your card and the other which will be an image on top of it. Put them on top of each other, highlight them both and select the option `Auto Layout` on the right design panel. If you cannot see the option on the right panel, right-click on your selection and choose `add auto layout` from the menu.

![Create a frame with Auto Layout](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_one.gif)

This creates a **frame** and provides you with new design options that you can find on the right panel. For example, you can now set padding on the card to the number of pixels you want to add on each side.

![Set padding on the card](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_two.png)

Now you can take other components like a text or a button and drag them on your frame. Wait until a blue line appears on the card and then drop them. You will see your card grow based on the new content **and** it keeps the padding you set in the previous step! 😎

![The card grows based on the content inside](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_three.gif)

Let's see what happens if we have a long description for the card. Add some more text and your layout breaks. We can fix this by changing the `Resizing` option on the `text` from `Hug contents` to `Fill container`.

**Resizing options**:
- **Fill container** makes an object stretch to fill its container. It can only be set on children of a frame, so on the text in our case.
- **Hug contents** makes a parent fit to the size of its children.
- **Fixed** means the object won't resize with its parent or children.

![Keep the design using the resizing options](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_four.gif)

You can play around with the positioning of the children in the frame to align them in the center, at the end of the frame or somewhere else. If you click on the arrow next to the keyword `Packed`, you can spot another distribution option called `Space between` which, you guessed it, lets you align the children in your frame just like you would in a CSS flexbox 🤩

![Align the items in your card like in a flexbox](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_five.png)

How about if you need to resize your card? Make sure you select the resizing option `Fill container` on both the image and the text (and on any element which stretches from the beginning of the card to the end) and then you won't have any problems making your card bigger or smaller without breaking the design 🎉

![Resize your card](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/pds_auto_layout_six.gif)

### More about Auto Layout

Auto Layout is a great way to design dynamic components. But there is more to it than that: you can also use it to quickly reorder your elements or to create full screens that work across mutliple devices! Have a look at the [Auto Layout Playground](https://www.figma.com/community/file/784448220678228461) to find out more.

Enjoy the Automagic! ✨
