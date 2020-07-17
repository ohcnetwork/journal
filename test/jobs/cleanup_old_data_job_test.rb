# frozen_string_literal: true

require "test_helper"

class CleanupOldDataJobTest < ActiveJob::TestCase
  test "Do not delete new records" do
    merchant = FactoryBot.create(:merchant)
    QrCode.create!(qr_coded: merchant)
    FactoryBot.create(:user)
    CleanupOldDataJob.perform_now

    assert_equal 1, User.count
    assert_equal 1, QrCode.count
  end


  test "Delete old records" do
    travel_to 31.days.ago do
      merchant = FactoryBot.create(:merchant)
      QrCode.create!(qr_coded: merchant)
      FactoryBot.create(:user)
    end
    CleanupOldDataJob.perform_now

    assert_equal 0, User.count
    assert_equal 0, QrCode.count
  end
end
