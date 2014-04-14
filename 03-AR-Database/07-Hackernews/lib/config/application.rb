require 'sqlite3'
require 'active_record'

ActiveRecord::Base.configurations = YAML::load(IO.read(File.join(File.dirname(__FILE__),'database.yml')))
ActiveRecord::Base.establish_connection('development')


# Migrations
# Create the migration for the Recipe table
unless ActiveRecord::Base.connection.tables.include? "recipes"
  ActiveRecord::Schema.define do
    create_table :recipes do |t|
      # your code here to create the schema of the Recipes table  
    end
  end
end