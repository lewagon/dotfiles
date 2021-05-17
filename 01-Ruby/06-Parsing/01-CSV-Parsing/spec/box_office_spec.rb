require "box_office"

describe "#most_successful" do
  context "Most successful movies before 1975" do
    let(:movies_list) { most_successful(3, 1975, File.dirname(__FILE__) + "/../lib/movies.csv") }

    it "should return an array of movies" do
      expect(movies_list).to be_a Array
    end

    it "should represent each movie of the list as a hash" do
      expect(movies_list.all? { |movie| movie.is_a? Hash }).to eq true
    end

    it "should represent a movie with keys: name, year, earnings" do
      expect(movies_list.first.keys.all? { |key| [:name, :year, :earnings].include? key }).to eq true
    end

    it "should only keep movies where (year < max year)" do
      expect(movies_list.all? { |movie| movie[:year] < 1975 }).to eq true
    end

    it "should pick movies with maximum earnings" do
      target = [
        {name: "The Exorcist", year: 1973, earnings: 204565000},
        {name: "Gone with the Wind", year: 1939, earnings: 198655278},
        {name: "Snow White and the Seven Dwarfs", year: 1937, earnings: 184925485}
      ]
      expect(movies_list).to eq target
    end
  end

  context "Most successful movies ever" do
    it "Top 3 should be Avatar, Titanic and The Avengers" do
      movies_list = most_successful(3, 2100, File.dirname(__FILE__) + "/../lib/movies.csv")
      target = [
        {name: "Avatar", year: 2009, earnings: 760505847},
        {name: "Titanic", year: 1997, earnings: 658672302},
        {name: "The Avengers", year: 2012, earnings: 623279547}
      ]
      expect(movies_list).to eq target
    end

    it "Top 5 should be Avatar, Titanic, The Avengers" do
      movies_list = most_successful(5, 2100, File.dirname(__FILE__) + "/../lib/movies.csv")
      target = [
        {name: "Avatar", year: 2009, earnings: 760505847},
        {name: "Titanic", year: 1997, earnings: 658672302},
        {name: "The Avengers", year: 2012, earnings: 623279547},
        {name: "The Dark Knight", year: 2008, earnings: 533316061},
        {name: "Star Wars: Episode I - The Phantom Menace", year: 1999, earnings: 474544677}
      ]
      expect(movies_list).to eq target
    end
  end
end
