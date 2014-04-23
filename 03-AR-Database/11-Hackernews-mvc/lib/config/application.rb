require 'pathname'
require 'sqlite3'
require 'active_record'
require 'logger'
require 'open-uri'
require 'Nokogiri'
require 'faker'

APP_ROOT = Pathname.new(File.expand_path(File.join(File.dirname(__FILE__), '..')))

APP_NAME = APP_ROOT.basename.to_s

DB_PATH  = APP_ROOT.join('db', "cookbook.sqlite3").to_s

# Automatically load every file in APP_ROOT/app/models/*.rb, e.g.,
# autoload "Person", 'app/models/person.rb'
#
# See http://www.rubyinside.com/ruby-techniques-revealed-autoload-1652.html

Dir[APP_ROOT.join('app', 'models', '*.rb')].each do |model_file|
  filename = File.basename(model_file).gsub('.rb', '')
  autoload ActiveSupport::Inflector.camelize(filename), model_file
end


ActiveRecord::Base.logger = Logger.new(STDOUT)
ActiveRecord::Base.configurations = YAML::load(IO.read(File.join(File.dirname(__FILE__),'database.yml')))
ActiveRecord::Base.establish_connection('development')