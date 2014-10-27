require_relative "../spec_helper"
begin
  require_relative "../../app/models/user"
rescue LoadError
end

describe "User" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  it "class should exist. If not, you haven't defined your model class yet" do
    expect(defined?(User)).to eq "constant"
  end

  it "should allow to retrieve all posts from the database" do
    if defined?(User)
      posts = nil
      expect { users = User.all }.not_to raise_error, "Missing something in your class declaration maybe? Tip: inheritance"
      expect(posts).to eq []
    else
      raise "Fix the first test before paying attention to this one"
    end
  end

  it "has many posts" do
    if defined?(User)
      user = User.new(username: "george", email: "george@abitbol.me")
      user.save
      post = Post.new(name: "Le Wagon", url: "http://www.lewagon.org", user: user)
      post.save

      expect(User.last.posts).to eq([Post.last])
    else
      raise "Fix the first test before paying attention to this one"
    end
  end
end