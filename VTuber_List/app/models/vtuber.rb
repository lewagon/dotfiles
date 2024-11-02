require "open-uri"

class Vtuber < ApplicationRecord
  acts_as_favoritable
  acts_as_favoritor

  belongs_to :agency
  has_many :vtuber_markers, dependent: :destroy
  has_many :tag_markers, dependent: :destroy
  has_many :group_markers, dependent: :destroy
  has_many :tags, through: :tag_markers, source_type: "Tag"
  has_many :groups, through: :group_markers, source_type: "Group"
  has_many_attached :photos
  has_one_attached :thumbnail
  has_one_attached :vertical_picture

  validates :name, presence: true
  validates :description, presence: true
  validates_uniqueness_of :name, scope: :agency

  include PgSearch::Model
  pg_search_scope :search_by_name_and_description,
  against: [ :name, :description, :main_language ],
  using: {
    tsearch: { prefix: true } # <-- now `superman batm` will return something!
  }

  def self.find_by_name(name)
    Vtuber.where(name: name).first
  end

  def get_birthday
    if birthday
      birthday.strftime("%B %-d")
    else
      "Not available"
    end
  end

  def get_debut_date
    if debut_date
      debut_date.strftime("%B %-d, %Y")
    else
      "Not available"
    end
  end

  def tags
    arr = []
    TagMarker.where(vtuber_id: id).each do |tm|
      arr << Tag.find(tm.tag_id)
    end
    return arr
  end

  def add_tag(tag_name)
    tm = TagMarker.new
    tm.vtuber_id = id
    tm.tag = Tag.where(name: tag_name).first

    return tm.save
  end

  def has_tag?(tag_name)
    tms = TagMarker.where(vtuber_id: id)
    tms.each do |tm|
      if tm.tag.name.downcase == tag_name.downcase
        return true
      end
    end
    return false
  end

  def has_jp_name?
    (jp_name && jp_name != "")
  end

  def has_website?
    website && !website.blank?
  end

  def has_yt_channel?
    yt_channel && !yt_channel.blank?
  end

  def has_twitch_channel?
    twitch_channel && !twitch_channel.blank?
  end

  def num_of_people_tagged
    count = 0
    arr = []
    tms = VtuberMarker.where(vtuber_id: id)
    tms.each do |tm|
      puts tm.list.name
      if !arr.include?(tm.list.user)
        arr << tm.list.user
        count += 1
      end
    end
    return count
  end

  def self.get_random_vtuber
    Vtuber.all.sample
  end

  def set_thumbnail(url)
    file = URI.parse(url).open
    thumbnail.attach(
    io: file,
    filename: "thumbnail.png",
    content_type: "image/png"
    )
    return save
  end

  def set_vertical_picture(url)
    file = URI.parse(url).open
    vertical_picture.attach(
    io: file,
    filename: "vertical_picture.png"
    )
    return save
  end


end
