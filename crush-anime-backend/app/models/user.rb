class User < ApplicationRecord
  has_many :user_animes
  has_many :animes, through: :user_animes
end
