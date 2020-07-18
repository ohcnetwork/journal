# frozen_string_literal: true

class CleanupOldDataJob < ApplicationJob
  queue_as :default
  DEFAULT_LIFETIME = 30.days

  def perform
    # if user has not logged in nor logged any visits in the last 30 days
    User.where("date(updated_at) <= ?", deletion_point).destroy_all

    # Visits older than 30 days
    Visit.where("date(entry_at) <= ?", deletion_point).destroy_all
  end

  def deletion_point
    @_deletion_point ||= DEFAULT_LIFETIME.ago.to_date
  end
end
