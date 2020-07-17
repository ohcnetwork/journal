# frozen_string_literal: true

every 1.day do
  runner "CleanupOldDataJob.perform_now"
end
