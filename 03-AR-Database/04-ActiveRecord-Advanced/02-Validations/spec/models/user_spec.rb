require_relative "../spec_helper"
require_relative "../../app/models/user"

describe "User" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  it "should be invalid if there is no username" do
    user = User.new(email: "george@abitbol.me")
    expect(user.valid?).to eq false
    expect(user.errors.messages[:username]).to include "can't be blank"
  end

  it "should be invalid if there is no email" do
    user = User.new(username: "george")
    expect(user.valid?).to eq false
    expect(user.errors.messages[:email]).to include "can't be blank"
  end

  it "should be invalid if the email does not have the right format" do
    user = User.new(username: "george", email: "not_an_email")
    expect(user.valid?).to eq false
    expect(user.errors.messages[:email]).to include "invalid email"
  end

  it "should be invalid if another user already took this username" do
    user_one = User.new(username: "bob", email: "bob@leponge.me")
    user_one.save!

    user_two = User.new(username: "bob", email: "anotherbob@leponge.me")
    expect(user_two.valid?).to eq false
    expect(user_two.errors.messages[:username]).to include "has already been taken"
  end

  it "should strip leading and trailing spaces from email before saving to DB" do
    if User.new(username: "bob", email: "NOT_A_VALID_EMAIL").valid?
      fail NotImplementedError, "Please implement a format validation on email column"
    end
    user = User.new(username: "bob", email: "   bob@leponge.me   ")
    expect(user.valid?).to eq(true)
    expect(user.email).to eq("bob@leponge.me"), message: "You should have a `before_validation` callback to strip whitespaces"
  end

end