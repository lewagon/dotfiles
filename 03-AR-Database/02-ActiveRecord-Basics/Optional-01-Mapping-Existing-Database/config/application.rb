require 'active_record'
require 'sqlite3'
require 'yaml'

# This is some boilerplate code to read the config/database.yml file
# and connect to the database
config_path = File.join(File.dirname(__FILE__), "database.yml")
ActiveRecord::Base.configurations = YAML.load_file(config_path)
ActiveRecord::Base.establish_connection(:development)

# This is some boilerplate code to require all your models
# when the console is launched
Dir["#{__dir__}/../app/models/*.rb"].each { |file| require file }

# Set a logger so that you can view the SQL actually performed by Active Record
logger = Logger.new($stdout)
logger.formatter = proc do |_severity, _datetime, _progname, msg|
  "#{msg}\n"
end
ActiveRecord::Base.logger = logger
