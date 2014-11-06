require_relative "../../app/models/user"
require "sqlite3"

db_file_path = File.join(File.dirname(__FILE__), "../support/users_spec.db")
DB = SQLite3::Database.new(db_file_path)

describe User do

  before(:each) do
    DB.execute('DROP TABLE IF EXISTS `users`;')
    create_statement = "
    CREATE TABLE `users` (
      `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
      `first_name` TEXT,
      `last_name` TEXT
    );"
    DB.execute(create_statement)
  end

  describe "self.find (class method)" do
    before do
      DB.execute("INSERT INTO `users` (first_name, last_name) VALUES ('George', 'Abitbol')")
    end

    it "should return nil if user not found in database" do
      expect(User.find(42)).to be_nil
    end

    it "should load a user from the database" do
      user = User.find(1)
      expect(user).to_not be_nil
      expect(user).to be_a User
      expect(user.id).to eq 1
      expect(user.first_name).to eq 'George'
      expect(user.last_name).to eq 'Abitbol'
    end

    it "should resist SQL injections" do
      id = '(DROP TABLE IF EXISTS `users`;)'
      user = User.find(id)  # Inject SQL to delete the users table...
      expect { User.find(1) }.not_to raise_error
      expect(User.find(1).first_name).to eq 'George'
    end
  end

  describe "self.all (class method)" do
    before do
      DB.execute("INSERT INTO `users` (first_name, last_name) VALUES ('George', 'Abitbol')")
      DB.execute("INSERT INTO `users` (first_name, last_name) VALUES ('Peter', 'Steven')")
    end

    it "should load a user from the database" do
      users = User.all
      expect(users.length).to eq 2
      expect(users).to be_a Array
      expect(users.first).to be_a User
      expect(users.first.first_name).to eq 'George'
      expect(users.last.first_name).to eq 'Peter'
    end
  end

  describe "save" do
    it "should *insert* the user if it has just been instantiated (User.new)" do
      user = User.new(first_name: "George")
      user.save
      user = User.find(1)
      expect(user).not_to be_nil
      expect(user.id).to eq 1
      expect(user.first_name).to eq "George"
    end

    it "should *update* the user if it already exists in the DB" do
      DB.execute("INSERT INTO `users` (first_name, last_name) VALUES ('George', 'Abitbol')")
      user = User.find(1)
      user.last_name = "Abitbol, Classe man!"
      user.save
      user = User.find(1)
      expect(user.last_name).to eq("Abitbol, Classe man!")
    end

    it "should set the @id when inserting the user the first time" do
      user = User.new(first_name: "George")
      user.save
      expect(user.id).to eq 1
    end
  end

  describe "destroy" do
    it "should delete the user from the Database" do
      user = User.new(first_name: "George")
      user.save
      expect(User.find(1)).not_to be_nil
      user.destroy
      expect(User.find(1)).to be_nil
    end
  end

end