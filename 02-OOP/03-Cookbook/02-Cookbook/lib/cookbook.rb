# The Cookbook class here will be our repository
require "csv"

class Cookbook
  # Implement the four methods you need here and use the CSV file to store your recipes


  private

  def load_csv
    CSV.foreach(@csv_file) do |row|
      # What should we do with the data from the CSV file when we load our app?
    end
  end

  def save_to_csv
    CSV.open(@csv_file, "wb") do |csv|
      # What should we do with the data in our db when we save our app?
    end
  end
end
