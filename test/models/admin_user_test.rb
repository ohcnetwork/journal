# frozen_string_literal: true

require "test_helper"

class AdminUserTest < ActiveSupport::TestCase
  test "authentication_token is generated" do
    admin_user = AdminUser.new(name: "Thalathil Dineshan")
    assert_nil admin_user.authentication_token

    admin_user.save!
    assert admin_user.authentication_token.is_a?(String)
  end
end
