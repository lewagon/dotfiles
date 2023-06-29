require_relative "../../app/models/post"
require "sqlite3"

db_file_path = File.join(File.dirname(__FILE__), "../support/posts_spec.db")
DB = SQLite3::Database.new(db_file_path)

describe Post do
  before(:each) do
    DB.execute("DROP TABLE IF EXISTS `posts`;")
    create_statement = "
    CREATE TABLE `posts` (
      `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
      `title` TEXT,
      `url` TEXT,
      `votes`  INTEGER
    );"
    DB.execute(create_statement)
  end

  it "should accept title, url, votes as attributes" do
    url = "www.lewagon.com"
    title = "Le Wagon"
    votes = 9000
    post = Post.new(id: 1, url: url, title: title, votes: votes)
    expect(post.instance_variable_get(:@title)).to eq title
    expect(post.instance_variable_get(:@url)).to eq url
    expect(post.instance_variable_get(:@votes)).to eq votes
  end

  it "should reveal its id" do
    expect(Post.new(id: 1).id).to eq 1
  end

  it "should not allow the external world to change its id" do
    expect { Post.new({}).id = 2 }.to raise_error NoMethodError
  end

  it "should not allow the external world to change the number of votes directly" do
    expect { Post.new({}).votes += 1 }.to raise_error NoMethodError
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
      DB.execute("INSERT INTO `posts` (title, url, votes) VALUES ('Hello world', 'https://www.lewagon.com', 10000)")
    end

    it "should return a Post built with data from the database" do
      post = Post.find(1)
      expect(post).to_not be_nil
      expect(post).to be_a Post
      expect(post.id).to eq 1
      expect(post.title).to eq "Hello world"
    end

    it "should return nil if post is not found in database" do
      expect(Post.find(42)).to be_nil
    end

    it "should resist SQL injections" do
      id = "2' OR 1=1 --"
      post = Post.find(id) # SQL Injection to retrieve all posts.
      expect(post).to be_nil
    end
  end

  describe "self.all (class method)" do
    it "should return an array of Post built with data from the database" do
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 1')")
      DB.execute("INSERT INTO `posts` (title) VALUES ('Article 2')")

      posts = Post.all
      expect(posts.length).to eq 2
      expect(posts).to be_a Array
      expect(posts.first).to be_a Post
      expect(posts.first.title).to eq "Article 1"
      expect(posts.last.title).to eq "Article 2"
    end

    it "should return an empty array if the database is empty" do
      posts = Post.all
      expect(posts).to eq []
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
