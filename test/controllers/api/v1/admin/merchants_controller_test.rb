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
    get api_v1_admin_merchants_path, headers: headers(@admin_user), params: { lb_code: "123" }
    assert_response :success
  end

  def test_index_without_mandatory_params
    get api_v1_admin_merchants_path, headers: headers(@admin_user)
    assert_response :bad_request
  end

  def test_index_with_lb_code
    local_body1 = create(:local_body, lb_code: "LB12345")
    merchant1   = create(:merchant, local_body: local_body1)

    local_body2 = create(:local_body, lb_code: "LB00000")
    merchant2   = create(:merchant, local_body: local_body2)

    get api_v1_admin_merchants_path, headers: headers(@admin_user),
                                     params: { lb_code: local_body1.lb_code }
    assert_response :success
    assert_equal 1, json_body["merchants"].count
    assert_equal merchant1.name, json_body["merchants"][0]["name"]
    assert_equal merchant1.address, json_body["merchants"][0]["address"]
    assert_equal merchant1.lb_code, json_body["merchants"][0]["lb_code"]
    assert_equal merchant1.local_body.lb_name_full, json_body["merchants"][0]["lb_name_full"]
    assert_equal merchant1.phone_number, json_body["merchants"][0]["phone_number"]
    assert_equal merchant1.local_body.district_name, json_body["merchants"][0]["district_name"]
    assert_equal merchant1.local_body.lb_name_english, json_body["merchants"][0]["lb_name_english"]
  end

  def test_index_with_district_id
    local_body1 = create(:local_body, district_id: 13)
    merchant1   = create(:merchant, local_body: local_body1)

    local_body2 = create(:local_body, district_id: 10)
    merchant2   = create(:merchant, local_body: local_body2)

    get api_v1_admin_merchants_path, headers: headers(@admin_user),
                                     params: { district_id: local_body1.district_id }
    assert_response :success
    assert_equal 1, json_body["merchants"].count
    assert_equal merchant1.name, json_body["merchants"][0]["name"]
    assert_equal merchant1.address, json_body["merchants"][0]["address"]
    assert_equal merchant1.lb_code, json_body["merchants"][0]["lb_code"]
    assert_equal merchant1.local_body.lb_name_full, json_body["merchants"][0]["lb_name_full"]
    assert_equal merchant1.phone_number, json_body["merchants"][0]["phone_number"]
    assert_equal merchant1.local_body.district_name, json_body["merchants"][0]["district_name"]
    assert_equal merchant1.local_body.lb_name_english, json_body["merchants"][0]["lb_name_english"]
  end
end