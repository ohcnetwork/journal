# frozen_string_literal: true

class AdminUser < ApplicationRecord
  devise :database_authenticatable, :registerable, :omniauthable

  before_create :ensure_authentication_token_is_present

  def self.from_authentication_token(auth_token)
    AdminUser.find_by(authentication_token: auth_token)
  end

  private
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
end
