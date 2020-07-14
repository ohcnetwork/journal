# frozen_string_literal: true

require "test_helper"

class AvailableDayTest < ActiveSupport::TestCase
  def setup
    @available_day = available_days(:user_one)
  end

  def test_available_day_is_valid
    assert @available_day.valid?
  end

  def test_wday_is_present
    @available_day.wday = nil
    assert_not @available_day.valid?
    assert_includes @available_day.errors.full_messages, "Wday can't be blank"
  end

  def test_meeting_type_id_is_present
    @available_day.meeting_type_id = nil
    assert_not @available_day.valid?
    assert_includes @available_day.errors.full_messages, "Meeting type must exist"
  end
end
