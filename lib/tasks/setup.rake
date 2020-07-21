# frozen_string_literal: true

desc "Ensure that code is not running in production environment"
task not_production: :environment do
  if Rails.env.production? && ENV["DELETE_PRODUCTION_DATA"].blank?
    puts ""
    puts "*" * 50
    puts "Deleting production data is not allowed. "
    puts "If you really want to delete all production data and populate sample data then "
    puts "you can execute following command."
    puts "DELETE_PRODUCTION_DATA=1 rake setup_sample_data"
    puts " "
    puts "If you are using Heroku then execute command as shown below"
    puts "heroku run rake setup_sample_data DELETE_PRODUCTION_DATA=1 -a app_name"
    puts "*" * 50
    puts ""
    throw :error
  end
end

desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, :not_production, "db:drop", "db:create", "db:migrate"] do
  ["setup_sample_data"].each { |cmd| system "rake #{cmd}" }
end

def delete_all_records_from_all_tables
  ActiveRecord::Base.connection.schema_cache.clear!

  Dir.glob(Rails.root + "app/models/*.rb").each { |file| require file }

  exceptions = ["LocalBody"]

  ApplicationRecord.descendants.each do |klass|
    unless exceptions.include?(klass.to_s)
      klass.reset_column_information
      klass.delete_all
    end
  end
end

desc "Deletes all records and populates sample data"
task setup_sample_data: [:environment, :not_production] do
  delete_all_records_from_all_tables

  create_admin_user

  @visitors  = create_visitors
  @merchants = create_merchants

  create_visits

  puts "sample data was added successfully"
end

def create_admin_user
  AdminUser.create!(name: "CoronaSafe")
end

def create_merchants
  [
    {
      name: "Akshaya Centre, Kakkanad",
      phone_number: "1231231231",
      address: "Civil Station, Kakkanad, 682030",
      lb_code: lb_codes.sample
    },

    {
      name: "Lakeshore Hospital",
      phone_number: "2342342341",
      address: "Madavana, Maradu PO, 682304",
      lb_code: lb_codes.sample
    },

    {
      name: "Veekay Mart, Kakkanad",
      phone_number: "4564564561",
      address: "Seaport-Airport Road, Kakkanad, 682030",
      lb_code: lb_codes.sample
    }
  ].map do |merchant_data|
    Merchant.create! merchant_data
  end
end

def create_visits
  10.times do
    Visit.create! user: @visitors.sample, visitable: @merchants.sample, entry_at: 10.days.ago
  end

  10.times do
    Visit.create! user: @visitors.sample, visitable: @merchants.sample, entry_at: 5.days.ago
  end

  10.times do
    Visit.create! user: @visitors.sample, visitable: @merchants.sample, entry_at: 2.days.ago
  end

  10.times do
    Visit.create! user: @visitors.sample, visitable: @merchants.sample, entry_at: 1.day.ago
  end

  10.times do
    Visit.create! user: @visitors.sample, visitable: @merchants.sample, entry_at: Time.zone.today
  end
end

def create_visitors
  [
    {
      name: "Stephen Nedumpally",
      phone_number: "2255225522",
      date_of_birth: "05/05/1975",
      role: "visitor",
      otp: "1947"
    },

    {
      name: "Priyadarshini Ramdas",
      phone_number: "1237891231",
      date_of_birth: "18/01/1985",
      role: "visitor",
      otp: "1947"
    },

    {
      name: "Govardhan",
      phone_number: "7895674561",
      date_of_birth: "04/04/2005",
      role: "visitor",
      otp: "1947"
    }
  ].map { |user_data| User.create!(user_data) }
end

def lb_codes
  @_lb_codes ||= LocalBody.pluck(:lb_code)
end
