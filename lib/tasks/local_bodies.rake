# frozen_string_literal: true

desc "Load local bodies data from CSV file to local_bodies tablee"
task not_production: :environment do
  LocalBodyLoaderService.new.run!
end