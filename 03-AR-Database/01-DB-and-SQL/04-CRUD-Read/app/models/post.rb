# You can use a global variable, DB, which is an instance of SQLite3::Database
# No need to create it, you can just use it!

class Post
  def initialize(attributes = {})
    # TODO
  end

  def self.find(id)
    DB.results_as_hash = true
    # TODO
  end

  def self.all
    DB.results_as_hash = true
    # TODO
  end
end
