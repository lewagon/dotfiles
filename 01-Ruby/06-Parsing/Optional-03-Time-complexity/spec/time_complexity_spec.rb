require 'benchmark'
require "time_complexity"
require "books_10.rb"
require "books_100.rb"
require "books_1000.rb"
require "graph.rb"

describe "#find_book" do
  it "should return the book index" do
    expect(find_book(BOOKS_10, "GitHub Explained")).to eq 5
    expect(find_book(BOOKS_100, "Data Structures and Algorithms")).to eq 21
  end

  it "should return `nil` when the book doesn't exist" do
    expect(find_book(BOOKS_10, "Great Start")).to eq nil
  end
end

describe "#find_book_enhanced" do
  it "should return the book index" do
    expect(find_book_enhanced(BOOKS_10, "GitHub Explained")).to eq 5
    expect(find_book_enhanced(BOOKS_100, "Data Structures and Algorithms")).to eq 21
  end

  it "should return `nil` when the book doesn't exist" do
    expect(find_book_enhanced(BOOKS_10, "Great Start")).to eq nil
  end
end

describe "performance" do
  it "find_book_enhanced should be faster than find_book" do
    amounts = [10, 500, 1000]
    elapsed_linear = nil
    elapsed_binary = nil
    dots = []
    amounts.each do |amount|
      books = BOOKS_1000.first(amount)
      elapsed_linear = Benchmark.measure { find_book(books, books.last) }
      elapsed_binary = Benchmark.measure { find_book_enhanced(books, books.last) }
      expect(find_book(books, books.last)).not_to be_nil
      expect(find_book_enhanced(books, books.last)).not_to be_nil
      puts "  sample size: #{amount} books"
      puts "  find_book:            #{elapsed_linear.total}"
      puts "  find_book_enhanced:   #{elapsed_binary.total}\n\n"
      dots << { books: amount, time: elapsed_linear.total, search: 'linear search' }
      dots << { books: amount, time: elapsed_binary.total, search: 'binary search' }
    end

    display_graph(dots)

    expect(elapsed_binary.total).to be < elapsed_linear.total
  end
end
