class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :latitude
      t.string :longitude
      t.string :image
      t.timestamps
    end
  end
end
