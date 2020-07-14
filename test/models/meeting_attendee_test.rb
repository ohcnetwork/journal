# frozen_string_literal: true

require "test_helper"

class MeetingAttendeeTest < ActiveSupport::TestCase
  def setup
    @meeting_attendee = meeting_attendees(:mike)
  end

  def test_meeting_attendee_is_valid
    assert @meeting_attendee.valid?
  end

  def test_scheduled_meeting_id_is_present
    @meeting_attendee.scheduled_meeting_id = nil
    assert_not @meeting_attendee.valid?
    assert_includes @meeting_attendee.errors.full_messages, "Scheduled meeting must exist"
  end
end
