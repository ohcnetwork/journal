# frozen_string_literal: true

class Api::V1::MerchantsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def create
    merchant = Merchant.new(merchant_params)
    if merchant.save
      render json: { merchant_id: merchant.id }
    else
      respond_with_errors "While creating new Merchant: ", 422, merchant.errors.messages
    end
  end

  def verify_otp
    @merchant = Merchant.find(params[:id])
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
