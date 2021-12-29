require "buddy"

describe "#today_my_buddys_github_nickname_is" do
  it "should not take any parameters" do
    expect(method(:today_my_buddys_github_nickname_is).arity).to eq(0)
  end

  let(:buddy) { today_my_buddys_github_nickname_is }

  it "should not return blank" do
    expect(buddy).not_to be_nil
    expect(buddy).not_to eq("")
  end

  it "should return a real GitHub username" do
    expect(buddy).not_to be_nil
    expect(buddy).not_to eq("")

    require "open-uri"
    expect { URI.open("https://github.com/#{buddy}").read }.not_to raise_error,
      "The buddy '#{buddy}' you returned is not a valid GitHub nickname (check case)"
  end
end
