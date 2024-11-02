class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @lists = @user.lists
  end

end
