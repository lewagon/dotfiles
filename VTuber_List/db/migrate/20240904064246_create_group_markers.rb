class CreateGroupMarkers < ActiveRecord::Migration[7.1]
  def change
    create_table :group_markers do |t|
      t.references :vtuber, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
