require 'sinatra'
require "sinatra/reloader" if development?
require_relative "config/application.rb"

set :views, proc { File.join(root, "app/views") }





get '/' do
  # TODO: fetch posts from database.
  #       to pass them to the view, store them in an instance variable


  erb :posts  # The rendered HTML is in app/views/posts.erb
end
