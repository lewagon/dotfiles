class CreateVtubers < ActiveRecord::Migration[7.1]
  def change
    create_table :vtubers do |t|
      t.string :name
      t.text :description
      t.references :agency, foreign_key: true
      t.string :yt_channel
      t.string :twitch_channel
      t.string :photo_url
      t.string :gender
      t.date :birthday
      t.date :debut_date
      t.string :main_language
      t.boolean :active, default: true
      t.string :jp_name

      t.timestamps
    end
  end
end
