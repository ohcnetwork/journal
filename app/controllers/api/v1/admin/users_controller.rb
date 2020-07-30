# frozen_string_literal: true

class Api::V1::Admin::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!
  before_action :authenticate_admin_user_using_x_auth_token!
  before_action :ensure_mandatory_params_are_present, only: [:index]

  def index
    @users = User.by_age(params[:age]).by_phone(params[:phone])
  end

  def route_map
    @user = User.find(params[:id])
    @visits = @user.visits.between(start_date, end_date).order("entry_at desc")
  end

  private
    def start_date
      params[:from] || 7.days.ago.to_date.to_s
    end

    def end_date
      params[:to] || Time.zone.today.to_s
    end

    def ensure_mandatory_params_are_present
      unless params[:age] && params[:phone]
        head :bad_request
      end
    end
end
