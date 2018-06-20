require_relative "../spec_helper"
begin
  require_relative "../../app/models/post"
rescue LoadError
end

describe "Post" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  it "class should exist. If not, you haven't defined your model class yet" do
    expect(defined?(Post)).to eq "constant"
  end

  it "should allow to retrieve all posts from the database" do
    if defined?(Post)
      posts = nil
      expect { posts = Post.all }.not_to raise_error, "Missing something in your class declaration maybe? Hint: inheritance"
      expect(posts).to eq []
    else
      raise "Fix the first test before paying attention to this one"
    end
  end
end
