# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  def test_login_success
    admin_user = create(:admin_user)
    post api_v1_admin_sessions_path, params: { username: ENV["ADMIN_LOGIN"], password: ENV["ADMIN_PASSWORD"] }
    assert_response :success
    assert json_body["auth_token"].present?
  end

  def test_login_failure
    admin_user = create(:admin_user)
    post api_v1_admin_sessions_path, params: { username: ENV["ADMIN_LOGIN"], password: "savarigirigiri" }
    assert_response :unauthorized
  end
end