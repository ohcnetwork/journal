# frozen_string_literal: true

desc "Load db/Kerala_Local_Body.csv to local_bodies table"
task load_local_bodies_from_file: :environment do
  LocalBodyLoaderService.new.run!
end