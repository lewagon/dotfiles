require "animal"

BONUS = <<-eos

     #####
    #### _\\_  ________
    ##=-[.].]| \\      \\
    #(    _\\ |  |------|
     #   __| |  ||||||||
      \\  _/  |  ||||||||
   .--'--'-. |  | ____ |
  / __      `|__|[o__o]|
_(_____________ /____\\____


eos

describe Animal do
  let(:fox) { Animal.new.name("Fox").color("red").natural_habitat("forest").species("mammal") }

  describe "#to_s" do
    it "should chain methods!" do
      expect(fox.to_s).to eq "Name: Fox, Species: mammal, Color: red, Natural Habitat: forest"
    end
  end

end
