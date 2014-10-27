require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

desc "Look for style guide offenses in your code"
task :rubocop do
  sh "rubocop --format simple || true"
end

task default: [:rubocop, :spec]

## Active Record related rake tasks

require_relative 'config/application'

namespace :db do
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
    ActiveRecord::Migrator.migrations_paths << File.dirname(__FILE__) + 'db/migrate'
    ActiveRecord::Migration.verbose = true
    version = ENV['VERSION'] ? ENV['VERSION'].to_i : nil
    ActiveRecord::Migrator.migrate(ActiveRecord::Migrator.migrations_paths, version)
  end

  desc 'Retrieves the current schema version number'
  task :version do
    puts "Current version: #{ActiveRecord::Migrator.current_version}"
  end

  desc 'populate the database with sample data'
  task :seed do
    Dir["#{__dir__}/app/models/*.rb"].each {|file| require file }
    require "#{__dir__}/db/seeds.rb"
  end

  private

  def db_path
    ActiveRecord::Base.configurations["development"]["database"]
  end
end
