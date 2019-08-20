class CreateAnimes < ActiveRecord::Migration[5.2]
  def change
    create_table :animes do |t|
      t.string :title
      t.string :image_url
      t.string :main_character
      t.string :description

      t.timestamps
    end
  end
end
