## Background & Objectives

Can you judge someone's computer skills by just looking at their email address?
Well, The Oatmeal [thinks so](http://theoatmeal.com/comics/email_address)!

Emails are the lifeblood of any SaaS (software as a service) business, so it's super important to know how to manipulate them.

## Specs

Write a function `mail_joke` taking one argument (the email to judge), and
returning the judging sentence. For instance:

```ruby
mail_joke("boris@lewagon.org")
#=> "Well done boris, you're skilled and capable"
```

It must `raise` an
[`ArgumentError`](http://www.ruby-doc.org/core-2.4.0/ArgumentError.html) if the
first argument passed is not an email.

It must correctly handle any email with an unknown domain.

The `spec/mail_joke_spec.rb` requires you to implement three jokes, but feel free to add more and use your imagination!

## Further suggestions & resources

- How are you going to store the list of jokes?
- You need to *extract* the first name and last name from the email
- You may need a [`Regexp`](http://www.ruby-doc.org/core-2.4.0/Regexp.html)
- Don't forget about [Rubular](http://rubular.com/)!
