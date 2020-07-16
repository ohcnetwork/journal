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
end
