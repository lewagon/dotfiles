### Your take away:

You should be able to ship a WeChat Mini Program today similar to "F** My Code" in the lecture

**Challenges**

1. Create a Landing Page
2. Create a View Page
3. Improve Our View page

**Advanced Challenges**

4. Create a Post Page

Optionals:  Practice WeChat Functions with WeChat API

### Challenge 1:
- Create a new WeChat Mini Program with customized navbar and background color
- Create a Landing page
- Transform the Banner Component from Le Wagon UI into the Landing Page

### Solution 1: Landing Page

```html
<view class="banner" style="background-image: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%), url('https://kitt.lewagon.com/placeholder/cities/ berlin');">
<view class="banner-content">
  <view class='title'>Fuck my code</view>
  <text class='teaser'>Fighting with bugs everyday</text>
  <view class='margin'/>
    <button>Start now</button>
  </view>
</view>
```

Don't copy-paste solution or you won't learn as much as you could! Do the challenge on your own and adapt it to your own UI design!

### Challenge 2:

- Create a new Story page
- Transform the Le Wagon UI card component or create your own card with WXSS
- Use your banner & card components to create a page to display a single story

Wireframe:
![](https://github.com/pitipon/MP-Lecture-Image/blob/master/challenge1.png?raw=true)

### Solution 2: Story Page

An example of the Le Wagon UI in action: [https://github.com/pitipon/MP-FMC-V1](https://github.com/pitipon/MP-FMC-V1)

### Practice 1:

- Store ‘Who is here?’ inside a text variable in the index.js page data
- Display the text inside the index.wxml page

### Solution Practice 1:
```js
//index.js
Page({
  data: {
    text: 'Who is here?'
  }
})

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

[navigateTo documentation](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html#wxnavigatetoobject)

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

### Challenge 3
- Create a new key in stories data called titles
- The titles key is an array that contains the name of your stories
- Use wx:for to display the name of your stories

### Solution Challenge 3:
[Go to this Repo](https://github.com/pitipon/MP-FMC-V2). Again, rather than copy code,  create your own solution!

### Challenge 4
Wireframe:
  ![](https://github.com/pitipon/MP-Lecture-Image/blob/master/challenge2.png?raw=true)
- Store the FMC Stories given to you into `globalData`
- Use `wx:for` to show all the FMC Stories on the stories page
- Design Post Page (consult WeChat UI elements)
- Create the Post page (e.g. /pages/post/post)
- Use the JSON files to create 2 tabs in the app tab bar (Home page, Post Page)
- Add an input form into the Post page
- Create submit button to create a new story
- Save the new story into the global data

### Optional Challenge 1
- When a user submits a new FMC story, save the stories from globalData into the phone storage
- When the app launches, retrieve the stories from local storage

### Optional Challenge 2
- Find a way to access the wechat user info
- Display the avatar of the wechat user somewhere in the app

### Solutions of all the challenges
Try the challenge without copying code from solutions!
Learn by trial and error and learn to hack together a solution from all you've learned today - it will be very rewarding!

- [Solution for challenges 1&2](https://github.com/pitipon/MP-FMC-V1)
- [Solution for challenge 3](https://github.com/pitipon/MP-FMC-V2)
- [Solution for challenge 4](https://github.com/pitipon/MP-FMC-V3)