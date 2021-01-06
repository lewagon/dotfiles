require 'open3'
require 'interface_helper'
require 'interface'

locals = @variables

describe "interface.rb" do
  before(:all) do
    Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
      @result = o.read
    end
  end

  describe "bigger_burger" do
    before(:all) do
      @burger = ["bread", "FISH", "mayo", "salad", "bread"]
    end

    after(:all) do
      display_burgers(locals[:bigger_burger], @burger, locals[:bigger_burger] == @burger)
    end

    it 'should work with lowercase "fish", "mayo" and "salad" as choices' do
      bigger_burger = locals[:bigger_burger]
      expect(bigger_burger).to be_truthy
      expect("bigger_burger").to pass_the_right_arguments("fish", "mayo", "salad")
    end

    it "should be a perfect burger with string transformed to uppercase" do
      bigger_burger = locals[:bigger_burger]
      expect(bigger_burger).to be_ordered_burger(@burger)
    end
  end

  describe "juicy_burger" do
    before(:all) do
      @burger = ["bread", "st~~k", "barbecue", "cheddar", "bread"]
    end

    after(:all) do
      display_burgers(locals[:juicy_burger], @burger, locals[:juicy_burger] == @burger)
    end

    it 'should work with lowercase "steak", "barbecue" and "cheddar" as choices' do
      expect("juicy_burger").to pass_the_right_arguments("steak", "barbecue", "cheddar")
    end

    it "should be a perfect burger with vowels replaced by '~'" do
      juicy_burger = locals[:juicy_burger]
      expect(juicy_burger).to be_ordered_burger(@burger)
    end
  end

  describe "spicy_burger" do
    before(:all) do
      @burger = ["bread", "*chicken*", "ketchup", "cheddar", "bread"]
    end

    after(:all) do
      display_burgers(locals[:spicy_burger], @burger, locals[:spicy_burger] == @burger)
    end

    it 'should work with lowercase "chicken", "ketchup" and "cheddar" as choices' do
      expect("spicy_burger").to pass_the_right_arguments("chicken", "ketchup", "cheddar")
    end

    it "should should be a perfect burger with the sign '*' before and after the string" do
      spicy_burger = locals[:spicy_burger]
      expect(spicy_burger).to be_ordered_burger(@burger)
    end
  end
end
