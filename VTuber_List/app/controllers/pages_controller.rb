class PagesController < ApplicationController
  def home
    @lists = []
    if user_signed_in?
      @lists = current_user.lists
    end
    @list = List.new
  end

  def about
    @vtubers = []

    while @vtubers.length < 10
      vtuber = Vtuber.get_random_vtuber
      if !@vtubers.include?(vtuber) && (vtuber.thumbnail.attached?)
        @vtubers << vtuber
      end
    end
  end

  def random
    @vtubers = []
    while @vtubers.length < 100
      vtuber = Vtuber.get_random_vtuber
      if !@vtubers.include?(vtuber)
        @vtubers << vtuber
      end
    end
  end

end
