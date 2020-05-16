require "burger_factory"
require 'burger_factory_helper'

locals = @local_variables

puts <<~HEREDOC


             /_       ,_   __   _   ,_  
____________/_)_(_/__/ (__(_/__(/__/ (_ 
                          _/_           
                         (/                                      
                      /) __,   __  -/- _,_ ,_      
                    _//_(_/(__(_,__/__(_/_/ (__(_/____________________
                   _/                          _/_ 
                   /)                         (/   
                   `                               
HEREDOC

describe "#cook_burger" do
  it "should be defined" do
    expect(defined?cook_burger).to be_truthy
  end
  it "should take 3 parameters (recipe, sauce, topping)" do
    expect(method(:cook_burger).arity).to eq(3)
  end
  it "should return an array of strings with [\"bread\", `recipe`, `sauce`, `topping`, \"bread\"]" do
    expect(cook_burger("a", "b", "c")).to be_a(Array)
    expect(cook_burger("steak", "ketchup", "tomato")).to be_ordered_burger(["bread", "steak", "ketchup", "tomato", "bread"])
    expect(cook_burger("fish", "mayo", "avocado")).to be_ordered_burger(["bread", "fish", "mayo", "avocado", "bread"])
  end
end


describe "classical_burger" do
  
  before(:all) do
    @burger = ["bread", "steak", "ketchup", "tomato", "bread"]
  end

  after(:all) do
    colors = [52, 88, 124]
    display_burgers(locals[:classical_burger], @burger, colors)
  end 
  
  it "should be declared" do
    classical_burger = locals[:classical_burger]
    expect(defined?classical_burger).to be_truthy
  end

  it "should contain a perfect burger with `steak`, `ketchup` and `tomato`" do
    classical_burger = locals[:classical_burger]
    expect(classical_burger).to be_ordered_burger(@burger)
    expect(cook_burger("steak", "ketchup", "tomato")).to eq(@burger)
  end
end


describe "#cook_burger (with yield)" do
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


describe "nuggets_burger" do

  before(:all) do
    @burger = ["bread", "nuggets", "caesar", "onions", "bread"]
  end
  
  after(:all) do
    colors = [52, 124, 208]
    display_burgers(locals[:nuggets_burger], @burger, colors)
  end
  

  it "should be declared" do
    nuggets_burger = locals[:nuggets_burger]
    expect(defined?nuggets_burger).to be_truthy
  end

  it "should contain a perfect burger with `NUGGETS`, `CAESAR` and `ONIONS`" do
    nuggets_burger = locals[:nuggets_burger]
    expect(nuggets_burger).to be_ordered_burger(@burger)
    expect(cook_burger("NUGGETS", "CAESAR", "ONIONS"){|ingredient| ingredient.downcase }).to eq(@burger)
  end
end




describe "Advanced" do
  advanced = false

  context "Advanced", if: advanced==true do
    describe "mayo_burger" do

      before(:all) do
        @burger = ["bread", "ch~ck~n", "b~rb~c~~", "~n~~ns", "bread"]
      end
      
      after(:all) do
        colors = [52, 124, 208]
        display_burgers(locals[:mayo_burger], @burger, colors)
      end
      
    
      it "should be declared" do
        mayo_burger = locals[:mayo_burger]
        expect(defined?mayo_burger).to be_truthy
      end
    
      it "should contain a perfect burger with `chicken`, `barbecue`, `onions`" do
        mayo_burger = locals[:mayo_burger]
        expect(mayo_burger).to be_ordered_burger(@burger)
        expect(cook_burger("chicken", "barbecue", "onions"){|ingredient| ingredient.tr("aeiou", "~") }).to eq(@burger)
      end
    end
  end
end