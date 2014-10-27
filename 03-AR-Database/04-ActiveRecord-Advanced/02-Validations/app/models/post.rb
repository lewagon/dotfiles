class Post < ActiveRecord::Base
  belongs_to :user

  # TODO: Add some validation
end