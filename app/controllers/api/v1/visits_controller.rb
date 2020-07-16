# frozen_string_literal: true

class Api::V1::VisitsController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  def index
    @visits = @user.visits.order("entry_at desc")
  end

  def create
    @visit = @user.visits.create!(visit_params)
  end

  private

    def visit_params
      params.require(:visit).permit(:visitable_id, :visitable_type)
    end
end
