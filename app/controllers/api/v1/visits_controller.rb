# frozen_string_literal: true

class Api::V1::VisitsController < Api::V1::BaseController
  def index
    @visits = @user.visits.order("entry_at desc")
  end

  def create
    @visit = @user.visits.create!(visit_params)
  end

  def ongoing
    @visits = @user.visits.ongoing.order("entry_at desc")
    render :index
  end

  def exit
    @visit = @user.visits.find(params[:id])
    @visit.exit!
  end

  private

    def visit_params
      params.require(:visit).permit(:visitable_id, :visitable_type)
    end
end
