require "quiz"
require_relative "support/routes_set"

describe "quiz" do
  describe "#restaurants_resources_routes" do
    it "should return the conventionnal set of 7 CRUD routes" do
      proposed_routes_set = restaurants_resources_routes

      expected_routes_set = RoutesSet.draw do
        get    '/restaurants',          to: 'restaurants#index'
        post   '/restaurants',          to: 'restaurants#create'
        get    '/restaurants/new',      to: 'restaurants#new'
        get    '/restaurants/:id/edit', to: 'restaurants#edit'
        get    '/restaurants/:id',      to: 'restaurants#show'
        patch  '/restaurants/:id',      to: 'restaurants#update'
        delete '/restaurants/:id',      to: 'restaurants#destroy'
      end

      expect(proposed_routes_set.to_s).to         eq(expected_routes_set.to_s)
      expect(proposed_routes_set.routes.count).to eq 7
    end
  end

  describe "#nested_routes_for_one_to_many?" do
    it "should return the correct answer" do
      expect(nested_routes_for_one_to_many?).to eq(false)
    end
  end

  describe "#validate_name" do
    it "should return the correct answer" do
      expect(validate_name).to eq('validates :name, presence: true')
    end
  end
end

