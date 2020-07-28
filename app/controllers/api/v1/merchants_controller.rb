# frozen_string_literal: true

class Api::V1::MerchantsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def create
    @merchant = Merchant.where(phone_number: params[:merchant][:phone_number]).first

    if @merchant.blank?
      @merchant = Merchant.create! merchant_params
    else
      @merchant.update! merchant_params
    end

    @merchant.send_otp!
  end

  def verify_otp
    @merchant = Merchant.find_by(temp_id: params[:id])
    if @merchant.valid_otp?(params[:otp])
      render json: @merchant.as_json
    else
      head :bad_request
    end
  end

  private

    def merchant_params
      params[:merchant].permit(:name, :phone_number, :address, :lb_code)
    end
end
