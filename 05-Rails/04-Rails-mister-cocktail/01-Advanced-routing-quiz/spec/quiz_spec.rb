require "quiz"

describe "quiz" do
  describe "#restaurants_resources_routes" do
    it "should return the correct answer" do
      correct_actions = [
                          "get '/restaurants', to: 'restaurants#index'",
                          "post '/restaurants', to: 'restaurants#create'",
                          "get '/restaurants/new', to: 'restaurants#new'",
                          "get '/restaurants/:id/edit', to: 'restaurants#edit'",
                          "get '/restaurants/:id', to: 'restaurants#show'",
                          "patch '/restaurants/:id', to: 'restaurants#update'",
                          "delete '/restaurants/:id', to: 'restaurants#destroy'",
                        ]
      second_correct_actions = [
                          "get '/restaurants', to: 'restaurants#index'",
                          "post '/restaurants', to: 'restaurants#create'",
                          "get '/restaurants/new', to: 'restaurants#new'",
                          "get '/restaurants/:id/edit', to: 'restaurants#edit'",
                          "get '/restaurants/:id', to: 'restaurants#show'",
                          "put '/restaurants/:id', to: 'restaurants#update'",
                          "delete '/restaurants/:id', to: 'restaurants#destroy'",
                        ]
      expect([correct_actions.sort, second_correct_actions.sort]).to include(restaurants_resources_routes.sort)
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

