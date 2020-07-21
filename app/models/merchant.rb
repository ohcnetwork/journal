# frozen_string_literal: true

class Merchant < ApplicationRecord
  has_many :visits, as: :visitable, dependent: :destroy

  validates :name, :phone_number, :address, presence: true

  belongs_to :local_body, foreign_key: :lb_code, primary_key: :lb_code, inverse_of: :merchants

  def as_json
    self.reload
    super.except("created_at", "updated_at").merge(local_body_data)
  end

  def local_body_data
    {
      "lb_name_full" => local_body.lb_name_full
    }
  end
end
