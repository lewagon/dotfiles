require_relative "../spec_helper"
require_relative "../../app/models/post"
require_relative "../../app/models/user"

describe "Post" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  let(:valid_user) { User.new(username: "george", email: "george@abitbol.me") }

  it "is invalid if does not have a user" do
    post = Post.new(name: "Le Wagon", url: "http://www.lewagon.org")
    expect(post.valid?).to eq false
    expect(post.errors.messages[:user]).to include "can't be blank"
  end

  it "is invalid if does not have a name" do
    post = Post.new(user: valid_user, url: "http://www.lewagon.org")
    expect(post.valid?).to eq false
    expect(post.errors.messages[:name]).to include "can't be blank"
  end

  it "is invalid if does not have a url" do
    post = Post.new(name: "Le Wagon", user: valid_user)
    expect(post.valid?).to eq false
    expect(post.errors.messages[:url]).to include "can't be blank"
  end

  it "is invalid if the URL is not in the right format" do
    invalid_url = "THIS_IS_NOT_A_URI"
    post = Post.new(name: "Le Wagon", url: invalid_url, user: valid_user)
    expect(post.valid?).to eq false
    expect(post.errors.messages[:url]).to include "invalid url"
  end

  it "is valid if the URL is valid" do
    if Post.new(name: "aaaaaa", url: "invalid_url", user: valid_user).valid?
      fail NotImplementedError, "Please implement a format validation on url column"
    end
    post = Post.new(name: "Le Wagon", url: "http://www.lewagon.org", user: valid_user)
    expect(post.valid?).to eq true
  end

  it "is invalid if the name is too short (5 characters minimum)" do
    post = Post.new(name: "Le W", url: "http://www.lewagon.org", user: valid_user)
    expect(post.valid?).to eq false
    expect(post.errors.messages[:name]).to include "is too short (minimum is 5 characters)"
  end

  it "can't have the same name as another Post (case insensitive)" do
    post_one = Post.new(name: "Le Wagon", url: "http://www.lewagon.org/paris", user: valid_user)
    post_one.save

    post_two = Post.new(name: "Le wagon", url: "http://www.lewagon.org/bruxelles", user: valid_user)
    expect(post_two.valid?).to eq false
    expect(post_two.errors.messages[:name]).to include "has already been taken"
  end
end