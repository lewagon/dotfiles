If the majority of your backend is working and you haven't pimped out your seeds yet, now is the time. Having plenty of well-thought-out, realistic data in your app will make it seem that much more legit. Using a gem like faker is great and creating them all from scratch is even better but is too time-consuming.

### Have you thought about using an API?

There's pretty much an API for everything at this point, try searching Google to check if there's a dataset that would fit your use-case.

For example the [JSON placeholder API](https://jsonplaceholder.typicode.com/) provides endpoints for [users](https://jsonplaceholder.typicode.com/users), [photos](https://jsonplaceholder.typicode.com/photos), [posts](https://jsonplaceholder.typicode.com/posts), [comments](https://jsonplaceholder.typicode.com/comments), [albums](https://jsonplaceholder.typicode.com/albums) and [todos](https://jsonplaceholder.typicode.com/todos)!

If you cannot find the type of data you need on your search engine, you can explore the [Any API](https://any-api.com/) catalog, or even create your own JSON with [Mockaroo](https://www.mockaroo.com/)!

Then you can use [this lecture code](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/05-Rails%2F09-Airbnb-SMTP#/0/1/3) as a reference for how to import and use the data to create instances of your models in your seeds file.
