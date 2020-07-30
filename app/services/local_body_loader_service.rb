# frozen_string_literal: true

class LocalBodyLoaderService
  def run!
    load_data!
  end

  def load_data!
    LocalBody.copy_from csv_file
  end

  def csv_file
    @_csv_file ||= Rails.root.join("db/Kerala_Local_Body.csv").to_s
  end
end