require 'net/http'
require 'rexml/document'

describe "The schema in jukebox.xml" do
  let(:doc) do
    xml = open(File.join(File.dirname(__FILE__), '../lib/jukebox.xml'))
    REXML::Document.new(xml)
  end

  let(:tables) do
    doc.elements.collect("//table") { |table| table }
  end

  %w(artists albums media_types genres tracks).each do |table_name|
    it "should have a `#{table_name}` table" do
      expect(table_exist?(table_name)).to eq(true), "Tables found: #{table_names.join(", ")}"
    end
  end

  describe "the `albums` table" do
    it "should have one foreign key only: `artist_id` references to the `artists` table" do
      expect(foreign_key_count("albums")).to eq 1
      expect(foreign_key_exists?("artist_id", "albums", "artists")).to eq true
    end
  end

  describe "the `tracks` table" do
    it "should have three foreign keys only: `album_id` references to the `albums` table" do
      expect(foreign_key_count("tracks")).to eq 3
      expect(foreign_key_exists?("album_id", "tracks", "albums")).to eq true
    end

    it "should have three foreign keys only: `genre_id` references to the `genres` table" do
      expect(foreign_key_count("tracks")).to eq 3
      expect(foreign_key_exists?("genre_id", "tracks", "genres")).to eq true
    end

    it "should have three foreign keys only: `media_type_id` references to the `media_types` table" do
      expect(foreign_key_count("tracks")).to eq 3
      expect(foreign_key_exists?("media_type_id", "tracks", "media_types")).to eq true
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

  def table_names
    tables.map { |table| table.attributes["name"] }
  end

  def table(table_name)
    tables.find { |table| table.attributes["name"] == table_name }
  end
end
