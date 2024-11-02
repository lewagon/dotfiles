class ListsController < ApplicationController

  def show
    @list = List.find(params[:id])
  end

  def new
    @list = List.new
    @user = current_user
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    if @list.save
      redirect_to list_path(@list)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @list = List.find(params[:id])
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      redirect_to list_path(@list)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy!
    redirect_to :home
  end


  private

  def list_params
    params.require(:list).permit(:name, :photo)
  end
end
