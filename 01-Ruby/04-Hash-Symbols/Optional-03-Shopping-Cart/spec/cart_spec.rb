require 'spec_helper'
require 'data'

require 'cart'
require 'store'


describe 'cart methods' do

  before :each do
    CART = PRODUCTS.dup.clear
  end

  describe 'add_to_cart' do
    it 'adds any product to the cart' do
      add_to_cart(CART, PRODUCTS[0])
      add_to_cart(CART, PRODUCTS[2])
      add_to_cart(CART, PRODUCTS[3])
      add_to_cart(CART, 'whatever')

      CART.must_be_same_as [PRODUCTS.select { |p| [0, 2, 3].include?(PRODUCTS.index(p)) }, 'whatever'].flatten
    end

  end

  describe 'cart_to_s' do
    it 'returns a string containing all products separated by a coma' do
      add_to_cart(CART, PRODUCTS[0])
      add_to_cart(CART, PRODUCTS[2])
      add_to_cart(CART, PRODUCTS[4])

      str = cart_to_s(CART)
      str.split(',').each_with_index do |p, idx|
        p.strip.must_equal(PRODUCTS[idx * 2])
      end
    end
  end

  describe 'cart_total_price' do
    it 'returns the total price of the given cart' do
      add_to_cart(CART, PRODUCTS[0])
      add_to_cart(CART, PRODUCTS[2])
      add_to_cart(CART, PRODUCTS[4])
      add_to_cart(CART, 'whatever')

      total = cart_total_price(CART, store_items)
      [0, 2, 4].each { |idx| total -= PRICES[idx] }
      total.must_equal(0)
    end
  end
end
