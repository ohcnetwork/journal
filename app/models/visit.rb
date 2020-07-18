# frozen_string_literal: true

class Visit < ApplicationRecord
  belongs_to :user, touch: true

  belongs_to :visitable, polymorphic: true
  # Possible Visitable for now is only a Merchant.
  # We could add CustomLocation, Place, Establishment etc in future if needed

  before_validation :set_entry_at

  validates :entry_at, :user, :visitable, presence: true

  scope :ongoing, -> { where("exit_at is null") }
  scope :between, -> (start_date, end_date) { where("date(entry_at) >= ? and date(entry_at) <= ?", start_date, end_date) }

  def exit!
    update!(exit_at: current_time)
  end

  private

    def set_entry_at
      self.entry_at ||= current_time
    end

    def current_time
      Time.zone.now
    end
end