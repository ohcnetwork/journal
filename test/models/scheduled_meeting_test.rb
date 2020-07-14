# frozen_string_literal: true

require "test_helper"

class ScheduledMeetingTest < ActiveSupport::TestCase
  def setup
    @user = users(:admin)
    @meeting_type = meeting_types(:retro)
    @scheduled_meeting = scheduled_meetings(:event)
  end

  def test_valid_scheduled_meeting
    assert @scheduled_meeting.valid?
  end

  def test_invalid_scheduled_meeting
    @scheduled_meeting.time = nil
    assert_not @scheduled_meeting.valid?
    assert_includes @scheduled_meeting.errors.full_messages, "Time can't be blank"
  end

  def test_user_id_is_present
    @scheduled_meeting.user_id = nil
    assert_not @scheduled_meeting.valid?
    assert_includes @scheduled_meeting.errors.full_messages, "User must exist"
  end

  def test_meeting_type_id_is_present
    @scheduled_meeting.meeting_type_id = nil
    assert_not @scheduled_meeting.valid?
    assert_includes @scheduled_meeting.errors.full_messages, "Meeting type must exist"
  end
end
