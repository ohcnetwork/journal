# frozen_string_literal: true


timeout_interval = Rails.env.production? ? 15 : 120
Rails.application.config.middleware.insert_before Rack::Runtime, Rack::Timeout, service_timeout: timeout_interval
