# Encoding: utf-8

require "spec_helper"
require "animal"

describe Animal do
  let(:fox) { Animal.new.name("Fox").color("red").natural_habitat("forest").specie("mammal") }
 
  describe "#to_s" do
    it "should chain methods!" do
      fox.to_s.must_equal "Name: Fox, Specie: mammal, Color: red, Natural Habitat: forest"
    end
  end
  
end
