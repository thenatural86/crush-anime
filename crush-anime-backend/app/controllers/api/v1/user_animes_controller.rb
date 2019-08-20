class Api::V1::UserAnimesController < ApplicationController
  def index
  user_animes = UserAnime.all
  render json: user_animes
  end

  def show
  user_anime = UserAnime.find(params[:id])
  render json: user_anime
  end
end
