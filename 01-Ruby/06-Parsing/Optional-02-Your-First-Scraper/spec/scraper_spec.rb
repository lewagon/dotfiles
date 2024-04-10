require "scraper"

describe "#scrape_recipes" do
  it "should return an array of chocolate recipes" do
    recipes = scrape_recipes("chocolate")
    verify_recipes(recipes)
  end

  it "should return an array of peanut recipes" do
    recipes = scrape_recipes("peanut")
    verify_recipes(recipes)
  end

  it "chocolate recipes should be different from peanut recipes" do
    chocolate_recipes = scrape_recipes("chocolate")
    peanut_recipes = scrape_recipes("peanut")
    expect(chocolate_recipes.join).not_to eq(peanut_recipes.join)
  end

  private

  def verify_recipes(recipes)
    expect(recipes).to be_a(Array), "The method should return an Array of Strings"
    expect(recipes.length).not_to eq 0
    expect(recipes.first).to be_a String
    expect(recipes.first.length).not_to eq 0
  end
end
