## Background & Objectives

Emails are the lifeblood of any SaaS (software as a service) business, it is super important to know how to manipulate them programmatically.

On most websites, they are the keys to create an account. If the email is misspelled, the user won't be able to retrieve his password. Also, as a marketer's point of view, you need to communicate with your users and maintain your contact database a reliable dataset of valid emails.


## Story
In this challenge, let's assume you are launching an application in a few weeks. You will notify everyone with a great emailing campaign as soon as your website is online! In the meantime, you prepared a landing page to collect visitors' emails.

![Scenario](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-scenario.svg?sanitize=true)


## Specs
### Collect valid emails

![Collect valid emails](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step1.svg?sanitize=true)

Your landing page is ready. You want to make sure the visitors submit a valid email.

Code the `valid?` method that returns the right boolean depending on the email's validity:
- identify the different parts of the email and code a regular expression to match the pattern of a classic email
- code a simple regexp yourself, no need to try and make it perfect (it is impossible to write a perfect regex for emails)!

**Warning:** Regular expressions are not expressive enough to validate 100% of the compliant email addresses as [this Stackoverflow discussion](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression) and [this website](https://emailregex.com/) illustrate. In professional environments, prefer the use of external services like the one provided by [Sendgrid](https://sendgrid.com/solutions/email-api/email-address-validation-api/) or [Mailgun](https://www.mailgun.com/email-validation/) as it uses a huge database and machine learning to determine if an address is correct.


#### Pattern of an email address

Every email address is the association of a **username** with a **domain name**. It follows the pattern below:

![Pattern of an email address](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.svg?sanitize=true)


##### About domain names

The Top Level Domain, also known as TLD is the last group of characters of the domain name, right after the **dot**, and can be chosen from a standard list. A very common one is `.com` for commercial website, but you may have heard about the historical TLDs, like `.net` and `.org`.

Main categories are:

- gTLD: generic top-level domains (such as `.com`, `.net`, `.org`)
- ccTLD: country code top level domain (such as `.fr`, `.de`, `.jp`)

But there are [many more](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)


### Clean the database

![Clean the database](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step2.svg?sanitize=true)

A few days have passed and your database is already filled with some useful contacts. Your marketing team acquires more data from a professional to broaden the audience. Before launching the emailing campaign, you need clean the database and filter out any invalid email.

Code the `clean_database` method:
- it takes an array of emails
- it returns an array with valid emails only


### Build statistics

![Build statistics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step3.svg?sanitize=true)

Your landing page includes a very simple form to collect only contact emails. You don't know much about your customers but you can infer some informations from the email addresses. You decide to make statistics about TLDs (Top Level Domains).

Code the `group_by_tld` method that returns a Hash with the emails addresses grouped by TLD.

Example:

```ruby
{
  com:	["julien@mdn.com"],
  de:	["dimitri@berlin.de"],
  fr:	["kevin@yahoo.fr", "edward@gmail.fr"]
}
```


### Emailing campaign

![Emailing campaign](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step4.svg?sanitize=true)

You are now working on the email's body and want it to be customised. Starting an email by "Dear customer" doesn't sound good, you'd rather extract the username from the email and start it with "Dear Seb".

Code a `compose_email` method that:
- extracts the username, domain and TLD from the email
- returns a `Hash` formatted as below:

```ruby
{
  username: seb,
  domain: lewagon,
  tld: com
}
```

### (Optional) Translate with `locales`

The statistics you made about TLDs reveal that many of your customers are from Germany and France. You order translations into those two languages. The translators provided you with this:

```ruby
LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    closing: "See you soon",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    closing: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    closing: "Bis bald",
    signature: "Das Team"
  }
}
```

Code the `compose_translated_email` method:
- extract the username, domain and TLD from the email
- infer the language of the user from the TLD
- replace the text parts with the corresponding translations
- return a `Hash` formatted as below

```ruby
{
  username: seb,
  domain: lewagon,
  tld: com,
  subject: "Our website is online",
  body: "Come and visit us!",
  closing: "See you soon",
  signature: "The Team"
}
```
