# Encoding: utf-8

require "spec_helper"
require "dessert"

describe Dessert do
  
  let(:fat_free) { Dessert.new("Fat-free cake", 130) }
  let(:fat) { Dessert.new("Fat cake", 500) }
  
  describe "#healthy?" do 
    it "inherits healthy? method from the Dessert class" do
      fat_free.healthy?.must_equal true
      fat.healthy?.must_equal false
    end
  end
  describe "#delicious?" do 
    it "inherits healthy? method from the Dessert class" do
      fat_free.delicious?.must_equal true
      fat.delicious?.must_equal true
    end
  end

end


describe JellyBean do
  
  let(:licorice_jelly) { JellyBean.new("jelly bean", 130, "black licorice") }
  let(:fat_jelly) { JellyBean.new("strawberry", 300, "black licorice") }
  
  describe "#healthy?" do 
    it "inherits healthy? method from the Dessert class" do
      licorice_jelly.healthy?.must_equal true
      fat_jelly.healthy?.must_equal false
    end
  end
  
  describe "#flavor" do 
    it "gives access to JellyBean flavor" do
      licorice_jelly.must_respond_to :flavor
      licorice_jelly.flavor.must_equal "black licorice"
    end
  end
  
  
  describe "#healthy?" do 
    it "inherits healthy? from the Dessert class" do
      licorice_jelly.healthy?.must_equal true
      fat_jelly.healthy?.must_equal false
    end
  end
  
  describe "#delicious?" do 
    it "has its own delicious rules" do
      licorice_jelly.delicious?.must_equal false
      fat_jelly.delicious?.must_equal true
    end
  end

end
