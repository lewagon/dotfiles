## Background & objectives

The goal of this challenge is to practice advanced WXML attributes to make dynamic views.

## Specs

We want to show more than one story in the **stories page** without repeating the same WXML markup.

### 1. Start from the data!

- In `stories.js`, locate the data key at the top. Add a `stories` array inside.

```js
//stories.js
data: {
  stories: []
}
```

- Each story will be a **new object** stored inside the `stories` array.
- Each story will have a **content** and **name**.

```js
{ content: "Building a mini program is fun!!! FMC.", name: "Yinghui" },
```

You want to create 2-5 stories. After saving this local data succesfully, you can preview it in the **AppData** tab of the console ("debugger"). Anything stored here is available in our WXML template!

### 2. Render a list

We can now render our list of stories using the [`WX:FOR`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/list.html) control attribute.

In your **stories.wxml** page:

- Wrap your card component around a `<view>` or `<block>` element (they are equivalent, just containers)
- Use the `wx:for` control attribute to repeat this container element for each item of your stories array
- Use `wx:for-item` to specify the variable name of the current element of the array
- Use some `{{mustache}}` syntax inside your card, to display the **content** and **name** keys of your stories!

### 3. With conditions

What if we had **no stories to show**? An empty page wouldn't be so nice! 😱

We can use the [`WX:IF`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/conditional.html) control attribute to anticipate this case.

- Make a card with a welcome message: "*There's nothing here yet!*"
- Render this card IF if the ``stories`` array is empty!

👉 Tip: an empty array has a length equal to 0

