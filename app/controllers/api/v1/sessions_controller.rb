# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def create
    @user = User.where(phone_number: params[:user][:phone_number]).first

    if @user.blank?
      @user = User.create! user_params
    else
      @user.update user_params
    end

    OtpService.new(@user).send!
  end

  private

    def user_params
      params.require(:user).permit(:name, :phone_number, :date_of_birth)
    end
end
