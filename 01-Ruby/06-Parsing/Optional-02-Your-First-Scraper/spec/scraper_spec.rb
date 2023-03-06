require "scraper"

describe "#scrape_craiglist_antiques" do
  it "should return an array of Paris antiques" do
    antiques = scrape_craiglist_antiques("paris")
    verify_antiques(antiques)
  end

  it "should return an array of London antiques" do
    antiques = scrape_craiglist_antiques("london")
    verify_antiques(antiques)
  end

  private

  def verify_antiques(antiques)
    expect(antiques).to be_a(Array), "The method should return an Array of Strings"
    expect(antiques.length).not_to eq 0
    expect(antiques.first).to be_a String
    expect(antiques.first.length).not_to eq 0
  end
end
