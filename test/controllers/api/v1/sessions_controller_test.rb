# frozen_string_literal: true

require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def test_new_user_login
    user_params = { phone_number: "1234567890", date_of_birth: "1985-03-05", name: "Jacky" }

    assert_equal 0, User.where(user_params).count

    assert_difference "User.count", 1 do
      post api_v1_sessions_url, params: { user: user_params }, as: :json
    end

    assert_response :success
    assert_not json_body["user_id"].nil?
    assert_equal 1, User.where(user_params).count
  end

  def test_existing_user_login
    user = create(:user)
    user_params = {
      phone_number: user.phone_number,
      date_of_birth: "1985-03-05",
      name: "Jacky"
    }

    assert_equal 0, User.where(user_params).count

    assert_difference "User.count", 0 do
      post api_v1_sessions_url, params: { user: user_params }, as: :json
    end

    assert_response :success
    assert_equal user.id, json_body["user_id"]
    assert_equal 1, User.where(user_params).count
  end
end
