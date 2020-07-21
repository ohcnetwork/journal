# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::MerchantsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:admin_user)
  end

  def test_index_without_auth
    get api_v1_admin_merchants_path
    assert_response :unauthorized
  end

  def test_index_success
    get api_v1_admin_merchants_path, headers: headers(@admin_user)
    assert_response :success

    # users = json_body["merchants"]
    # assert_equal 1, users.count
    # assert_equal @user.id, users.first["id"]
  end
end