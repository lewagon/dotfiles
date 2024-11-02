class List < ApplicationRecord
  acts_as_favoritable
  acts_as_favoritor

  belongs_to :user
  has_many :list_markers, dependent: :destroy
  has_many :vtuber_markers, dependent: :destroy
  has_many :vtubers, through: :vtuber_markers, source_type: "Vtuber"
  has_one_attached :photo

  validates :name, presence: true
  validates_length_of :name, maximum: 35

  def add_vtuber(vtuber)
    vm = VtuberMarker.new
    vm.list_id = id
    vm.vtuber = vtuber

    return vm.save
  end

  def get_vtubers
    vtubers = []
    vtuber_markers.each do |vm|
      vtubers << vm.vtuber
    end
    return vtubers
  end

  def has_vtuber?(vtuber)
    get_vtubers.include?(vtuber)
  end

  def get_vtuber_names
    vtubers = []
    vtuber_markers.each do |vm|
      vtubers << vm.vtuber.name
    end
    return vtubers
  end

  def get_random_vtuber
    vtuber_markers.sample.vtuber

    # vtubers = []
    # pics_per_row = 5

    # pics_per_row.times do |i|
    #   vtubers << vtuber_markers.sample.vtuber
    # end
    # return vtubers
  end

  def get_vtuber_row
    vtubers = []
    pic_count = 0

    vtuber_markers.each do |vm|
      pic_count +=1 if vm.vtuber.photo_url || vm.vtuber.thumbnail.attached?
    end

    if pic_count <= 5
      return get_vtubers
    else
      while vtubers.length < 5
        vtuber = get_random_vtuber
        if !vtubers.include?(vtuber) && (vtuber.thumbnail.attached? || (vtuber.photo_url && vtuber.photo_url != ""))
          vtubers << vtuber
        end
      end
    end
    return vtubers
  end

end
