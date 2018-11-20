class TripsController < ApplicationController

 def index
    @trips = Trip.all
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def new
    @trip = Trip.new

  end


  def create
    @trip = Trip.new(trip_params)

    respond_to do |format|
      if @trip.save
        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
      else
        format.html { render :new }
      end
    end

  end


  private

  def trip_params
      params.require(:trip).permit(:title, :description, :start_date, :end_date)
    end

end