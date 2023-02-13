class FullStackChallengesUtils
  def self.rake_migrate(db_namespace, folder)
    ActiveRecord::Migrator.migrations_paths = [File.join(folder, 'db/migrate')]
    ActiveRecord::Migration.verbose = true
    version = ENV["VERSION"]&.to_i
    args = [ActiveRecord::Migrator.migrations_paths]
    args << ActiveRecord::SchemaMigration if ActiveRecord.version.to_s >= "6.0.0"
    ActiveRecord::MigrationContext.new(*args).migrate(version)
    db_namespace["schema:dump"].invoke
  end

  def self.spec_helper_migrate(version, folder)
    ActiveRecord::Migration.verbose = false
    ActiveRecord::Migrator.migrations_paths = [File.join(folder, '../db/migrate')]
    args = [ActiveRecord::Migrator.migrations_paths]
    args << ActiveRecord::SchemaMigration if ActiveRecord.version.to_s >= "6.0.0"
    ActiveRecord::MigrationContext.new(*args).migrate(version)
  end
end
