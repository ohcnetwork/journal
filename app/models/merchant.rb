# frozen_string_literal: true

class Merchant < ApplicationRecord
  has_many :qr_codes, as: :qr_coded, dependent: :destroy
  has_many :visits, as: :visitable, dependent: :destroy

  # after_create :generate_qr_code

  validates :name, :phone_number, :address, presence: true

  def as_json
    self.reload
    super
      .except("created_at", "updated_at")
    # .merge("qr_code_id" => qr_codes.order(id: :desc).first.id)
  end

  private

    def generate_qr_code
      # Looks like this is not required as google charts api is used to generate
      # qr code.
      QrCode.generate(self)
    end
end
