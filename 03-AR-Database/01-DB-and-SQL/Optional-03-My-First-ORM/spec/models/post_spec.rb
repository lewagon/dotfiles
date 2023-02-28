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

  describe "self.find (class method)" do
    before do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Hello world')")
    end

    it "should return nil if post not found in database" do
      expect(Post.find(42)).to be_nil
    end

    it "should load a post from the database" do
      post = Post.find(1)
      expect(post).to_not be_nil
      expect(post).to be_a Post
      expect(post.id).to eq 1
      expect(post.title).to eq 'Hello world'
    end

    it "should resist SQL injections" do
      id = '(DROP TABLE IF EXISTS `posts`;)'
      post = Post.find(id)  # Inject SQL to delete the posts table...
      expect { Post.find(1) }.not_to raise_error
      expect(Post.find(1).title).to eq 'Hello world'
    end
  end

  describe "self.all (class method)" do
    before do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 2')")
    end

    it "should load a post from the database" do
      posts = Post.all
      expect(posts.length).to eq 2
      expect(posts).to be_a Array
      expect(posts.first).to be_a Post
      expect(posts.first.title).to eq 'Article 1'
      expect(posts.last.title).to eq 'Article 2'
    end
  end

  describe "save" do
    it "should *insert* the post if it has just been instantiated (Post.new)" do
      post = Post.new(title: "Article 1")
      post.save
      post = Post.find(1)
      expect(post).not_to be_nil
      expect(post.id).to eq 1
      expect(post.title).to eq "Article 1"
    end

    it "should *update* the post if it already exists in the DB" do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      post = Post.find(1)
      post.title = "Article 1 updated"
      post.save
      post = Post.find(1)
      expect(post.title).to eq("Article 1 updated")
    end

    it "should set the @id when inserting the post the first time" do
      post = Post.new(title: "Article 1")
      post.save
      expect(post.id).to eq 1
    end
  end

  describe "destroy" do
    it "should delete the post from the Database" do
      post = Post.new(title: "Article 1")
      post.save
      expect(Post.find(1)).not_to be_nil
      post.destroy
      expect(Post.find(1)).to be_nil
    end
  end

end