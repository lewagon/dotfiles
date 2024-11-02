class TagMarker < ApplicationRecord
  belongs_to :vtuber
  belongs_to :tag

  validates_uniqueness_of :tag, scope: :vtuber
end
