require_relative "../../app/models/post"
require "sqlite3"

db_file_path = File.join(File.dirname(__FILE__), "../support/posts_spec.db")
DB = SQLite3::Database.new(db_file_path)

describe Post do

  before(:each) do
    DB.execute('DROP TABLE IF EXISTS `posts`;')
    create_statement = "
    CREATE TABLE `posts` (
      `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
      `title` TEXT,
      `url` TEXT,
      `votes`  INTEGER
    );"
    DB.execute(create_statement)
  end


  describe "destroy" do
    before do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Hello world')")
    end

    it "should remove the post from the database" do
      post = find(1)
      post.destroy
      expect(find(1)).to be_nil
    end
  end

  def find(id)
    DB.results_as_hash = true
    first_row = DB.execute("SELECT * FROM posts WHERE id = ?", id).first
    build_record(first_row) if first_row
  end

  def build_record(row)
    attributes = {
      id: row["id"],
      url: row["url"],
      votes: row["votes"],
      title: row["title"]
    }
    Post.new(attributes)
  end

end