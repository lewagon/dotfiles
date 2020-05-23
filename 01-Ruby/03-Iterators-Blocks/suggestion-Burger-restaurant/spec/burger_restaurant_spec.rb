require 'burger_restaurant_addon'
require 'burger_restaurant'
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

describe "Prepare burgers:" do
  describe "grilled_classical_burger" do
    
    before(:all) do
      @burger = ["bread", "STEAK", "ketchup", "onions", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:grilled_classical_burger], @burger)
    end
    
    it "should work with lowercase 'steak', 'ketchup' and 'onions' as ingredients" do
      expect(defined?locals[:grilled_classical_burger]).to be_truthy
      expect("grilled_classical_burger").to pass_the_right_arguments
    end
    
    it "should be a perfect burger with string transformed to uppercase" do
      expect(locals[:grilled_classical_burger]).to be_ordered_burger(@burger)
    end
  end

  describe "juicy_classical_burger" do
    before(:all) do
      @burger = ["bread", "st~~k", "ketchup", "onions", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:juicy_classical_burger], @burger)
    end
    
    it "should work with lowercase 'steak', 'ketchup' and 'onions' as ingredients" do
      expect(defined?locals[:juicy_classical_burger]).to be_truthy
      expect("juicy_classical_burger").to pass_the_right_arguments
    end
  
    it "should be a perfect burger with vowels replaced by '~'" do
      expect(locals[:juicy_classical_burger]).to be_ordered_burger(@burger)
    end
  end

  describe "vegan_burger" do
    
    before(:all) do
      @burger = ["bread", "tofu", "ketchup", "onions", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:vegan_burger], @burger)
    end
    
    it "should work with lowercase 'steak', 'ketchup' and 'onions' as ingredients" do 
      expect(defined?locals[:vegan_burger]).to be_truthy
      expect("vegan_burger").to pass_the_right_arguments
    end

    it "should be a perfect burger with 'steak' replaced by 'tofu'" do
      expect(locals[:vegan_burger]).to be_ordered_burger(@burger)
    end
  end

  describe "salty_classical_burger" do
    
    before(:all) do
      @burger = ["bread", "*steak*", "ketchup", "onions", "bread"]
    end
  
    after(:all) do
      display_burgers(locals[:salty_classical_burger], @burger)
    end 
  
    
    it "should work with lowercase 'steak', 'ketchup' and 'onions' as ingredients" do
      expect(defined?locals[:salty_classical_burger]).to be_truthy
      expect("salty_classical_burger").to pass_the_right_arguments
    end
  
    it "should should be a perfect burger with the sign '*' before and after the string`" do
      expect(locals[:salty_classical_burger]).to be_ordered_burger(@burger)
    end
  end
end
  
describe "In the kitchen:", unless: @watermark do
  describe "#burger" do
    it "should be defined" do
      expect(defined?burger).to be_truthy
    end
    it "should take 3 parameters (steak, sauce, topping)" do
      expect(method(:burger).arity).to eq(3)
    end
    it "should return an array of strings with [\"bread\", `steak`, `sauce`, `topping`, \"bread\"]" do
      expect(burger("a", "b", "c")).to be_a(Array)
      expect(burger("steak", "ketchup", "tomato")).to be_ordered_burger(["bread", "steak", "ketchup", "tomato", "bread"])
      expect(burger("fish", "mayo", "avocado")).to be_ordered_burger(["bread", "fish", "mayo", "avocado", "bread"])
    end
  end

  describe "#burger with yield" do
    before(:all) do
      @block = Proc.new {|ingredient| ingredient.downcase }
    end
    
    it "should be able to take a block" do
      expect{|block| burger("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_control
    end
    
    it "should be able to take a block with arguments" do
      expect{|block| burger("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_with_args(String)
    end
  end
end