require_relative "../config/application.rb"
ActiveRecord::Base.logger = nil


def migrate(version = nil)
  ActiveRecord::Migration.verbose = false
  ActiveRecord::Migrator.migrations_paths << File.expand_path(File.dirname(__FILE__), '../db/migrate')
  ActiveRecord::Migrator.migrate(ActiveRecord::Migrator.migrations_paths, version)
end

describe "Migration" do
  DB_PATH = ActiveRecord::Base.configurations["test"]["database"]

  before(:each) do
    `rm -rf #{DB_PATH}`
    ActiveRecord::Base.establish_connection(:test)
  end

  let(:db) do
    ActiveRecord::Base.connection
  end

  after(:each) do
    `rm -rf #{DB_PATH}`
  end

  describe "to create the `posts` table" do
    it "should have actually created the table, with the right columns" do
      migrate(20141025152200)

      now = Time.now.to_i
      expect { db.execute("
        INSERT INTO posts (name, url, created_at, updated_at)
        VALUES ('Le Wagon', 'http://www.lewagon.org', '#{now}', #{now})
      ") }.not_to raise_error

      post = db.execute("SELECT * FROM posts").first
      expect(post[0]).to eq 1  # id
      expect(post[1]).to eq "Le Wagon"
      expect(post[2]).to eq "http://www.lewagon.org"
    end
  end

  describe "to add a `votes` column to the `posts` table" do
    it "should have actually added the column" do
      migrate

      now = Time.now.to_i
      expect { db.execute("
        INSERT INTO posts (name, url, created_at, updated_at, votes)
        VALUES ('Le Wagon', 'http://www.lewagon.org', '#{now}', #{now}, 42)
      ") }.not_to raise_error

      post = db.execute("SELECT * FROM posts").first
      expect(post[0]).to eq 1  # id
      expect(post[1]).to eq "Le Wagon"
      expect(post[2]).to eq "http://www.lewagon.org"
      expect(post[5]).to eq 42
    end
  end
end

