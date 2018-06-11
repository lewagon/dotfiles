require "horse_racing"

describe "#horse_racing_format!" do

  it "should modify its parameter (destructively)" do
    horse_race = ["Abricot du Laudot", "Black Caviar", "Brigadier Gerard", "Coup de Folie"]
    copy = horse_race.dup
    horse_racing_format!(horse_race)
    expect(horse_race).not_to eq copy
  end

  it "should follow the horse racing formatting style" do
    horse_race = ["Abricot du Laudot", "Black Caviar", "Brigadier Gerard", "Coup de Folie"]
    horse_racing_format!(horse_race)
    expect(horse_race).to eq ["4-Coup de Folie!", "3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]
  end

end
