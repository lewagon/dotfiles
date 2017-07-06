require_relative "../config/application"
ActiveRecord::Base.logger = nil

def migrate(version = nil)
  ActiveRecord::Migration.verbose = false
  ActiveRecord::Migrator.migrations_paths << File.expand_path(File.dirname(__FILE__), '../db/migrate')
  ActiveRecord::Migrator.migrate(ActiveRecord::Migrator.migrations_paths, version)
end

def create_db
  `rm -rf #{ActiveRecord::Base.configurations["test"]["database"]}`
  ActiveRecord::Base.establish_connection(:test)
end

def drop_db
  `rm -rf #{ActiveRecord::Base.configurations["test"]["database"]}`
end
