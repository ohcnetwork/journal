# frozen_string_literal: true

require "test_helper"

class CleanupOldDataJobTest < ActiveJob::TestCase
  test "Do not delete new records" do
    user = create(:user)

    create(:visit, user: user, entry_at: 10.days.ago)
    create(:visit, user: user, entry_at: 20.days.ago)
    create(:visit, user: user, entry_at: 29.days.ago)

    assert_equal 1, User.count
    assert_equal 3, Visit.count

    CleanupOldDataJob.perform_now

    assert_equal 1, User.count
    assert_equal 3, Visit.count
  end


  test "Delete user and visits when last visit was older than 30 days" do
    travel_to 70.days.ago do
      @user = create(:user)
    end

    travel_to 50.days.ago do
      create(:visit, user: @user)
    end

    travel_to 40.days.ago do
      create(:visit, user: @user)
    end

    travel_to 30.days.ago do
      create(:visit, user: @user)
    end

    CleanupOldDataJob.perform_now

    assert_equal 0, User.count
    assert_equal 0, Visit.count
  end

  test "Delete only old visits (retain user and newer visits)" do
    travel_to 70.days.ago do
      @user = create(:user)
    end

    travel_to 50.days.ago do
      create(:visit, user: @user)
    end

    travel_to 40.days.ago do
      create(:visit, user: @user)
    end

    travel_to 30.days.ago do
      create(:visit, user: @user)
    end

    travel_to 20.days.ago do
      create(:visit, user: @user)
    end

    travel_to 10.days.ago do
      create(:visit, user: @user)
    end

    CleanupOldDataJob.perform_now

    assert_equal 1, User.count
    assert_equal 2, Visit.count
  end
end
