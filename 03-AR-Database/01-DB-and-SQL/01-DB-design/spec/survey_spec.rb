require "net/http"
require "rexml/document"

describe "The schema in survey.xml" do
  let(:doc) do
    xml = open(File.join(File.dirname(__FILE__), "../lib/survey.xml"))
    REXML::Document.new(xml)
  end

  let(:tables) do
    doc.elements.collect("//table") { |table| table }
  end

  %w(users surveys questions answers user_answers).each do |table_name|
    it "should have a `#{table_name}` table" do
      expect(table_exist?(table_name)).to eq(true), "Tables found: #{table_names.join(", ")}"
    end
  end

  describe "the `users` table" do
    it "should have a `id` column" do
      expect(column_exists?("id", "users")).to eq true
    end
  end

  describe "the `surveys` table" do
    it "should have a `id` column" do
      expect(column_exists?("id", "surveys")).to eq true
    end
    it "should have one foreign key only: `user_id` references to the `users` table" do
      expect(foreign_key_count("surveys")).to eq 1
      expect(foreign_key_exists?("user_id", "surveys", "users")).to eq true
    end
  end

  describe "the `questions` table" do
    it "should have a `id` column" do
      expect(column_exists?("id", "questions")).to eq true
    end
    it "should have one foreign key only: `survey_id` references to the `surveys` table" do
      expect(foreign_key_count("questions")).to eq 1
      expect(foreign_key_exists?("survey_id", "questions", "surveys")).to eq true
    end
  end

  describe "the `answers` table" do
    it "should have a `id` column" do
      expect(column_exists?("id", "answers")).to eq true
    end
    it "should have one foreign key only: `question_id` references to the `questions` table" do
      expect(foreign_key_count("answers")).to eq 1
      expect(foreign_key_exists?("question_id", "answers", "questions")).to eq true
    end
  end

  describe "the `user_answers` table" do
    it "should have a `id` column" do
      expect(column_exists?("id", "user_answers")).to eq true
    end
    it "should have two foreign keys only: `user_id` references to the `users` table" do
      expect(foreign_key_count("user_answers")).to eq 2
      expect(foreign_key_exists?("user_id", "user_answers", "users")).to eq true
    end

    it "should have two foreign keys only: `answer_id` references to the `answers` table" do
      expect(foreign_key_count("user_answers")).to eq 2
      expect(foreign_key_exists?("answer_id", "user_answers", "answers")).to eq true
    end
  end

  def table_exist?(table_name)
    !table(table_name).nil?
  end

  def foreign_key_count(table_name)
    table = table(table_name)
    rows = table.elements.each("row") { |row| row }
    foreign_keys = rows.select { |row| row.elements["relation"] }
    foreign_keys.count
  end

  def foreign_key_exists?(key_name, table_name, foreign_table_name)
    table = table(table_name)
    rows = table.elements.each("row") { |row| row }
    row = rows.find { |row| row.attributes["name"] == key_name }
    row.elements["relation"].attributes["table"] == foreign_table_name
  end

  def column_exists?(column_name, table_name)
    table = table(table_name)
    rows = table.elements.each("row") { |row| row }
    rows.find { |row| row.attributes["name"] == column_name } != nil
  end

  def table_names
    tables.map { |table| table.attributes["name"] }
  end

  def table(table_name)
    tables.find { |table| table.attributes["name"] == table_name }
  end
end
