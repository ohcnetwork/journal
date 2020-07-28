# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable

  validates :phone_number, uniqueness: true
  validates :name, :phone_number, :date_of_birth, presence: true

  has_many :visits, dependent: :destroy

  before_create :ensure_authentication_token_is_present

  scope :by_age,   -> (age)  { where("EXTRACT(YEAR FROM AGE(date_of_birth)) = ?", age) }
  scope :by_phone, -> (phone) { where(phone_number: phone) }

  def age
    Time.zone.today.year - date_of_birth.year
  end

  def display_name
    name
  end

  def super_admin?
    role == "super_admin"
  end

  def as_json(options = {})
    new_options = options.merge(only: [:id, :name, :phone_number, :date_of_birth, :authentication_token])
    super new_options
  end

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.find_by(email: data["email"]).first
    unless user
      user = User.new(first_name: data["first_name"],
                      last_name: data["last_name"],
                      email: data["email"],
                      password: Devise.friendly_token[0, 20])
      user.save!
    end
    user
  end

  def self.from_authentication_token(auth_token)
    User.find_by(authentication_token: auth_token)
  end

  def send_otp!
    if sms_sending_enabled?
      token = OtpService.new(phone_number).send!
      update!(otp_token: token)
    end
  end

  def valid_otp?(otp)
    if sms_sending_enabled?
      OtpService.new(phone_number).verify!(otp, self.otp_token)
    elsif Rails.env.development?
      otp == "1947" # for testing in development mode without sending OTP
    else
      false
    end
  end

  private

    def send_devise_notification(notification, *args)
      devise_mailer.send(notification, self, *args).deliver_later(queue: "devise_email")
    end

    def ensure_authentication_token_is_present
      if authentication_token.blank?
        self.authentication_token = generate_authentication_token
      end
    end

    def generate_authentication_token
      loop do
        token = Devise.friendly_token
        break token unless User.find_by(authentication_token: token)&.first
      end
    end

    def sms_sending_enabled?
      ENV["SMS_API_KEY"].present?
    end
end
