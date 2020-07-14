# frozen_string_literal: true

class Api::V1::SessionsController < Devise::SessionsController
  include Devise::Controllers::Rememberable
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_for_database_authentication(email: params[:email])
    if invalid_password?(user)
      respond_with_error "Incorrect email or password", 401
    else
      params[:remember_me] ? remember_me(user) : forget_me(user)
      sign_in(user)
      render json: { user: user, redirect_to: stored_location_for(user) }
    end
  end

  def destroy
    sign_out(resource_name)
    reset_session
    respond "We'll see you around 👋"
  end

  private

    def invalid_password?(user)
      user.blank? || !user.valid_password?(params[:password])
    end
end
