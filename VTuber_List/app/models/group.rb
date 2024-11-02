class Group < ApplicationRecord
  has_many :group_markers, dependent: :destroy
  has_many :vtubers, through: :group_markers, source_type: "Group"

  validates :name, presence: true
end
