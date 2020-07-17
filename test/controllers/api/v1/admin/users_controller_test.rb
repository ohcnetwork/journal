# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:admin_user)

    5.times { create(:user) }
    @user = create(:user)
  end

  def test_index_success
    get api_v1_admin_users_path(phone: @user.phone_number, age: @user.age), headers: headers(@admin_user)
    assert_response :success

    users = json_body["users"]
    assert_equal 1, users.count
    assert_equal @user.id, users.first["id"]
  end

  def test_index_with_wrong_age
    get api_v1_admin_users_path(phone: @user.phone_number, age: @user.age + 10), headers: headers(@admin_user)
    assert_response :success
    assert_equal 0, json_body["users"].count
  end

  def test_index_with_wrong_phone
    get api_v1_admin_users_path(phone: "wrongphone", age: @user.age), headers: headers(@admin_user)
    assert_response :success
    assert_equal 0, json_body["users"].count
  end

  def test_index_with_wrong_phone_and_age
    get api_v1_admin_users_path(phone: "wrongphone", age: @user.age + 10), headers: headers(@admin_user)
    assert_response :success
    assert_equal 0, json_body["users"].count
  end

  def test_index_with_out_mandatory_params
    get api_v1_admin_users_path, headers: headers(@admin_user)
    assert_response :bad_request
  end
end