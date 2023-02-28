require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

require_relative 'config/application'

desc 'Look for style guide offenses in your code'
task :rubocop do
  sh 'rubocop --format simple || true'
end

task default: [:rubocop, :spec]

desc 'Open an irb session preloaded with the environment'
task :console do
  require 'rubygems'
  require 'pry'

  Pry.start
end

## Active Record related rake tasks
db_namespace = namespace :db do
  desc 'create the database'
  task :create do
    puts "Creating #{db_path}..."
    touch db_path
  end

  desc 'drop the database'
  task :drop do
    puts "Deleting #{db_path}..."
    rm_f db_path
  end

  desc 'migrate the database (options: VERSION=x).'
  task :migrate do
    require_relative "../../utils"
    FullStackChallengesUtils.rake_migrate(db_namespace, File.dirname(__FILE__))
  end

  desc 'Retrieves the current schema version number'
  task :version do
    puts "Current version: #{ActiveRecord::Migrator.current_version}"
  end

  desc 'populate the database with sample data'
  task :seed do
    require "#{__dir__}/db/seeds.rb"
  end

  desc 'Gives you a timestamp for your migration file name'
  task :timestamp do
    puts DateTime.now.strftime('%Y%m%d%H%M%S')
  end

  namespace :schema do
    desc 'Create a db/schema.rb file that can be portably used against any DB supported by AR'
    task :dump do
      require 'active_record/schema_dumper'
      filename = 'db/schema.rb'

      File.open(filename, "w:utf-8") do |file|
        ActiveRecord::SchemaDumper.dump(ActiveRecord::Base.connection, file)
      end
    end
  end

  private

  def db_path
    if ActiveRecord.version.to_s >= "6.1"
      ActiveRecord::Base.configurations.configs_for(env_name: 'development', name: 'primary').database
    else
      ActiveRecord::Base.configurations['development']['database']
    end
  end
end
