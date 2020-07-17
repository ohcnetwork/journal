# frozen_string_literal: true

require "test_helper"

class CleanupOldDataJobTest < ActiveJob::TestCase
  test "Do not delete new records" do
    # TODO: Use fixtures
    merchant = Merchant.create(phone_number: 123, name: "Jon", address: "Doe")
    QrCode.create!(qr_coded: merchant)
    User.create!(phone_number: 123, name: "John", date_of_birth: Date.new(1990))
    CleanupOldDataJob.perform_now

    assert_equal 1, User.count
    assert_equal 1, QrCode.count
  end


  test "Delete old records" do
    travel_to 31.days.ago do
      merchant = Merchant.create(phone_number: 123, name: "Jon", address: "Doe")
      QrCode.create!(qr_coded: merchant)
      User.create!(phone_number: 123, name: "John", date_of_birth: Date.new(1990))
    end
    CleanupOldDataJob.perform_now

    assert_equal 0, User.count
    assert_equal 0, QrCode.count
  end
end
