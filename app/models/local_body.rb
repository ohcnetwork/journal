# frozen_string_literal: true

class LocalBody < ApplicationRecord
  acts_as_copy_target

  has_many :merchants, foreign_key: :lb_code, dependent: :destroy, inverse_of: :local_bodies

  def self.formatted
    @@_lb_data ||= LocalBodyDataFormatterService.new.run!
  end
end