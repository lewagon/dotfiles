require "scraper"

describe "#scrape_recipes" do
  it "should return an array of Paris recipes" do
    recipes = scrape_recipes("paris")
    verify_recipes(recipes)
  end

  it "should return an array of London recipes" do
    recipes = scrape_recipes("london")
    verify_recipes(recipes)
  end

  private

  def verify_recipes(recipes)
    expect(recipes).to be_a(Array), "The method should return an Array of Strings"
    expect(recipes.length).not_to eq 0
    expect(recipes.first).to be_a String
    expect(recipes.first.length).not_to eq 0
  end
end
