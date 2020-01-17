## Background & Objectives

Emails are the lifeblood of any SaaS (software as a service) business, so it's super important to know how to manipulate them.

On most sites, they are the keys to create an account. If the email is misspelled, the user won't be able to retrieve to use the features to retrieve password. Therefore, it more than important to check they are valid right away. Also, as a marketer's point of view, you'll likely need to write to your users useful information, you need to build a database with a way to contact your customers.

## Anatomy of an email address

An email is always related to a domain name. Before the **@** is the username, and after the **@** is the domain name.

![](<http://localhost:8000/email.png>)

### Domain names

Domain names are addresses of websites, owned by people or organisations. They can be registered from providers, who act like resellers. They give you the ability to use a domain for a given time. They are many providers all around the globe.
[ICANN](https://www.icann.org) is a non-profit organisation, responsible of maintain 

- gTLD: generic top-level domains (such as `.com`, `.net`, `.org`)
- ccTLD: country code top level domain (such as `.fr`, `.de`, `.jp`)
 but there are more


## Story

In this challenge, let's assume that you're launching a great application online in a few weeks. In the meantime, you prepared a landing page, where your prospects can leave their email to receive a notification on the day your website is online.

## Specs

### Check that an email is valid

You maybe already encountered this use case on the internet: when you fill a form with your email, the interface checks it right away and notify you if you've made a mistake. This is a good practice, keep it in mind for your future products!

Code the `valid?`function:
- it should return true if the email is valid and false otherwise
- identify the different parts of the email and code a regex to match the pattern of a classic email
- code the regex yourself, you'll probably find a lot of advanced patterns to match every email configuration on the web, but take time to code yours


### Cleaning a database

Few days have passed and your database is already filled with some mails. Before launching you emailing campaign, you'll clean your database and filter out any invalid email.

Code the `clean_database` function:
- the function takes an array of emails
- it should return an array of the valid emails only


### Statistics

Your landing page includes a very simple form to collect only emails. You don't know very much about your customers but you can infer some informations from the email addresses. You decide to make statistics about TLD.

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

```ruby
TODO

```

### Extract informations from an email

### Translate with `locales`

The statistics you made about TLD reveals that many of your customers are from Germany and France. You decide to order translations into those two languages. The translators sent you this:

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
``

### Launch your emailing campaign


## Further suggestions & resources
### How does it work ?

Every server on the Internet is identified with a unique IP address (which is a subset a figure like 192.168.0.0). But those addresses are too difficult to remember for real people like us. That's where domain names come in! They are easy to remember. All over the world, DNS servers will make it match with the IP and redirect you to the server.

- [What Does ICANN Do?](https://www.icann.org/resources/pages/what-2012-02-25-en)