class StaysController < ApplicationController
  before_action :set_stay, only: [:show, :update, :destroy]

  # GET /stays
  def index
    @stays = Stay.all

    render json: @stays, :except => [:updated_at]
  end

  # GET /stays/1
  def show
    if @stay
      render json: @stay, :except => [:updated_at]
    else
      render json: {error: 'Record not found with that id.'}
    end
  end

  # POST /stays
  def create
    @stay = Stay.new(stay_params)

    if @stay.save
      render json: @stay, status: :created, location: @stay
    else
      render json: @stay.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stays/1
  # def update
  #   if @stay.update(stay_params)
  #     render json: @stay
  #   else
  #     render json: @stay.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /stays/1
  def destroy
    @stay.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stay
      @stay = Stay.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def stay_params
      params.fetch(:stay, {}).permit(:name, :address, :city, :state, :country, :cost, :family_friendly)
    end
end
