require "quiz"

describe "quiz" do
  describe "#crud" do
    it "should return the correct answer" do
      crud_verbs = [
                     'create',
                     'read',
                     'update',
                     'delete',
                    ]
      expect(crud.map(&:downcase)).to eq(crud_verbs)
    end
  end

  describe "#generate_model_command" do
    it "should return the correct answer" do
      correct_commands = [
                          'rails generate model Restaurant name:string stars:integer',
                          'rails generate model Restaurant name stars:integer',
                          'rails generate model restaurant name:string stars:integer',
                          'rails generate model restaurant name stars:integer',
                          'rails g model Restaurant name:string stars:integer',
                          'rails g model Restaurant name stars:integer',
                          'rails g model restaurant name:string stars:integer',
                          'rails g model restaurant name stars:integer',
                          ]
      expect(correct_commands).to include(generate_model_command)
    end
  end

  describe "#files_created_by_model_generator" do
    it "should return the correct answer" do
      files_generated = [
                          'app/models/restaurant.rb',
                          'db/migrate/YYYYMMDDHHMMSS_create_restaurants.rb'
                        ]

      expect(files_generated_by_model_generator.sort).to eq(files_generated)
    end
  end

  describe "#crud_routing" do
    it "should return the correct answer" do
      expect(crud_routing).to eq('resources :restaurants')
    end
  end

  describe "#controller_methods" do
    it "should return the correct answer" do
      instance_methods = %w(create destroy edit index new show update)
      expect(controller_methods.sort).to eq(instance_methods)
    end
  end
end
