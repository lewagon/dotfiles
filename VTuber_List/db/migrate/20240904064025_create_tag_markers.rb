class CreateTagMarkers < ActiveRecord::Migration[7.1]
  def change
    create_table :tag_markers do |t|
      t.references :vtuber, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
