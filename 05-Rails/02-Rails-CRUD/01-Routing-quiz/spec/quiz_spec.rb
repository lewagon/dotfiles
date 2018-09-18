require "quiz"

describe "quiz" do
  describe "#launching_a_rails_server" do
    it "should return the correct answer" do
      correct_commands = ['rails server', 'rails s']
      expect(correct_commands).to include(launching_a_rails_server)
    end
  end

  describe "#rails_flow" do
    it "should return the correct answer" do
      expect(rails_flow).to eq(['add routes', 'generate controller and action', 'create view'])
    end
  end

  describe "#route_to_about_page" do
    it "should return the correct answer" do
      expect(route_to_about_page).to eq("get 'about', to: 'pages#about'")
    end
  end

  describe "#generate_controller_command" do
    it "should return the correct answer" do
      correct_commands = [
                            'rails g controller pages about',
                            'rails g controller Pages about',
                            'rails generate controller pages about',
                            'rails generate controller Pages about'
                          ]

      expect(correct_commands).to include(generate_controller_command)
    end
  end

  describe "#naming_conventions" do
    it "should return the correct answer" do
      expect(naming_conventions).to eq('app/views/pages/about.html.erb')
    end
  end
end

