# frozen_string_literal: true

class Visit < ApplicationRecord
  belongs_to :user

  belongs_to :visitable, polymorphic: true
  # Possible Visitable for now is only a Merchant.
  # We could add CustomLocation, Place, Establishment etc in future if needed

  before_validation :set_entry_at

  validates :entry_at, :user, :visitable, presence: true

  scope :ongoing, -> { where("exit_at is null") }

  def exit!
    update!(exit_at: current_time)
  end

  private

    def set_entry_at
      self.entry_at = current_time
    end

    def current_time
      Time.zone.now
    end
end