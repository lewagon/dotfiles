
describe "creating the databse" do

  it "should have created a `development.sqlite3` file in the `db` folder" do
    expect(File.exists?("#{__dir__}/../db/development.sqlite3")).to eq(true)
  end
end

