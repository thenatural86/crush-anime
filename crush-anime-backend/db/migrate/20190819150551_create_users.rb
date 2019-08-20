class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :favorite_anime

      t.timestamps
    end
  end
end
