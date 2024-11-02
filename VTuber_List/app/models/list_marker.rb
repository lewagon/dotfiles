class ListMarker < ApplicationRecord
  belongs_to :user
  belongs_to :list

  validates_uniqueness_of :list, scope: :user
end
