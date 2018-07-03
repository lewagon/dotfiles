require "quiz"

describe "quiz" do
  describe "#plants_resources_routes" do
    it "should return the correct answer" do
      correct_actions = ['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'].sort
      expect(correct_actions).to eq(plants_resources_routes.sort)
    end
  end

  describe "#nested_routes_for_n_to_n?" do
    it "should return the correct answer" do
      expect(nested_routes_for_n_to_n?).to eq(false)
    end
  end

  describe "#validate_name" do
    it "should return the correct answer" do
      expect(validate_name).to eq('validates :name, presence: true')
    end
  end
end

