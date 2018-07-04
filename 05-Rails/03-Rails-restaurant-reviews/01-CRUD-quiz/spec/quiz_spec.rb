require "quiz"

describe "quiz" do
  describe "#crud" do
    it "should return the correct answer" do
      crud_verbs = %w[create read update delete]
      expect(crud.map(&:downcase)).to eq(crud_verbs)
    end
  end

  describe "#generate_model_command" do
    it "should return the correct answer" do
      correct_commands_regexp = /^rails (g|generate) model (restaurant|Restaurant) (name|name:string) stars:integer$/
      expect(generate_model_command.match(correct_commands_regexp)).not_to eq(nil)
    end
  end

  describe "#files_created_by_model_generator" do
    it "should return the correct answer" do
      files_generated = [
                          'app/models/restaurant.rb',
                          'db/migrate/YYYYMMDDHHMMSS_create_restaurants.rb'
                        ]

      expect(files_created_by_model_generator.sort).to eq(files_generated)
    end
  end

  describe "#crud_routing" do
    it "should return the correct answer" do
      expect(crud_routing).to eq('resources :restaurants')
    end
  end

  describe "#controller_actions" do
    it "should return the correct answer" do
      instance_methods = %w(create destroy edit index new show update)
      expect(controller_actions.sort).to eq(instance_methods)
    end
  end
end
