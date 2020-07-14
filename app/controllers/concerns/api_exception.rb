# frozen_string_literal: true

module ApiException
  extend ActiveSupport::Concern
  extend ActiveModel::Validations

  included do
    protect_from_forgery with: :exception

    rescue_from ActiveRecord::RecordNotFound, with: :handle_api_exceptions
    rescue_from ActiveModel::ValidationError, ActionController::ParameterMissing, with: :handle_api_exceptions

    def handle_validation_error(exception)
      respond_with_error exception.message, 422
    end

    def handle_api_exceptions(exception)
      log_exception exception unless Rails.env.test?

      if (exception.class.name == "Pundit::NotAuthorizedError")
        respond_with_error("Access Denied", 403)
      elsif (exception.class.name == "ActiveRecord::RecordNotFound")
        respond_with_error(exception.message, 404)
      elsif exception.class.name == "ValidationError"
        respond_with_error exception.message, 422
      else
        error_message = Rails.env.development? ? exception.message : "Something went wrong. Please try again later."
        respond_with_error(error_message, 500)
      end
    end

    def respond_with_error(message, status = 500)
      render json: { error: message }, status: status
    end

    def log_exception(exception)
      Rails.logger.info exception.class.to_s

      Rails.logger.info exception.to_s

      Rails.logger.info exception.backtrace.join("\n")
    end

    def raise_error(message, status_code)
      raise ValidationError.new(message, status_code)
    end
  end
end