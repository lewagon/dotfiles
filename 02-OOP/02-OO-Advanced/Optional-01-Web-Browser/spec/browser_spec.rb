require "browser"

describe "Browser" do
  let (:browser) { Browser.new }

  it "should implement a fetch_content method" do
    expect(browser).to respond_to :fetch_content
  end

  describe "#fetch_content" do
    let(:content) { browser.fetch_content("http://www.motherfuckingwebsite.com/") }

    it 'should return a String' do
      expect(content).to be_kind_of(String)
    end

    it "should return a string for http://www.motherfuckingwebsite.com/" do
      expect(content).to match /This is a motherfucking website/
    end

    it "should not contain HTML tags" do
      expect(content).not_to match /<body>/
    end
  end
end
