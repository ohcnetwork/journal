# frozen_string_literal: true

require "test_helper"

class Api::V1::MerchantsControllerTest < ActionDispatch::IntegrationTest
  def test_create_new_merchant
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

    assert_equal 1, json_body.keys.count
    assert json_body["temp_id"].is_a?(String)
  end

  def test_create_existing_merchant
    merchant = create(:merchant)

    local_body = create(:local_body)

    merchant_params = {
      name: "Lakeshore Hospital",
      phone_number: merchant.phone_number,
      address: "NH44, Madavana, Maradu",
      lb_code: local_body.lb_code
    }

    assert_difference "Merchant.count", 0 do
      post api_v1_merchants_path, params: { merchant: merchant_params }
    end

    merchant.reload

    assert_equal 1, json_body.keys.count
    assert_equal merchant.temp_id, json_body["temp_id"]

    assert_equal merchant_params[:name], merchant.name
    assert_equal merchant_params[:phone_number], merchant.phone_number
    assert_equal merchant_params[:address], merchant.address
    assert_equal merchant_params[:lb_code], merchant.lb_code
  end


  def test_verify_valid_otp
    merchant = create(:merchant)

    post verify_otp_api_v1_merchant_url(id: merchant.temp_id), params: { otp: "1947" }, as: :json

    assert_response :success

    assert_equal merchant.id, json_body["id"]
    assert_equal merchant.name, json_body["name"]
    assert_equal merchant.phone_number, json_body["phone_number"]
    assert_equal merchant.address, json_body["address"]
    assert_equal merchant.lb_code, json_body["lb_code"]
    assert_equal merchant.local_body.district_name, json_body["district_name"]
    assert_equal merchant.local_body.lb_name_english, json_body["lb_name_english"]
    assert_equal merchant.local_body.lb_name_full, json_body["lb_name_full"]
  end

  def test_verify_invalid_otp
    merchant = create(:merchant)

    post verify_otp_api_v1_merchant_url(id: merchant.temp_id), params: { otp: "1945" }, as: :json
    assert_response :bad_request
  end
end