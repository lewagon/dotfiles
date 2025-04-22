## Background & objectives

Each time you restart your application, your post data disappears! To retain the information, we need to save it in our user's **phone cache**.

## Specs

- When a user submits a new FMC story, save the stories into the the phone cache. Check out the [setStorage API documentation](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxsetstoragesynckeydata) to find out how.
- Inspect the phone cache using the console ("debugger") **"Storage"** tab!
- When the app launches or when the page shows, get the stories from the cache storage and load them in local data *. Check out the [getStorage API documentation](https://developers.weixin.qq.com/miniprogram/en/dev/api/data.html#wxgetstoragesynckey
).* _Tip: Tencent provided a use case of cache storage, directly at the `onLaunch` of your App ;)_
