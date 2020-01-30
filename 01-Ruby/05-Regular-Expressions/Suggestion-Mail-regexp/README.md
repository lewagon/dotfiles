## Background & Objectives

Emails are the lifeblood of any SaaS (software as a service) business, so it's super important to know how to manipulate them.

On most websites, they are the keys to create an account. If the email is misspelled, the user won't be able to retrieve to use the features to retrieve password. Also, as an administrator or marketer's point of view, you'll likely need to contact your users, and keep your contact database a reliable dataset of valid emails.
Therefore, it's more than important to check they are valid right away.


## Story

In this challenge, let's assume you're launching a great application in a few weeks. In the meantime, you prepared a landing page, where visitors can leave their email. You'll be launching a great emailing campaign to notify them when your website is online!

![Scenario](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email_scenario.png>)



## Specs


### 1 - Collect valid emails

Your landing page is ready. You want to make sure the visitors leave a valid email with no errors.

Code the `valid?`function:
- it should return true if the email is valid and false otherwise
- identify the different parts of the email and code a regex to match the pattern of a classic email
- code the regex yourself, you'll probably find a lot of advanced patterns to match every email configuration on the web, but take time to code yours


### 2 - Clean a database

Few days have passed and your database is already filled with some useful contacts. Your marketing team hire more data from a professional to broaden the audience.
Before launching the emailing campaign, you'll clean the database and filter out any invalid email.

Code the `clean_database` function:
- the function takes an array of emails
- it should return an array of the valid emails only


### 3 - Build statistics

Your landing page includes a very simple form to collect only contact emails. You don't know very much about your customers but you can infer some informations from the email addresses. You decide to make statistics about TLD.

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

**Code Hint:**
You can use group_by with a regex


### 4 - Launch your emailing campaign

You're now working on the email text, you'd like to add personalisation. Starting by "Dear customer" doesn't sound good. You'd rather extract the username from the email and start by something like `Dear seb`.

Code the `compose_email` function:
- extract the username, domain and TLD from the email
- return a Hash formatter as below

```ruby
{
	username: seb,
	domain: lewagon,
	tld: com
}
```


### (Optional) Translate with `locales`

The statistics you made about TLD reveal that many of your customers are from Germany and France. You order translations into those two languages. The translators sent you this:

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
- return a Hash formatter as below

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



## Further suggestions & resources

#### Anatomy of an email address

![Anatomy of an email address](<https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.png>)


An email is always related to a domain name. Before the **@** is the username, and after the **@** is the domain name.
Domain names are addresses of websites, owned by people or organisations. They can be registered from providers, who act like resellers. They give you the ability to use a domain for a given time. They are many providers all around the globe.
[ICANN](https://www.icann.org) is a non-profit organisation, responsible of maintain 

TLD are the last 
- gTLD: generic top-level domains (such as `.com`, `.net`, `.org`)
- ccTLD: country code top level domain (such as `.fr`, `.de`, `.jp`)
 but there are more


### About domain names

Every server on the Internet is identified with a unique IP address (which is a subset a figure like 192.168.0.0). But those addresses are too difficult to remember for real people like us. That's where domain names come in! They are easy to remember. All over the world, DNS servers will make it match with the IP and redirect you to the server.

- [What Does ICANN Do?](https://www.icann.org/resources/pages/what-2012-02-25-en)