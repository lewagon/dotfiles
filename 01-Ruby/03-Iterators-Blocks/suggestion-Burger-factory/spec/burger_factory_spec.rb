require "burger_factory"
require 'burger_helper'

locals = @local_variables

describe "#burger_factory" do
  it "should be defined" do
    expect(defined?burger_factory).to be_truthy
  end
  it "should take 3 parameters (recipe, sauce, topping)" do
    expect(method(:burger_factory).arity).to eq(3)
  end
  it "should return an array of strings with [\"bread\", `recipe`, `sauce`, `topping`, \"bread\"]" do
    expect(burger_factory("a", "b", "c")).to be_a(Array)
    expect(burger_factory("steak", "ketchup", "tomato")).to eq(["bread", "steak", "ketchup", "tomato", "bread"])
    expect(burger_factory("fish", "mayo", "avocado")).to eq(["bread", "fish", "mayo", "avocado", "bread"])
  end
end


describe "classical_burger" do
  before(:all) do
    @burger = ["bread", "steak", "ketchup", "tomato", "bread"]
  end

  it "should be declared" do
    expect(locals[:classical_burger]).to be_truthy
  end

  it "should contain a perfect burger with `steak`, `ketchup` and `tomato`" do
    expect(locals[:classical_burger]).to be_ordered_burger(@burger)
    expect(burger_factory("steak", "ketchup", "tomato")).to eq(@burger)
    
    # expect(STDOUT).to receive(:puts).with(@burger)
    # expect(@burger).to be_ordered_burger(@burger)
    # expect { load FILE_PATH }.to output(/#{@burger.inspect}/).to_stdout
    # proc = Proc.new {|ingredient| ingredient.downcase }
    # expect(STDOUT).to receive(:puts).with(@burger) do |&block|
    #   expect(block).to be(&proc)
    # end
    # load FILE_PATH
  end
end

describe "Nuggets burger" do

  before(:all) do
    @burger = ["bread", "nuggets", "caesar", "onions", "bread"]
    @block = Proc.new {|ingredient| ingredient.downcase }
  end
  
  
  it "should be able to take a block" do
    expect{|block| burger_factory("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_control
  end
  
  it "should be able to take a block with arguments" do
    expect{|block| burger_factory("NUGGETS", "CAESAR", "ONIONS", &block)}.to yield_with_args(String)
  end


  it "should contain a perfect burger with `NUGGETS`, `CAESAR` and `ONIONS`" do
    expect(locals[:nuggets_burger]).to be_ordered_burger(@burger)
    expect(burger_factory("NUGGETS", "CAESAR", "ONIONS")).to eq(@burger)
  end
end
