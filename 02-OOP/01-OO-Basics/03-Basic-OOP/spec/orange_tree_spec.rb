require "orange_tree"

describe OrangeTree do
  let(:orange_tree) { OrangeTree.new }

  it "OrangeTree constructor (initialize method) should not take any parameters" do
    initialize_parameters_count = OrangeTree.allocate.method(:initialize).arity
    expect(initialize_parameters_count).to eq 0
  end

  it "should have an age" do
    expect(orange_tree).to respond_to :age
    expect(orange_tree.age).to be_a Integer
  end

  it "should be 0 years old when created" do
    expect(orange_tree.age).to eq 0
  end

  it "should have a height" do
    expect(orange_tree).to respond_to :height
    expect(orange_tree.height).to be_a Integer
  end

  it "should measure 0 meters when 0 years old" do
    expect(orange_tree.height).to eq 0
  end

  it "should have fruits" do
    expect(orange_tree).to respond_to :fruits
    expect(orange_tree.fruits).to be_a Integer
  end

  it "should have 0 fruits when 0 years old" do
    expect(orange_tree.fruits).to eq 0
  end

  it "should let us check whether the tree is dead or alive" do
    expect(orange_tree).to respond_to(:dead?)
    expect(orange_tree.dead?).to eq(false)
  end

  it "should have an `one_year_passes!` method to simulate a year passing" do
    expect(orange_tree).to respond_to :one_year_passes!
  end

  it "should age each year. After 8 years, it should be 8 years old" do
    8.times { orange_tree.one_year_passes! }
    expect(orange_tree.age).to eq(8)
  end

  it "should always live until 50 years old" do
    expect(orange_tree.dead?).to eq false
    50.times do
      orange_tree.one_year_passes!
      expect(orange_tree.dead?).to eq false
    end
  end

  it "should measure 10 meters when 10 years old" do
    10.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.height).to eq 10
  end

  it "should still measure 10 meters when 20 years old" do
    20.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.height).to eq 10
  end

  it "should not be able to live more than 100 years" do
    101.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.dead?).to eq true
  end

  1.upto(5) do |i|
    it "should not produce fruits at #{i} year#{i > 1 ? 's' : ''} old" do
      i.times do
        orange_tree.one_year_passes!
      end
      expect(orange_tree.fruits).to eq 0
    end
  end

  6.upto(9) do |i|
    it "should produce 100 fruits at #{i} years old" do
      i.times do
        orange_tree.one_year_passes!
      end
      expect(orange_tree.fruits).to eq 100
    end
  end

  10.upto(14) do |i|
    it "should produce 200 fruits at #{i} years old" do
      i.times do
        orange_tree.one_year_passes!
      end
      expect(orange_tree.fruits).to eq 200
    end
  end

  it "should stop producing fruits when reaching 15 years old" do
    15.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.fruits).to eq 0
  end

  it "should have a `pick_a_fruit!` method to simulate people picking a single fruit from the tree" do
    expect(orange_tree).to respond_to :pick_a_fruit!
  end

  it "should let people pick an orange" do
    10.times do
      orange_tree.one_year_passes!
    end

    orange_tree.pick_a_fruit!
    expect(orange_tree.fruits).to eq 199
  end

  it "should not let people pick fruits if there are no fruits remaining" do
    10.times do
      orange_tree.one_year_passes!
    end
    # There should be 200 fruits

    # Pick all fruits
    200.times { orange_tree.pick_a_fruit! }

    # Let's try to pick one more.
    orange_tree.pick_a_fruit!

    expect(orange_tree.fruits).to eq 0
  end

  it "from 50 years old, probability of dying should increase until 100 years old" do
    orange_tree.instance_variable_set :@age, 50

    loop_counter = 0

    is_dead = orange_tree.dead?
    until is_dead
      orange_tree.one_year_passes!
      loop_counter += 1
      is_dead = orange_tree.dead?
      orange_tree.instance_variable_set(:@age, 50) if orange_tree.age == 99
      break if loop_counter == 10000
    end

    expect(is_dead).to eq true
  end
end
