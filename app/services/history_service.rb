# frozen_string_literal: true

module HistoryService
  module_function

  def clean
    erase_before = (ENV["HISTORY_ERASE_BEFORE"] || "30").to_i

    ActiveRecord::Base.transaction do
      Rails.logger.info "\nHistory: Deleting .."
      Rails.logger.info "History: Visits from past #{erase_before} days"

      deleteable = Visit.where("visits.created_at < ?", erase_before.days.ago)
      deleteable.delete_all

      Rails.logger.info "History: count deleted: #{deleteable.count}"
    end
  end
end
