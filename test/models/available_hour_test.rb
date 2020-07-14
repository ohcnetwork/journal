# frozen_string_literal: true

require "test_helper"

class AvailableHourTest < ActiveSupport::TestCase
  def setup
    @available_hour = available_hours(:one)
  end

  def test_available_day_is_valid
    assert @available_hour.valid?
  end

  def test_from_attribute_is_present
    @available_hour.from = nil
    assert_not @available_hour.valid?
    assert_includes @available_hour.errors.full_messages, "From can't be blank"
  end

  def test_to_attribute_is_present
    @available_hour.to = nil
    assert_not @available_hour.valid?
    assert_includes @available_hour.errors.full_messages, "To can't be blank"
  end

  def test_available_day_id_is_present
    @available_hour.available_day_id = nil
    assert_not @available_hour.valid?
    assert_includes @available_hour.errors.full_messages, "Available day must exist"
  end

  def test_available_date_id_is_present
    @available_hour.available_date_id = nil
    assert_not @available_hour.valid?
    assert_includes @available_hour.errors.full_messages, "Available date must exist"
  end
end
