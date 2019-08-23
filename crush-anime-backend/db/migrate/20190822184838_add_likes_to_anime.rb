class AddLikesToAnime < ActiveRecord::Migration[5.2]
  def change
    add_column :animes, :likes, :integer
  end
end
