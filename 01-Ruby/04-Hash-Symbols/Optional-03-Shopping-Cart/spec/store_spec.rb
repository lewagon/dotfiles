require 'spec_helper'
require 'data'
require 'store'

# Here's what you should have in store:
#   yogurts : 2€
#   meat : 7€
#   vegetables: 5€
#   potatoes : 2€
#   rice : 1€

describe 'is_product_in_store? method' do

  it 'returns true for all products in store' do
    PRODUCTS.each do |p|
      is_product_in_store?(p).must_equal(true)
    end
  end

  it 'returns false for any product not in store' do
    NOT_PRODUCTS.each do |p|
      is_product_in_store?(p).must_equal(false)
    end
  end

end

describe 'price_of_product method' do

  it 'returns the correct price for a product in store' do
    PRODUCTS.each_with_index do |p, idx|
      price_of_product(p).must_equal(PRICES[idx])
    end
  end

  it 'returns nil for a product that is not in store' do
    NOT_PRODUCTS.each do |p|
      price_of_product(p).must_be_nil
    end
  end

end

describe 'store_items_to_s method' do

  # TODO: Return a String with all store items in the following form:
  # - Meat: 7€
  # - Vegetables: 5€
  # ...
  #
  # TIP: add line breaks in your String with "\n"

  it 'returns a list of all products as a string' do

    list = store_items_to_s
    list.must_be_kind_of(String)

    regex = /^[^ ]+ ([^:]+): ?([0-9]+) ?€$/

    products = []
    prices = []

    list.each_line do |line|
      line.must_match(regex)

      m = line.match(regex)
      products << m.captures[0]
      prices << m.captures[1].to_i
    end

    products.each_with_index do |p, idx|
      if PRODUCTS.include?(p.downcase)
        prices[idx].must_equal(PRICES[PRODUCTS.index(p)])
      end
    end

  end

end
