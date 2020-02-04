## Background & Objectives

Emails are the lifeblood of any SaaS (software as a service) business, so it's super important to know how to manipulate them.

On most websites, they are the keys to create an account. If the email is misspelled, the user won't be able to retrieve his password. Also, as a marketer's point of view, you need to communicate with your users and maintain your contact database a reliable dataset of valid emails.


## Story

In this challenge, let's assume you're launching an application in a few weeks. You'll notify everyone with a great emailing campaign as soon as your website is online! In the meantime, you prepared a landing page to collect visitors' emails. 

![Scenario](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-scenario.svg?sanitize=true>)



## Specs


### Collect valid emails

![Collect valid emails](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step1.svg?sanitize=true>)

Your landing page is ready. You want to make sure the visitors leave a valid email with no errors.

Code the `valid?` function:
- it should return true if the email is valid, and false otherwise.
- identify the different parts of the email and code a regex to match the pattern of a classic email.
- code the regex yourself. You'll probably find a lot of advanced regex to match every email configuration on the web, but take time to code yours.


#### Pattern of an email address

Every email address is the association of a **username** with a **domain name**. It follows the pattern below:

![Pattern of an email address](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.svg?sanitize=true>)


##### About domain names

The Top Level Domain, also known as TLD are the last characters of the domain name, right after the **dot**, they can be chosen from a standard list. A very common one is `.com` for commercial website, but you may have heard about the other historical TLD, like `.net` and `.org`.

Main categories are:

- gTLD: generic top-level domains (such as `.com`, `.net`, `.org`)
- ccTLD: country code top level domain (such as `.fr`, `.de`, `.jp`)

But there are many [more](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)
 

### Clean the database

![Clean the database](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step2.svg?sanitize=true>)

Few days have passed and your database is already filled with some useful contacts. Your marketing team acquire more data from a professional to broaden the audience.
Before launching the emailing campaign, you'll clean the database and filter out any invalid email.

Code the `clean_database` function:
- the function takes an array of emails
- it should return an array of the valid emails only


### Build statistics

![Build statistics](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step3.svg?sanitize=true>)

Your landing page includes a very simple form to collect only contact emails. You don't know very much about your customers but you can infer some informations from the email addresses. You decide to make statistics about TLD (Top Level Domains).

Code the `group_by_tld` function:
- should return a Hash with the emails addresses grouped by TLD

Example:

```ruby
{
	com:	["julien@mdn.com"], 
	de:		["dimitri@berlin.de"],
	fr:		["kevin@yahoo.fr", "edward@gmail.fr"]
}

```


### Emailing campaign

![Emailing campaign](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step4.svg?sanitize=true>)

You're now working on the email text. You're thinking of adding a bit of personalisation. Starting an email by "Dear customer" doesn't sound good, you'd rather extract the username from the email and start by something like `Dear Seb`.

Code the `compose_email` function:
- extract the username, domain and TLD from the email
- return a Hash formatted as below

```ruby
{
	username: seb,
	domain: lewagon,
	tld: com
}
```


### (Optional) Translate with `locales`

The statistics you made about TLD reveal that many of your customers are from Germany and France. You order translations into those two languages. The translators came up to you with this:

```ruby
LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    cheers: "Cheers",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    cheers: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    cheers: "Prost",
    signature: "Das Team"
  }
}
```

Code the `compose_email_translated` function:
- extract the username, domain and TLD from the email
- infer the language of the user from the TLD
- replace the text parts with the corresponding translations 
- return a Hash formatted as below

```ruby
{
    username: seb,
    domain: lewagon,
    tld: com,
    subject: "Our website is online",
    body: "Come and visit us!",
    cheers: "Cheers",
    signature: "The Team"
}
```
