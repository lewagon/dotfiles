require "dessert"

describe Dessert do

  let(:fat_free) { Dessert.new("Fat-free cake", 130) }
  let(:fat) { Dessert.new("Fat cake", 500) }

  describe "#healthy?" do
    it "considers a dessert healthy when under 200 calories" do
      expect(fat_free.healthy?).to eq true
      expect(fat.healthy?).to eq false
    end
  end
  describe "#delicious?" do
    it "considers all generic desserts as delicious" do
      expect(fat_free.delicious?).to eq true
      expect(fat.delicious?).to eq true
    end
  end
end

describe JellyBean do

  let(:licorice_jelly) { JellyBean.new("jelly bean", 130, "black licorice") }
  let(:fat_jelly) { JellyBean.new("jelly bean", 300, "strawberry") }

  describe "inheritance" do
    it "should only extend Dessert with #flavor and #delicious?" do
      expect(JellyBean.instance_methods(false).sort).to match_array([:delicious?, :flavor])
    end
  end

  describe "#flavor" do
    it "has a flavor getter" do
      expect(licorice_jelly.flavor).to eq "black licorice"
    end
  end

  describe "#healthy?" do
    it "inherits #healthy? from the Dessert class" do
      expect(licorice_jelly.healthy?).to eq true
      expect(fat_jelly.healthy?).to eq false
    end
  end

  describe "#delicious?" do
    it "has its own rules for deliciousness" do
      expect(licorice_jelly.delicious?).to eq false
      expect(fat_jelly.delicious?).to eq true
    end
  end
end
