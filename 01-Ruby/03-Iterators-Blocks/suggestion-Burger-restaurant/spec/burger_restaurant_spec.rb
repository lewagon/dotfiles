require "burger_restaurant"
require 'burger_restaurant_helper'

locals = @local_variables

puts <<~HEREDOC


                 /_       ,_   __   _   ,_  
________________/_)_(_/__/ (__(_/__(/__/ (_ 
                              _/_           
                             (/                                      
                      /) __,   __  -/- _,_ ,_      
                    _//_(_/(__(_,__/__(_/_/ (__(_/____________________
                   _/                          _/_ 
                   /)                         (/   
                   `                               
HEREDOC

describe "Methods basics:" do
  describe "#cook_burger" do
    it "should be defined" do
      expect(defined?cook_burger).to be_truthy
    end
    it "should take 3 arguments (steak, sauce, topping)" do
      expect(method(:cook_burger).arity).to eq(3)
    end
    it "should return an array of strings with [\"bread\", `steak`, `sauce`, `topping`, \"bread\"]" do
      expect(cook_burger("a", "b", "c")).to be_a(Array)
      expect(cook_burger("steak", "ketchup", "tomato")).to be_ordered_burger(["bread", "steak", "ketchup", "tomato", "bread"])
      expect(cook_burger("fish", "mayo", "avocado")).to be_ordered_burger(["bread", "fish", "mayo", "avocado", "bread"])
    end
  end


  describe "classical_burger" do
    
    before(:all) do
      @burger = ["bread", "steak", "ketchup", "onions", "bread"]
    end

    after(:all) do
      display_burgers(locals[:classical_burger], @burger)
    end 
    
    it "should be declared" do
      classical_burger = locals[:classical_burger]
      expect(defined?classical_burger).to be_truthy
    end

    it "should work with `steak`, `ketchup` and `onions` as ingredients" do
      expect("classical_burger").to pass_the_right_arguments
    end

    it "should should be a perfect burger with `steak`, `ketchup` and `onions`" do
      classical_burger = locals[:classical_burger]
      expect(classical_burger).to be_ordered_burger(@burger)
      expect(cook_burger("steak", "ketchup", "onions")).to eq(@burger)
    end
  end
end

describe "Implement Yield:" do
  describe "#cook_burger with yield" do
    before(:all) do
      @block = Proc.new {|ingredient| ingredient.downcase }
    end
    
    it "should be able to take a block" do
      expect{|block| cook_burger("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_control
    end
    
    it "should be able to take a block with arguments" do
      expect{|block| cook_burger("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_successive_args(String, String, String)
    end
  end
end
  
describe "Create Blocks:" do
  describe "bigger_classical_burger" do
    
    before(:all) do
      @burger = ["bread", "STEAK", "KETCHUP", "ONIONS", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:bigger_classical_burger], @burger)
    end
    
    it "should be declared" do
      bigger_classical_burger = locals[:bigger_classical_burger]
      expect(defined?bigger_classical_burger).to be_truthy
    end

    it "should work with `steak`, `ketchup` and `onions` as ingredients" do
      expect("bigger_classical_burger").to pass_the_right_arguments
    end
    
    it "should be a perfect burger  with upcased ingredients" do
      bigger_classical_burger = locals[:bigger_classical_burger]
      expect(bigger_classical_burger).to be_ordered_burger(@burger)
      expect(cook_burger("steak", "ketchup", "onions"){|ingredient| ingredient.upcase }).to eq(@burger)
    end
  end

  describe "classical_burger_with_mayo" do
    before(:all) do
      @burger = ["bread", "st~~k", "k~tch~p", "~n~~ns", "bread"]
    end
    
    after(:all) do
  
      display_burgers(locals[:classical_burger_with_mayo], @burger)
    end
     
    it "should be declared" do
      classical_burger_with_mayo = locals[:classical_burger_with_mayo]
      expect(defined?classical_burger_with_mayo).to be_truthy
    end

    it "should work with `steak`, `ketchup` and `onions` as ingredients" do
      expect("classical_burger_with_mayo").to pass_the_right_arguments
    end
  
    it "should be a perfect burger with vowels replaced by '~'" do
      classical_burger_with_mayo = locals[:classical_burger_with_mayo]
      expect(classical_burger_with_mayo).to be_ordered_burger(@burger)
      expect(cook_burger("steak", "ketchup", "onions"){|ingredient| ingredient.tr("aeiou", "~") }).to eq(@burger)
    end
  end

  describe "vegan_burger" do
    
    before(:all) do
      @burger = ["bread", "tofu", "ketchup", "onions", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:vegan_burger], @burger)
    end
    
    it "should be declared" do
      vegan_burger = locals[:vegan_burger]
      expect(defined?vegan_burger).to be_truthy
    end
    
    it "should work with `steak`, `ketchup` and `onions` as ingredients" do
      expect("vegan_burger").to pass_the_right_arguments
    end

    it "should be a perfect burger with 'steak' replaced by 'tofu'" do
      vegan_burger = locals[:vegan_burger]
      expect(vegan_burger).to be_ordered_burger(@burger)
      expect(cook_burger("steak", "ketchup", "onions"){|ingredient|ingredient == "steak" ? "tofu" : ingredient}).to eq(@burger)
    end
  end
end
  