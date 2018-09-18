require "buddy"

describe "#buddy" do

  let(:buddy) { today_my_buddys_github_nickname_is }

  it "should not be blank and be a real github username" do
    expect(buddy).not_to be_nil
    expect(buddy).not_to eq('')

    require "open-uri"
    expect { open("https://github.com/#{buddy}").read }.not_to raise_error,
      "The buddy '#{buddy}' you returned is not a valid github nickname (check case)"
  end
end
