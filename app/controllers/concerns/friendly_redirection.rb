# frozen_string_literal: true

module ApiResponders
  extend ActiveSupport::Concern
  before_action :store_user_location!, if: :storable_location?
  def storable_location?
    request.path != "/sign_in" &&
    request.path != "/sign_up" &&
    !request.xhr? &&
    request.get? &&
    !user_signed_in?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end