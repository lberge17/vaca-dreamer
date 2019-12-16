class VacationsController < ApplicationController
  before_action :set_vacation, only: [:show, :update, :destroy]

  # GET /vacations
  def index
    @vacations = Vacation.all

    render json: @vacations, :include => {:stays => {:except => [:created_at, :updated_at]}, :activities => {:except => [:created_at, :updated_at]}}, :except => [:updated_at]
  end

  # GET /vacations/1
  def show
    render json: @vacation
  end

  # POST /vacations
  def create
    @vacation = Vacation.new(vacation_params)

    if @vacation.save
      render json: @vacation, status: :created, location: @vacation
    else
      render json: { errors: @vacation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vacations/1
  # def update
  #   if @vacation.update(vacation_params)
  #     render json: @vacation
  #   else
  #     render json: @vacation.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /vacations/1
  # def destroy
  #   @vacation.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vacation
      @vacation = Vacation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def vacation_params
      params.fetch(:vacation, {}).permit(:title, :username, :transportation, :category)
    end
end
