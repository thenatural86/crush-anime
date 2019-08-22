class Api::V1::UserAnimesController < ApplicationController
  def index
  user_animes = UserAnime.all
  render json: user_animes
  end

  def show
  user_anime = UserAnime.find(params[:id])
  render json: user_anime
  end

  def create
  user_anime = UserAnime.create(useranime_params)
  anime = Anime.find(params[:anime_id])
  render json: user_anime
  end

  private
  def useranime_params
    params.require(:user_anime).permit(:user_id, :anime_id)
  end
  
end
