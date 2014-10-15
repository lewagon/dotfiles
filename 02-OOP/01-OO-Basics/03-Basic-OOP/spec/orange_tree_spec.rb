require "orange_tree"

describe OrangeTree do
  let(:orange_tree) { OrangeTree.new }

  it "should be measurable" do
    expect(orange_tree).to respond_to :height
    expect(orange_tree.height).to be_a Fixnum
  end

  it "should measure 0 meter when 0 years old" do
    expect(orange_tree.height).to eq 0
  end

  it "should age each year" do
    expect(orange_tree).to respond_to :one_year_passes!
  end

  it "should be alive until 50 years old" do
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

  it "should be dead after 100 years" do
    100.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.dead?).to eq true
  end

  it "should be probable for it to die between 50 and 99 years" do
    50.times do
      orange_tree.one_year_passes!
    end

    found_dead = false
    49.times do
      orange_tree.one_year_passes!
      found_dead = found_dead || orange_tree.dead?
    end

    expect(found_dead).to eq true
  end

  it "should not produce fruits until it is 5 years old" do
    5.times do
      orange_tree.one_year_passes!
      expect(orange_tree.fruits).to eq 0
    end
  end

  it "should produce 100 fruits a year between 5 and 10 years old" do
    5.times do
      orange_tree.one_year_passes!
    end
    5.times do
      orange_tree.one_year_passes!
      expect(orange_tree.fruits).to eq 100
    end
  end

  it "should produce 200 fruits a year beween 10 and 15 years old" do
    10.times do
      orange_tree.one_year_passes!
    end
    5.times do
      orange_tree.one_year_passes!
      expect(orange_tree.fruits).to eq 200
    end
  end

  it "should not produce any fruits after that" do
    16.times do
      orange_tree.one_year_passes!
    end

    expect(orange_tree.fruits).to eq 0
  end

  it "should be able to let people pick an orange" do
    10.times do
      orange_tree.one_year_passes!
    end

    fruit_count = orange_tree.fruits
    orange_tree.pick_a_fruit!
    expect(orange_tree.fruits).to eq (fruit_count - 1)
  end

end