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

    it "should not *update* the post and *create* a new post at the same time" do
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
