require "restaurant"

BONUS = <<-eos
                                 ____
                    _           |---||            _
                    ||__________|   ||___________||
                   /_ _ _ _ _ _ |:._|'_ _ _ _ _ _ _\\`.
                  /_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\\:`.
                 /_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\\::`.
                /:.___________________________________\\:::`-._
            _.-'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _`::::::`-.._
        _.-' _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ `:::::::::`-._
      ,'_:._________________________________________________`:_.::::-';`
       `.'/ || |:::::`.'/::::::::`.'/::::::::`.'/::::::|.`.'/.|     :|
        ||  || |::::::||::::::::::||::::::::::||:::::::|..||..|     ||
        ||  || |  __  || ::  ___  || ::  __   || ::    |..||;||     ||
        ||  || | |::| || :: |:::| || :: |::|  || ::    |.|||:||_____||__
        ||  || | |::| || :: |:::| || :: |::|  || ::    |.|||:||_|_|_||,(
        ||_.|| | |::| || :: |:::| || :: |::|  || ::    |.'||..|    _||,|
     .-'::_.:'.:-.--.-::--.-:.--:-::--.--.--.-::--.--.-:.-::,'.--.'_|| |
      );||_|__||_|__|_||__|_||::|_||__|__|__|_||__|__|_|;-'|__|_(,' || '-
      ||||  || |. . . ||. . . . . ||. . . . . ||. . . .|::||;''||   ||:'
      ||||.;  _|._._._||._._._._._||._._._._._||._._._.|:'||,, ||,,
      '''''           ''-         ''-         ''-         '''  '''

eos

describe Restaurant do

  let(:jules_verne) { Restaurant.new("paris", "Jules Verne") }
  let(:tour_d_argent) { Restaurant.new("paris", "Tour d'argent") }
  let(:bocuse) { Restaurant.new("lyon", "Paul Bocuse") }
  let(:restos) { [jules_verne, tour_d_argent, bocuse] }

  describe "#average_rating" do
    it "should implement #average_rating reader" do
      expect(jules_verne).to respond_to :average_rating
    end
  end

  describe "#rate" do
    it "should update average restaurant rating" do
      ratings = [10, 15, 20]
      average = ratings.reduce(:+).fdiv(ratings.length)
      ratings.each do |rating|
        bocuse.rate(rating)
      end
      expect(bocuse.average_rating).to eq average
    end
  end

  describe "#filter_by_city" do
    it "should respond to filter_by_city method" do
      expect(Restaurant).to respond_to :filter_by_city
    end
    it "should filter by city existing restaurants" do
      expect(Restaurant.filter_by_city(restos,"lyon")).to eq [bocuse]
    end
  end

end
