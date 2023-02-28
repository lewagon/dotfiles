require_relative "../spec_helper"
require_relative "../../app/models/post"
begin
  require_relative "../../app/models/user"
rescue LoadError
end

describe "Post" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  it "belongs to a User" do
    if defined?(User)
      user = User.new(username: "george", email: "george@abitbol.me")
      user.save
      post = Post.new(title: "Le Wagon", url: "http://www.lewagon.com", user: user)
      post.save

      expect(Post.last.user).to eq(User.last)
    else
      raise "Fix the User tests before paying attention to this one"
    end
  end
end
