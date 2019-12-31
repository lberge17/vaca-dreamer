class VacationsController < ApplicationController
  before_action :set_vacation, only: [:show, :update, :destroy]

  # GET /vacations
  def index
    if params[:category]
      cat = params[:category]
      if cat == 'group'
        cat = 'large group'
      elsif cat == 'family'
        cat = 'family fun'
      end
      @vacations = Vacation.where(category: cat)
    else
      @vacations = Vacation.all
    end
    
    render json: @vacations, :include => {:stays => {:except => [:created_at, :updated_at]}, :activities => {:except => [:created_at, :updated_at]}}, :except => [:updated_at]
  end

  # GET /vacations/1
  def show
    if @vacation
      render json: @vacation, :include => {:stays => {:except => [:created_at, :updated_at]}, :activities => {:except => [:created_at, :updated_at]}}, :except => [:updated_at]
    else
      render json: {error: "Record not found with that id."}
    end
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

  # DELETE /vacations/1
  def destroy
    if (@vacation.stays.destroy_all && @vacation.activities.destroy_all && @vacation.destroy)
      render json: {message: 'vacation was successfully deleted'}
    else
      render json: {error: 'vacation failed to delete'}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vacation
      @vacation = Vacation.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def vacation_params
      params.fetch(:vacation, {}).permit(:title, :username, :transportation, :category, stays_attributes: [:name, :address, :city, :state, :country, :cost, :family_friendly], activities_attributes: [:title, :description, :address, :city, :cost, :family_friendly])
    end
end
