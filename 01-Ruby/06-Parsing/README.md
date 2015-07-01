### Roadmap of the day

#### Disclaimer

Today, the "ReBoot" group should keep working on simple challenges to master core notions. Don't be disappointed! You'll be able to parse and store data later on in you ruby life. For the others, here's the roadmap.

#### Parsing

As a developer, you will often have to manipulate structured data files such as CSV, JSON, HTML. Some examples: 

- CRM systems as Mailchimp allow you to export CSV files (e.g. lists of emails)
- most common web APIs return JSON files  
- all websites return HTML files accessible thanks to their URL.

Knowing to read these files and transform them into friendly ruby objects (array, hash) is really convenient. This is what developers call **parsing**. Parsing HTML files has its little nickname: it's called **scraping**. You may want to parse files for many reasons:

- Populate your initial database with cool real-life data
- Build growth hacking scripts by parsing files containing emails, twitter username, etc..

#### `01-CSV-parsing`
A challenge to make you parse a CSV file of american movies and find most successful blockbusters.

#### `02-Numbers-and-letters`
A sophisticated challenge. You have to re-code the french game "Des chiffres et des lettres" that gives you a random grid of letters and ask you to find the longest word in this grid. To decide whether a word exists or not, we'll make use of the WordReference API that responds "a JSON file of various translations" for any given word.

#### `Optional-Your-first-scraper`
A useful challenge to scrape your first HTML file from etsy.com.
