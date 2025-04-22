class User < ActiveRecord::Base
  has_many :posts

  # TODO: Add some validation
  # TODO: Add some callbacks
end
