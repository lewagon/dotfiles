class Parent < ApplicationRecord
  acts_as_favoritable

  has_one_attached :photo

  validates :name, presence: true
end
