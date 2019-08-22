class UserAnime < ApplicationRecord
  belongs_to :user
  belongs_to :anime

  def title 
    self.anime.title
  end
end
