# Encoding: utf-8
require "animal"

describe Animal do
  let(:fox) { Animal.new.name("Fox").color("red").natural_habitat("forest").specie("mammal") }

  describe "#to_s" do
    it "should chain methods!" do
      expect(fox.to_s).to eq "Name: Fox, Specie: mammal, Color: red, Natural Habitat: forest"
    end
  end

end
