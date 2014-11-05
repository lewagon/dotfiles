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

  it "should expose its id" do
    expect(Post.new(id: 1).id).to eq 1
  end

  it "should not allow the external world to change its id" do
    expect { Post.new({}).id = 2 }.to raise_error NoMethodError
  end

  it "should not allow the external world to directly change the number of votes" do
    expect { Post.new({}).vote += 1 }.to raise_error NoMethodError
  end

  it "should allow the external world to change the title" do
    post = Post.new({})
    expect { post.title = "Hello" }.not_to raise_error
    expect(post.title).to eq "Hello"
  end

  it "should allow the external world to change the url" do
    post = Post.new({})
    expect { post.url = "http://www.google.com" }.not_to raise_error
    expect(post.url).to eq "http://www.google.com"
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
    it "should return an empty array if database is empty" do
      posts = Post.all
      expect(posts).to eq []
    end

    it "should load a post from the database" do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 2')")

      posts = Post.all
      expect(posts.length).to eq 2
      expect(posts).to be_a Array
      expect(posts.first).to be_a Post
      expect(posts.first.title).to eq 'Article 1'
      expect(posts.last.title).to eq 'Article 2'
    end
  end

end