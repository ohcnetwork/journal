# frozen_string_literal: true

require "test_helper"

class AttendeeTest < ActiveSupport::TestCase
  def setup
    @attendee = attendees(:mike)
  end

  def test_valid_attendee
    assert @attendee.valid?
  end

  def test_name_is_present
    @attendee.name = nil
    assert_not @attendee.valid?
    assert_includes @attendee.errors.full_messages, "Name can't be blank"
  end

  def test_invalid_name_length
    @attendee.name = "a" * 61
    assert_not @attendee.valid?
    assert_includes @attendee.errors.full_messages, "Name is too long (maximum is 60 characters)"
  end

  def test_email_is_present
    @attendee.email = nil
    assert_not @attendee.valid?
    assert_includes @attendee.errors.full_messages, "Email can't be blank"
  end

  def test_invalid_email_length
    @attendee.email = "a" * 60 + "@example.com"
    assert_not @attendee.valid?
    assert_includes @attendee.errors.full_messages, "Email is too long (maximum is 60 characters)"
  end

  def test_valid_email_addresses
    valid_addresses = %w[mike@wates.com MIKE@wates.COM M_IK-E@den.org mike.wates@den.jp mike+wates@den.cn]
    valid_addresses.each do |valid_address|
      @attendee.email = valid_address
      assert @attendee.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  def test_invalid_email_addresses
    invalid_addresses = %w[mike@wates,com wates.org mike.wates@example. mike@wates_com mike@wates+user.com]
    invalid_addresses.each do |invalid_address|
      @attendee.email = invalid_address
      assert_not @attendee.valid?, "#{invalid_address.inspect} should be invalid"
      assert_includes @attendee.errors.full_messages, "Email is invalid"
    end
  end
end
