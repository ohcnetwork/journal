# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:admin_user)

    @user = create(:user)
    5.times { create(:user) }

    2.times { create(:visit, user: @user, entry_at: 10.days.ago) }
    2.times { create(:visit, user: @user, entry_at: 5.days.ago) }
    2.times { create(:visit, user: @user, entry_at: 3.days.ago) }
    2.times { create(:visit, user: @user, entry_at: 1.day.ago) }
    2.times { create(:visit, user: @user, entry_at: Time.zone.today) }

    2.times { create(:visit, entry_at: 10.days.ago) }
    2.times { create(:visit, entry_at: 5.days.ago) }
    2.times { create(:visit, entry_at: 3.days.ago) }
    2.times { create(:visit, entry_at: 1.day.ago) }
    2.times { create(:visit, entry_at: Time.zone.today) }
  end

  def test_index_without_auth
    get api_v1_admin_users_path(phone: @user.phone_number, age: @user.age)
    assert_response :unauthorized
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

  #-----------------

  def test_route_map_without_auth
    get route_map_api_v1_admin_user_path(@user)
    assert_response :unauthorized
  end

  def test_route_map_with_invalid_user_id
    get route_map_api_v1_admin_user_path(id: "invalid"), headers: headers(@admin_user)
    assert_response :not_found
  end

  def test_route_map
    get route_map_api_v1_admin_user_path(@user), headers: headers(@admin_user), params: {
      from: 8.days.ago.to_date.to_s,
      to: 3.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 4, json_body["visits"].count
    assert_equal @user.name, json_body["user"]["name"]

    get route_map_api_v1_admin_user_path(@user), headers: headers(@admin_user), params: {
      from: 12.days.ago.to_date.to_s,
      to: 3.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 6, json_body["visits"].count

    get route_map_api_v1_admin_user_path(@user), headers: headers(@admin_user), params: {
      from: 3.days.ago.to_date.to_s,
      to: 3.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 2, json_body["visits"].count
  end
end