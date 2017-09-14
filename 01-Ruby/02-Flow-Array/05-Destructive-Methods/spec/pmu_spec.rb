require "pmu"

describe "#pmu_format!" do

  it "should modify its parameter (destructively)" do
    horse_race = ["Abricot du Laudot", "Black Caviar", "Brigadier Gerard", "Coup de Folie"]
    copy = horse_race.dup
    pmu_format!(horse_race)
    expect(horse_race).not_to eq copy
  end

  it "should follow the PMU formatting style" do
    horse_race = ["Abricot du Laudot", "Black Caviar", "Brigadier Gerard", "Coup de Folie"]
    pmu_format!(horse_race)
    expect(horse_race).to eq ["4-Coup de Folie!", "3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]
  end

end
