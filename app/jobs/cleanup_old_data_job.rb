# frozen_string_literal: true

class CleanupOldDataJob < ApplicationJob
  queue_as :default
  DEFAULT_LIFETIME = 30.days

  def perform
    QrCode.where("created_at <= ?", Date.current - DEFAULT_LIFETIME).destroy_all
    User.where("updated_at <= ?", Date.current - DEFAULT_LIFETIME).destroy_all
  end
end
