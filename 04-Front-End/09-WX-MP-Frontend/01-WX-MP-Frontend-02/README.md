### Challenge 2:

- Create a new Story page
- Transform the Le Wagon UI card component or create your own card with WXSS
- Use your banner & card components to create a page to display a single story

Wireframe:
![](https://github.com/pitipon/MP-Lecture-Image/blob/master/challenge1.png?raw=true)

### Solution 2: Story Page

An example of the Le Wagon UI in action: [https://github.com/pitipon/MP-FMC-V1](https://github.com/pitipon/MP-FMC-V1)

### Practice 1:

- Store ‘Who is here?’ inside a text variable in the `index.js` page data
- Display the text inside the `index.wxml` page

### Solution Practice 1:

```js
//index.js
Page({
  data: {
    text: 'Who is here?'
  }
})
```

```xml
<!—index.wxml-->
<view>{{text}}</view>
```

### Practice 2:

- console.log the text stored in the data of the page with `onReady`
- Bonus: set the text to something different with `onReady` and `setData`

### Solution Practice 2:

```js
//index.js
Page({
  data: {
    text: ‘Who is here?’
  },
  onReady: function () {
    console.log(this.data.text)
  }
})
```

### Practice 3:

- Create a button on the landing page and use it to route to the stories page
- Bonus: create another button that changes the text on the landing page when clicked

[`navigateTo` documentation](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html#wxnavigatetoobject)

### Solution Practice 3:

```js
//index.js
goToStoriesPage: function() {
  wx.navigateTo({
    url: '/pages/stories/stories'
  })
}
```

```xml
<!-- index.wxml -->
<view>{{text}}</view>
<button bindtap="goToStoriesPage">Go to the Stories page</button>
```
