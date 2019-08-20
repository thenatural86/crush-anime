class Anime < ApplicationRecord
  has_many :user_animes
  has_many :users, through: :user_animes
end
