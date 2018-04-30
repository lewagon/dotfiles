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

  describe "save" do
    it "should *insert* the post if it has just been instantiated (Post.new)" do
      post = Post.new(title: "Article 1")
      post.save
      post = find(1)
      expect(post).not_to be_nil
      expect(post.id).to eq 1
      expect(post.title).to eq "Article 1"
    end

    it "should set the @id when inserting the post the first time" do
      post = Post.new(title: "Article 1")
      expect(post.id).to be_nil
      post.save
      expect(post.id).to eq 1

      post = Post.new(title: "Article 2")
      expect(post.id).to be_nil
      post.save
      expect(post.id).to eq 2
    end

    it "should *update* the post if it already exists in the DB" do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      post = find(1)
      post.title = "Article 1 updated"
      post.save
      updated_post = find(1)
      expect(updated_post.title).to eq("Article 1 updated")
    end

    it "should only update the post that `save` was called on" do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1'), ('Article 2')")
      post = find(1)
      post.title = "Article 1 updated"
      post.save
      updated_post = find(1)
      other_post = find(2)
      expect(updated_post.title).to eq("Article 1 updated")
      expect(other_post.title).to eq("Article 2")
    end    

    it 'should not *update* the post and *create* a new post at the same time' do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      post = find(1)
      post.title = "Article 1 updated"
      post.save
      updated_post = find(1)
      second_post = find(2)
      expect(updated_post.title).to eq("Article 1 updated")
      expect(second_post).to be_nil
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
