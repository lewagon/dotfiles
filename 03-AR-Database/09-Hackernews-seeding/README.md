A database full of data is much more fun, right?

So in this exercice, you will feed the cookbook database with data collected from [http://www.marmiton.org/](http://www.marmiton.org/)

## To do 

We added a new Rake task in the `Rakefile`

````
desc "populate the test database with sample data"
task "db:seed" do
  require APP_ROOT.join('db', 'seed.rb')
end
````

This rake task will execute the code in `db/seed.rb`


1. Write code in  `db/seed.rb` that collects recipes from [http://www.marmiton.org/](http://www.marmiton.org/) and store them in the database. The recipes must use at least one of the following ingredients: `boeuf, veau, thon, tomates, fraises, bar, merlu, pomme de terre, thon, epinard`

2. Execute this code with `rake db:seed`

3. To check that your data migration worked, write a query in `cookbook.rb` to get the 10 most difficult recipes.

4. Feed the database from `CSV`. For that write another program `csv_seed.rb` that reads the recipes of `db/recipes.csv` and store them in the database.


## Resources

CSV parser [http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html](http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html)
