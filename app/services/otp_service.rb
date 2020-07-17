# frozen_string_literal: true

class OtpService
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def send!
    # write code for sending OTP here.
    # and store it in the user

    # Hard coded OTP for now
    user.update!(otp: 1947)
  end
end
