# frozen_string_literal: true

class Api::V1::Admin::VisitsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!
  before_action :authenticate_admin_user_using_x_auth_token!
  before_action :ensure_mandatory_params_are_present

  def index
    @visits = visitable.visits.between(start_date, end_date).order("entry_at desc")
  end

  private

    def visitable
      params["visitable_type"].constantize.find(params["visitable_id"])
    end

    def start_date
      params[:from] || 7.days.ago.to_date.to_s
    end

    def end_date
      params[:to] || Time.zone.today.to_s
    end

    def authenticate_admin_user_using_x_auth_token!
      auth_token = request.headers["X-Auth-Token"].presence

      @admin_user = AdminUser.from_authentication_token(auth_token)

      if @admin_user.blank?
        respond_with_error("Could not authenticate with the provided credentials", 401)
      end
    end

    def ensure_mandatory_params_are_present
      unless params[:visitable_id] && params[:visitable_type]
        head :bad_request
      end
    end
end
