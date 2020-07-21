# frozen_string_literal: true

class Merchant < ApplicationRecord
  has_many :visits, as: :visitable, dependent: :destroy

  validates :name, :phone_number, :address, presence: true

  belongs_to :local_body, foreign_key: :lb_code, primary_key: :lb_code, inverse_of: :merchants

  scope :by_lb_code,     -> (lb_code) { where(lb_code: lb_code) }
  scope :by_district_id, -> (district_id) { joins(:local_body).where("local_bodies.district_id": district_id) }

  def as_json
    self.reload
    super.except("created_at", "updated_at").merge(local_body_data)
  end

  def local_body_data
    {
      "lb_name_full" => local_body.lb_name_full,
      "district_name" => local_body.district_name,
      "lb_name_english" => local_body.lb_name_english
    }
  end
end
