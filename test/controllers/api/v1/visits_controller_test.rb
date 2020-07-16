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
      p json_body
    end
  end
end