# frozen_string_literal: true

class Api::V1::Admin::MerchantsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!
  before_action :authenticate_admin_user_using_x_auth_token!
  before_action :ensure_mandatory_params_are_present, only: [:index]

  def index
    if params[:lb_code].present?
      @merchants = Merchant.by_lb_code(params[:lb_code])
    elsif params[:district_id].present?
      @merchants = Merchant.by_district_id(params[:district_id])
    end
  end

  private
    def ensure_mandatory_params_are_present
      unless params[:lb_code] || params[:district_id]
        head :bad_request
      end
    end
end
