# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def verify_otp
    @user = User.find(params[:id])
    if @user.otp == params[:otp]
      render json: @user
    else
      head :bad_request
    end
  end
end
