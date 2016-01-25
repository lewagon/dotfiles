## Background & Objectives

In this exercise, you're going to add some events to the given code to perform
a few animations. yay! \o/

We're giving you a nice landing page to work on, with a "pop-up" message at the
top.
Your job is to make this message show up when the page loads, and disappear when
we click it.


## Specs

Open the `application.js` file, add your code, and show us the result when you're
satisfied.

At minimum, your code should:

* Make the message slide down into place when the page loads
* Make the message slide up out of the page when it's clicked


Extra:

* To better catch the eye of the visitor, wait for half a second before sliding
the message down on page load!
* We've designed the message box in a kind of special way... see if you can improve
your code so that the message slides down again when the mouse is somewhere up around
the top of the page, and slides up to hide itself when the mouse goes away :)



To test your code, you can launch your local webserver:

```bash
$ serve
```

and open `http://localhost:8000` as usual.


## Tips

* Some animation functions won't do anything unless the element that should be
animated is in a certain state (shown or hidden for instance) before the animation
is called!
