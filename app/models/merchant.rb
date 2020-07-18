# frozen_string_literal: true

class Merchant < ApplicationRecord
  has_many :qr_codes, as: :qr_coded, dependent: :destroy
  has_many :visits, as: :visitable, dependent: :destroy

  validates :name, :phone_number, :address, presence: true

  def as_json
    self.reload
    super.except("created_at", "updated_at")
  end
end
