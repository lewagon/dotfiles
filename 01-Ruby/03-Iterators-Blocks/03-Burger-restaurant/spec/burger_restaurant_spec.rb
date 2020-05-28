require 'open3'
require 'burger_restaurant'
require 'burger_restaurant_helper'
require 'interface.rb'

locals = @local_variables

puts <<~HEREDOC


                 /_       ,_   __   _   ,_  
________________/_)_(_/__/ (__(_/__(/__/ (_ 
                              _/_           
                             (/                                      
    
      ,_   _   ,   -/-__,        ,_  __,   ,__,  -/-
    _/ (__(/__/_)__/_(_/(__(_/__/ (_(_/(__/ / (__/___________________ 
      
      
HEREDOC
      
describe "burger_restaurant.rb", unless: @watermark do
  describe "#burger" do
    it "should be defined" do
      expect(defined?burger).to be_truthy
    end
    
    it "should take 3 parameters (ingredient, sauce, topping)" do
      expect(method(:burger).arity).to eq(3)
    end
    
    it "should return an array of strings with [\"bread\", `ingredient`, `sauce`, `topping`, \"bread\"]" do
      expect(burger("a", "b", "c")).to be_a(Array)
      expect(burger("steak", "ketchup", "onions")).to eq(["bread", "steak", "ketchup", "onions", "bread"])
      expect(burger("fish", "mayo", "salad")).to eq(["bread", "fish", "mayo", "salad", "bread"])
    end
  end
  
  describe "#burger with yield" do
    before(:all) do
      @block = Proc.new {|ingredient| ingredient.downcase }
    end
    
    it "should be able to take a block" do
      expect{|block| burger("fish", "barbecue", "salad", &block)}.to yield_control
    end
    
    it "should be able to take a block with arguments" do
      expect{|block| burger("fish", "barbecue", "salad", &block)}.to yield_with_args(String)
    end
  end
end

describe "interface.rb" do
  before(:all) do
    Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
      @result = o.read
    end
  end

  describe "simple_burger" do
    before(:all) do
      @burger = ["bread", "steak", "ketchup", "onions", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:simple_burger], @burger, locals[:simple_burger] == @burger)
    end
    
    it 'should work with lowercase "steak", "ketchup" and "onions" as ingredients' do
      simple_burger = locals[:simple_burger]
      expect(simple_burger).to be_truthy
      expect("simple_burger").to pass_the_right_arguments("steak", "ketchup", "onions")
    end
    
    it "should be a perfect burger and nothing more" do
      simple_burger = locals[:simple_burger]
      expect(simple_burger).to be_ordered_burger(@burger)
    end
  end
  
  describe "bigger_burger" do
    before(:all) do
      @burger = ["bread", "FISH", "mayo", "salad", "bread"]
    end
    
    after(:all) do
      display_burgers(locals[:bigger_burger], @burger, locals[:bigger_burger] == @burger)
    end
    
    it 'should work with lowercase "fish", "mayo" and "salad" as ingredients' do
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
      @burger = ["bread", "ch~ck~n", "barbecue", "cheddar", "bread"]
    end
  
    after(:all) do
      display_burgers(locals[:juicy_burger], @burger, locals[:juicy_burger] == @burger)
    end
  
    it 'should work with lowercase "chicken", "barbecue" and "cheddar" as ingredients' do
      expect("juicy_burger").to pass_the_right_arguments("chicken", "barbecue", "cheddar")
    end
  
    it "should be a perfect burger with vowels replaced by '~'" do
      juicy_burger = locals[:juicy_burger]
      expect(juicy_burger).to be_ordered_burger(@burger)
    end
  end
  
  describe "vegan_burger" do
    before(:all) do
      @burger = ["bread", "salad", "ketchup", "onions", "bread"]
    end
  
    after(:all) do
      display_burgers(locals[:vegan_burger], @burger, locals[:vegan_burger] == @burger)
    end
  
    it 'should work with lowercase "steak", "ketchup" and "onions" as ingredients' do 
      expect("vegan_burger").to pass_the_right_arguments("steak", "ketchup", "onions")
    end
  
    it "should be a perfect burger with any meat replaced by salad" do
      vegan_burger = locals[:vegan_burger]
      expect(vegan_burger).to be_ordered_burger(@burger)
    end
  end
  
  describe "spicy_burger" do
    before(:all) do
      @burger = ["bread", "*chicken*", "ketchup", "cheddar", "bread"]
    end
  
    after(:all) do
      display_burgers(locals[:spicy_burger], @burger, locals[:spicy_burger] == @burger)
    end 
  
    it 'should work with lowercase "chicken", "ketchup" and "cheddar" as ingredients' do
      expect("spicy_burger").to pass_the_right_arguments("chicken", "ketchup", "cheddar")
    end
  
    it "should should be a perfect burger with the sign '*' before and after the string" do
      spicy_burger = locals[:spicy_burger]
      expect(spicy_burger).to be_ordered_burger(@burger)
    end
  end

end