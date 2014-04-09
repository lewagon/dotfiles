# Encoding: utf-8
require "spec_helper"
require "chaining_with_self"

describe Animal do
  describe "testing method chaining" do 
    fox = Animal.new.name("Fox").specie("mammals").color("red")
    fox.natural_habitat("forest")
    fox.to_s.must_equal "Name: Fox, Specie: mammals, Color: red, Natural Habitat: forest"
  end
end
