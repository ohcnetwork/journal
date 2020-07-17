# frozen_string_literal: true

class Api::V1::MerchantsController < Api::V1::BaseController
  def create
    merchant = Merchant.new(merchant_params)
    if merchant.save
      render json: merchant.as_json
    else
      respond_with_errors "While creating new Merchant: ", 422, merchant.errors.messages
    end
  end

  private

    def merchant_params
      params[:merchant].permit(:name, :phone_number, :address)
    end
end
