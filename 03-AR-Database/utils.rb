class FullStackChallengesUtils
  def self.rake_migrate(db_namespace)
    ActiveRecord::Migrator.migrations_paths << File.dirname(__FILE__) + 'db/migrate'
    ActiveRecord::Migration.verbose = true
    version = ENV['VERSION'] ? ENV['VERSION'].to_i : nil
    args = [ActiveRecord::Migrator.migrations_paths]
    args << ActiveRecord::SchemaMigration if ActiveRecord.version.to_s >= "6.0.0"
    ActiveRecord::MigrationContext.new(*args).migrate(version)
    db_namespace["schema:dump"].invoke
  end

  def self.spec_helper_migrate(version, file)
    ActiveRecord::Migration.verbose = false
    ActiveRecord::Migrator.migrations_paths << File.expand_path(file, '../db/migrate')
    args = [ActiveRecord::Migrator.migrations_paths]
    args << ActiveRecord::SchemaMigration if ActiveRecord.version.to_s >= "6.0.0"
    ActiveRecord::MigrationContext.new(*args).migrate(version)
  end
end
