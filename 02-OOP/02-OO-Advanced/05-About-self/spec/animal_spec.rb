require "animal"

describe Animal do
  let(:fox) { Animal.new.name("Fox").color("red").natural_habitat("forest").species("mammal") }
  let(:shark) { Animal.new.name("Shark").species("fish").color("grey").natural_habitat("sea") }

  describe "#to_s" do
    it "should chain methods!" do
      expect(fox.to_s).to eq "Name: Fox, Species: mammal, Color: red, Natural Habitat: forest"
      expect(shark.to_s).to eq "Name: Shark, Species: fish, Color: grey, Natural Habitat: sea"
    end
  end

end
