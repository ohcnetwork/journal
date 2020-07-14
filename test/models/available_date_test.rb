# frozen_string_literal: true

require "test_helper"

class AvailableDateTest < ActiveSupport::TestCase
  def setup
    @available_date = available_dates(:monday)
  end

  def test_available_date_is_valid
    assert @available_date.valid?
  end

  def test_date_is_present
    @available_date.date = nil
    assert_not @available_date.valid?
    assert_includes @available_date.errors.full_messages, "Date can't be blank"
  end

  def test_meeting_type_id_is_present
    @available_date.meeting_type_id = nil
    assert_not @available_date.valid?
    assert_includes @available_date.errors.full_messages, "Meeting type must exist"
  end
end
