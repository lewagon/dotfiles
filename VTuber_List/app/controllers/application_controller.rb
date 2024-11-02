class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  after_action :check_user
  before_action :configure_permitted_parameters, if: :devise_controller?

  private
  def check_user
    # raise
  end

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: [:email, :password]
    # devise_parameter_sanitizer.permit :sign_in, keys: [:email, :password, :remember_me]
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
