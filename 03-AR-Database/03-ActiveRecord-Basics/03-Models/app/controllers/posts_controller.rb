require_relative "../views/posts_view"

class PostsController
  def initialize
    @view = PostsView.new
  end

  def index
    display_posts
  end

  def create
    # Ask the user for a post title (view)
    title = @view.ask_for(:title)
    # Ask the user for a post url (view)
    url = @view.ask_for(:url)
    # Create the post (model)
    # Save the post to the database (model)
    post = Post.create(title: title, url: url, votes: 0)
    display_posts
  end

  def update
    id = ask_for_id
    # Ask the user for a new title (view)
    title = @view.ask_for(:title)
    # Ask the user for a new url (view)
    url = @view.ask_for(:url)
    # Fetch the post from DB thanks to the id (model)
    post = Post.find(id)
    # Update this post title and url (model)
    # Save the updated post to the DB (model)
    post.update(title: title, url: url)
    display_posts
  end

  def destroy
    # Ask the user for and id (view)
    id = ask_for_id
    # Fetch the post from the DB thanks to the id (model)
    # Destroy this post (model)
    Post.destroy(id)
    display_posts
  end

  def upvote
    # Ask the user for an id (view)
    id = ask_for_id
    # Fetch the post from the DB thanks to the id (model)
    post = Post.find(id)
    # Upvote the post => increment the votes integer by one (model)
    post.update(votes: post.votes + 1)
    # Save the post to the DB
    post.save
    display_posts
  end

  private

  def display_posts
    # Fetch all posts from DB (model)
    posts = Post.all
    # Display these posts (view)
    @view.display(posts)
  end

  def ask_for_id
    display_posts
    # Ask the user for an id (view)
    @view.ask_for(:id).to_i
  end
end
