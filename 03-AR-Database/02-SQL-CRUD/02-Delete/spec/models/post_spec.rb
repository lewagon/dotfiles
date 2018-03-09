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
      DB.execute("INSERT INTO `posts` (title) VALUES ('First post')")
      DB.execute("INSERT INTO `posts` (title) VALUES ('Second post')")
      DB.execute("INSERT INTO `posts` (title) VALUES ('Third post')")
    end

    it "should remove post from the database" do
      id = rand(1..3)
      post = find(id)
      post.destroy
      expect(find(id)).to be_nil
    end

    it "should not remove other posts from the database" do
      before_destroy_post_count = DB.execute("SELECT COUNT(*) FROM `posts`")[0][0]
      id = rand(1..3)
      post = find(id)
      post.destroy
      after_destroy_post_count = DB.execute("SELECT COUNT(*) FROM `posts`")[0][0]
      expect(before_destroy_post_count - after_destroy_post_count).to eq(1)
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
