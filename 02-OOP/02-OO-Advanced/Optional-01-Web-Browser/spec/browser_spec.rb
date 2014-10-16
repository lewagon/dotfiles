require "browser"

describe "Browser" do
  let (:browser) { Browser.new }

  it "should implement a fetch_content method" do
    expect(browser).to respond_to :fetch_content
  end

  describe "#fetch_content" do
    let(:content) { browser.fetch_content("http://www.perdu.com") }

    it "should return a string for http://www.perdu.com" do
      expect(content).to match /Perdu sur l'Internet/
    end

    it "should not contain HTML tags" do
      expect(content).not_to match /<body>/
    end
  end
end
