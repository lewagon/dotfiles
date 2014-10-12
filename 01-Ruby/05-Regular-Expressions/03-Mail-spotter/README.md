## Background & Objectives

Can you judge someone's computer skills only looking at their email address
Well, The Oatmeal [thinks so](http://theoatmeal.com/comics/email_address)!

Emails are the lifeblood of any SaaS service, so it is very important to
know how to manipulate them.

## Specs

Write a function `mail_joke` taking one argument (the email to judge), and
returning the judging sentence. For instance:

```ruby
mail_joke("boris@lewagon.org")
#=> "Well done boris, you're skilled and capable"
```

It must `raise` an
[`ArgumentError`](http://www.ruby-doc.org/core-2.1.2/ArgumentError.html) if the
first argument passed is not a string.

It must handle correctly email with domains it does not know about.

The `spec/mail_joke_spec.rb` requires you to implement three jokes, feel
free to add more and use your imagination!

## Tips & Resources

- How will you store the list of jokes?
- You need to *extract* the first name and last name from the email
- You may need a [`Regexp`](http://www.ruby-doc.org/core-2.1.2/Regexp.html)
- Have you heard of [Rubular](http://rubular.com/). Great in-browser regex sandbox
