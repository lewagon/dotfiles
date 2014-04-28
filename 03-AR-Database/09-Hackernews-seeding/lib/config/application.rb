require 'sqlite3'
require 'active_record'
require 'pathname'
require 'nokogiri'
require 'faker'
require 'open-uri'
require 'yaml'

# gets root of current directory
APP_ROOT = Pathname.new(File.expand_path(File.join(File.dirname(__FILE__), '..')))

# loads the yml database config file
DB_CONFIG = YAML::load(IO.read(File.join(File.dirname(__FILE__),'database.yml')))

# gets the path of the database
DB_PATH =  APP_ROOT.join(DB_CONFIG["development"]["database"])

ActiveRecord::Base.configurations = DB_CONFIG
ActiveRecord::Base.establish_connection('development')


