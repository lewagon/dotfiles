class CreateAgencies < ActiveRecord::Migration[7.1]
  def change
    create_table :agencies do |t|
      t.string :name
      t.string :country
      t.string :website
      t.boolean :active, default: true
      t.text :description
      t.string :location
      t.string :yt_channel

      t.timestamps
    end
  end
end
