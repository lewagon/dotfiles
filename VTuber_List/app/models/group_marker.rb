class GroupMarker < ApplicationRecord
  belongs_to :group
  belongs_to :vtuber

  validates_uniqueness_of :group, scope: :vtuber
end
