# frozen_string_literal: true

class Api::V1::Admin::MerchantsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!
  before_action :authenticate_admin_user_using_x_auth_token!
  before_action :ensure_mandatory_params_are_present, only: [:index]

  def index
    @users = User.by_age(params[:age]).by_phone(params[:phone])
  end

  private
    def ensure_mandatory_params_are_present
    end
end
