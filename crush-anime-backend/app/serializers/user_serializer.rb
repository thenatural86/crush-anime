class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :favorite_anime

  has_many :user_animes
end
