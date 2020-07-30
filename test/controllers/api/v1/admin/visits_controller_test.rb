# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::VisitsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:admin_user)
    @merchant   = create(:merchant)
    5.times { create(:visit, visitable: @merchant) }

    @mandatory_params = {
      visitable_id: @merchant.id,
      visitable_type: @merchant.class.to_s
    }
  end

  def test_index_without_auth
    get api_v1_admin_visits_path, params: @mandatory_params
    assert_response :unauthorized
  end

  def test_index_with_auth
    get api_v1_admin_visits_path, headers: headers(@admin_user), params: @mandatory_params
    assert_response :success
  end

  def test_index_without_mandatory_params
    get api_v1_admin_visits_path, headers: headers(@admin_user)
    assert_response :bad_request
  end

  def test_index_with_visitable_id
    merchant   = create(:merchant)
    10.times { create(:visit, visitable: merchant) }

    get api_v1_admin_visits_path, headers: headers(@admin_user), params: { visitable_id: merchant.id, visitable_type: "Merchant" }
    assert_response :success
    assert_equal 10, json_body["visits"].count
  end

  def test_index_with_visitable_id_from_and_to
    merchant   = create(:merchant)

    2.times { create(:visit, visitable: merchant, entry_at: 10.days.ago) }
    2.times { create(:visit, visitable: merchant, entry_at: 5.days.ago) }
    2.times { create(:visit, visitable: merchant, entry_at: 2.days.ago) }


    get api_v1_admin_visits_path, headers: headers(@admin_user), params: {
      visitable_id: merchant.id,
      visitable_type: "Merchant",
      from: 8.days.ago.to_date.to_s,
      to: 3.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 2, json_body["visits"].count

    get api_v1_admin_visits_path, headers: headers(@admin_user), params: {
      visitable_id: merchant.id,
      visitable_type: "Merchant",
      from: 16.days.ago.to_date.to_s,
      to: 1.day.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 6, json_body["visits"].count

    get api_v1_admin_visits_path, headers: headers(@admin_user), params: {
      visitable_id: merchant.id,
      visitable_type: "Merchant",
      from: 10.days.ago.to_date.to_s,
      to: 5.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 4, json_body["visits"].count

    get api_v1_admin_visits_path, headers: headers(@admin_user), params: {
      visitable_id: merchant.id,
      visitable_type: "Merchant",
      from: 2.days.ago.to_date.to_s,
      to: 2.days.ago.to_date.to_s
    }
    assert_response :success
    assert_equal 2, json_body["visits"].count
  end
end