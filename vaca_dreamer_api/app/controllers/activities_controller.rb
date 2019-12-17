class ActivitiesController < ApplicationController
  before_action :set_activity, only: [:show, :update, :destroy]

  # GET /activities
  def index
    @activities = Activity.all

    render json: @activities, :except => [:updated_at]
  end

  # GET /activities/1
  def show
    if @activity
      render json: @activity, :except => [:updated_at]
    else
      render json: {error: 'Record not found with that id.'}
    end
  end

  # POST /activities
  def create
    @activity = Activity.new(activity_params)

    if @activity.save
      render json: @activity, status: :created, location: @activity
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  # def update
  #   if @activity.update(activity_params)
  #     render json: @activity
  #   else
  #     render json: @activity.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /activities/1
  def destroy
    @activity.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_activity
      @activity = Activity.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def activity_params
      params.fetch(:activity, {}).permit(:title, :description, :address, :city, :cost, :family_friendly)
    end
end
