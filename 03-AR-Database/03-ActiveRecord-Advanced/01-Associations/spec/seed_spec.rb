require_relative "spec_helper"
require_relative "../app/models/post"
begin
  require_relative "../app/models/user"
rescue LoadError
end

describe "Seed" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  def seed
    load "#{__dir__}/../db/seeds.rb"
  end

  it "should insert 5 users and between 5 and 10 posts per user" do
    seed
    expect(Post.count).to be <= 50
    expect(Post.count).to be >= 25

    User.all.each do |user|
      expect(user.posts.count).to be >= 5
      expect(user.posts.count).to be <= 10
    end
  end

  it "should insert posts with a user set. A post with a nil user is not valid!" do
    seed
    if Post.count == 0
      fail NotImplementedError, "Seed not yet implemented"
    end
    Post.all.each do |post|
      expect(post.user).not_to be_nil
    end
  end
end
