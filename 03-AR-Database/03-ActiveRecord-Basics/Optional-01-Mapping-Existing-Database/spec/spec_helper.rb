require_relative "../config/application"
ActiveRecord::Base.logger = nil

def migrate(version = nil)
  require_relative "../../../utils"
  FullStackChallengesUtils.spec_helper_migrate(version, File.dirname(__FILE__))
end

def create_db
  `rm -rf #{ActiveRecord::Base.configurations["test"]["database"]}`
  ActiveRecord::Base.establish_connection(:test)
end

def drop_db
  `rm -rf #{ActiveRecord::Base.configurations["test"]["database"]}`
end

Dir["#{__dir__}/../app/models/*.rb"].each {|file| require file }
I18n.enforce_available_locales = false
