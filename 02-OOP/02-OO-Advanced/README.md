### Roadmap of the day

#### Set-up
Before starting the challenges, ensure you have a clean git status and that you have pulled upstream. Otherwise you may work on old versions of the challenges.

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

Ensure you're connected on Slack.

#### `01-Dessert-inheritance`
A simple challenge to make you understand inheritance in ruby.

#### `02-Instance-vs-class`
A challenge to malke you code class methods, i.e. method that will be called on the class directly, not on instances of the class. You should understand the difference (in the syntax, and conceptually) between instance methods and class methods.

#### `03-About-self`
A challenge that helps you understand what the keyword `self` represents when you call a method. This is called the context. The most important thing to remember: when used in an instance method, `self` references the receiver = the object on which the method is called.