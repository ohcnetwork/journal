# frozen_string_literal: true

require "test_helper"

class MeetingTypeTest < ActiveSupport::TestCase
  def setup
    @user = users(:admin)
    @meeting_type = meeting_types(:retro)
  end

  def test_valid_meeting_type
    assert @meeting_type.valid?
  end

  def test_invalid_meeting_name
    @meeting_type.name = nil
    assert_not @meeting_type.valid?
    assert_includes @meeting_type.errors.full_messages, "Name can't be blank"
  end

  def test_invalid_meeting_name_length
    @meeting_type.name = "m" * 61
    assert_not @meeting_type.valid?
    assert_includes @meeting_type.errors.full_messages, "Name is too long (maximum is 60 characters)"
  end

  def test_invalid_meeting_duration
    @meeting_type.duration = nil
    assert_not @meeting_type.valid?
    assert_includes @meeting_type.errors.full_messages, "Duration can't be blank"
  end

  def test_user_id_is_present
    @meeting_type.user_id = nil
    assert_not @meeting_type.valid?
    assert_includes @meeting_type.errors.full_messages, "User must exist"
  end
end
