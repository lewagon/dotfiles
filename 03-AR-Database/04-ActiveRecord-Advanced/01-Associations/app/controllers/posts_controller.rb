require_relative "../views/post_view.rb"

class PostsController
  def initialize
    @view = PostView.new
  end

  def index
    # DO NOT WRITE SQL QUERIES
    # TODO: gather all posts from the database
    # TODO: give them to the view to be printed
  end

  def create
    # DO NOT WRITE SQL QUERIES
    # TODO: create a post
  end

  def update
    # DO NOT WRITE SQL QUERIES
    # TODO: update a post
  end

  def destroy
    # DO NOT WRITE SQL QUERIES
    # TODO: destroy a post
  end

  def upvote
    # DO NOT WRITE SQL QUERIES
    # TODO: increment the `votes` column for a post
  end
end