require "csv"

class CsvHelper
  def self.write_csv(file, data)
    CSV.open(file, "w") do |csv|
      data.each do |row|
        csv << row
      end
    end
  end
end
