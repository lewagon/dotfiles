class VtuberMarker < ApplicationRecord
  belongs_to :vtuber
  belongs_to :list

  validates_uniqueness_of :vtuber, scope: :list
end
