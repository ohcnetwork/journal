# frozen_string_literal: true

require "test_helper"

class Api::V1::VisitsControllerTest < ActionDispatch::IntegrationTest
  def test_index
    visitor = create(:user)
    5.times { create(:visit, user: visitor) }

    get api_v1_visits_path, headers: headers(visitor)
    assert_response :success
    assert_equal 5, json_body["visits"].count
  end

  def test_create
    merchant = create(:merchant)
    visitor = create(:user)

    visit_params = {
      visitable_id: merchant.id,
      visitable_type: "Merchant"
    }

    assert_difference "visitor.visits.count", 1 do
      post api_v1_visits_path, headers: headers(visitor), params: { visit: visit_params }
    end
  end

  def test_ongoing
    visitor = create(:user)
    5.times { create(:visit, user: visitor, exit_at: nil) }
    5.times { create(:visit, user: visitor, exit_at: Time.zone.now) }

    get ongoing_api_v1_visits_path, headers: headers(visitor)
    assert_response :success
    assert_equal 5, json_body["visits"].count
  end

  def test_exit
    visitor = create(:user)
    visit = create(:visit, user: visitor, exit_at: nil)

    assert visit.exit_at.nil?

    put exit_api_v1_visit_path(visit), headers: headers(visitor)
    assert_response :success

    assert_not visit.reload.exit_at.nil?
  end
end