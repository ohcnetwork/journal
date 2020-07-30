# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "has authentication_token" do
    user = User.create({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    assert user.authentication_token.is_a?(String)
  end

  test "phone number is mandatory" do
    user = User.new({
      name: "Stephen Nedumpally",
      phone_number: nil,
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    assert_not user.valid?
  end

  test "phone number is unique" do
    User.create({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    user = User.new({
      name: "Daddy Girija",
      phone_number: "2255225522",
      date_of_birth: "05/05/2001",
      role: "visitor"
    })

    assert_not user.valid?
  end

  test "date_of_birth is mandatory" do
    user = User.new({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: nil,
      role: "visitor"
    })

    assert_not user.valid?
  end

  test "age" do
    user = User.create({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    assert_equal 45, user.age
  end

  test "by_age" do
    user = User.create({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    users = User.by_age(user.age)

    assert_equal 1, users.count
    assert_equal user, users[0]
  end

  test "by_phone" do
    user = User.create({
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor"
    })

    users = User.by_phone(user.phone_number)

    assert_equal 1, users.count
    assert_equal user, users[0]
  end

  test "user updation when visit is logged" do
    user = create(:user, updated_at: 2.hours.ago)
    prev_updated_at = user.updated_at
    assert_equal 0, user.visits.count

    visit = create(:visit, user: user)

    assert_equal 1, user.visits.count
    assert_not_equal prev_updated_at, user.updated_at
  end

  test "valid_otp?" do
    assert User.new.respond_to?(:valid_otp?)
  end

  test "send_otp!" do
    assert User.new.respond_to?(:valid_otp?)
  end
end
