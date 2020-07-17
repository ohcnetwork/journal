class AddTimestampsToVisits < ActiveRecord::Migration[6.0]
  def change
    add_timestamps(:visits)
  end
end
