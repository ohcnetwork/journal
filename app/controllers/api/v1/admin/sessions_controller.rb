# frozen_string_literal: true

class Api::V1::Admin::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def create
    if authenticated?
      @admin_user = AdminUser.first
    else
      head :unauthorized
    end
  end

  private

    def authenticated?
      ENV["ADMIN_LOGIN"] && ENV["ADMIN_PASSWORD"] &&
      ENV["ADMIN_LOGIN"] == params[:username] && ENV["ADMIN_PASSWORD"] == params[:password]
    end
end
