class Api::V1::AnimesController < ApplicationController
  def index
  animes = Anime.all
  render json: animes
  end

  def show
    anime = Anime.find(params[:id])
    render json: anime
  end

  def create
    anime = Anime.create(anime_params)
    render json: anime
  end

  def update
    # byebug
    anime = Anime.find(params[:id])
    anime.update(anime_params) 
    render json: anime
  end
  
  def destroy
    anime = Anime.find(params[:id])
    UserAnime.all.each do |join|
      if join.anime_id == anime.id
        join.delete()
      end
    end
    anime.delete()
    render json: anime
    # head 204
  end


  private
  def anime_params
    params.require(:anime).permit(:title, :main_character, :description, :image_url, :likes)
  end
end
