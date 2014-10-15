require "translation"

describe "The method translation" do
  it "should work for home.intro in French" do
    expect(translation('home.intro', 'fr')).to eq 'Bienvenue sur Le Wagon'
  end

  it "should fallback to english if key found but no translation yet for given language" do
    expect(translation('home.intro', 'es')).to eq 'Welcome on Le Wagon'
  end

  it "should work for home.content.goodbye with default language as English" do
    expect(translation('home.content.goodbye')).to eq 'Goodbye'
  end

  it "should return an empty string if correct translation is not found" do
    expect(translation('unvalid.path','en')).to eq ''
  end
end