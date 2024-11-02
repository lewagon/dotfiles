class CreateVtuberMarkers < ActiveRecord::Migration[7.1]
  def change
    create_table :vtuber_markers do |t|
      t.references :vtuber, null: false, foreign_key: true
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
