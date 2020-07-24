# frozen_string_literal: true

require "test_helper"

class Api::V1::MerchantsControllerTest < ActionDispatch::IntegrationTest
  def test_create
    local_body = create(:local_body)

    merchant_params = {
      name: "Lakeshore Hospital",
      phone_number: "9090909090",
      address: "NH44, Madavana, Maradu",
      lb_code: local_body.lb_code
    }

    assert_difference "Merchant.count", 1 do
      post api_v1_merchants_path, params: { merchant: merchant_params }
    end
  end
end