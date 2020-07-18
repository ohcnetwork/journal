# frozen_string_literal: true

require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  def test_verify_valid_otp
    user = create(:user, otp: "2255")

    post verify_otp_api_v1_user_url(user), params: { otp: user.otp }, as: :json

    assert_response :success

    assert_equal user.id, json_body["id"]
    assert_equal user.name, json_body["name"]
    assert_equal user.phone_number, json_body["phone_number"]
    assert_equal user.date_of_birth.to_s, json_body["date_of_birth"]
    assert_equal user.authentication_token, json_body["authentication_token"]
  end

  def test_verify_invalid_otp
    user = create(:user, otp: "2255")

    post verify_otp_api_v1_user_url(user), params: { otp: "3355" }, as: :json
    assert_response :bad_request
  end
end
