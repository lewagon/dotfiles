# Encoding: utf-8

require "spec_helper"
require "restaurant"

describe Restaurant do 

  let(:jules_verne) { Restaurant.new("paris", "Jules Verne") }
  let(:tour_d_argent) { Restaurant.new("paris", "Tour d'argent") }
  let(:bocuse) { Restaurant.new("lyon", "Paul Bocuse") }
  let(:restos) { [jules_verne, tour_d_argent, bocuse] }
  
  describe "#average_rating" do
    it "should implement #average_rating reader" do
      jules_verne.must_respond_to :average_rating
    end
  end
  
  describe "#rate" do 
    it "should update average restaurant rating" do
      bocuse.rate(10)
      bocuse.rate(20)
      bocuse.average_rating.must_equal 15.0
    end
  end
  
  describe "#filter_by_city" do 
    it "should respond to filter_by_city method" do
      Restaurant.must_respond_to :filter_by_city
    end
    it "should filter by city existing restaurants" do
      Restaurant.filter_by_city(restos,"lyon").must_equal [bocuse]
    end
  end
  
end