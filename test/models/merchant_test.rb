# frozen_string_literal: true

require "test_helper"

class MerchantTest < ActiveSupport::TestCase
  test "by_lb_code" do
    local_body1 = create(:local_body, lb_code: "LB12345")
    merchant1   = create(:merchant, local_body: local_body1)

    local_body2 = create(:local_body, lb_code: "LB00000")
    merchant2   = create(:merchant, local_body: local_body2)

    assert_equal 1, Merchant.by_lb_code("LB12345").count
    assert_equal merchant1, Merchant.by_lb_code("LB12345").first
  end

  test "by_district_id" do
    local_body1 = create(:local_body, district_id: 13)
    merchant1   = create(:merchant, local_body: local_body1)

    local_body2 = create(:local_body, district_id: 10)
    merchant2   = create(:merchant, local_body: local_body2)

    assert_equal 1, Merchant.by_district_id(13).count
    assert_equal merchant1, Merchant.by_district_id(13).first
  end

  test "temp_id generation" do
    merchant = create(:merchant)
    assert merchant.temp_id.is_a?(String)
  end
end
