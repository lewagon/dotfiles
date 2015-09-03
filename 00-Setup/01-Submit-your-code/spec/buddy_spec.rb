require "buddy"

describe "#buddy" do

  let(:buddy) { today_my_buddys_github_nickname_is }

  it "should not be blank" do
    expect(buddy).not_to be_nil
    expect(buddy).not_to eq('')
  end

  it "should be a real github user" do
    require "json"
    require "open-uri"
    expect { open("https://api.github.com/users/#{buddy}").read }.not_to raise_error,
      "The buddy '#{buddy}' you returned is not a valid github nickname"
  end

end
