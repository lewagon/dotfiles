require_relative "spec_helper"
require_relative "../app/models/post"

describe "Seed" do
  before(:each) do
    create_db
    migrate
  end

  after(:each) { drop_db }

  it "should insert 10 posts in the database from the Hacker News API" do
    require "#{__dir__}/../db/seeds.rb"
    expect(Post.count).to eq 10
  end
end
