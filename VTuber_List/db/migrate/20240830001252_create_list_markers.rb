class CreateListMarkers < ActiveRecord::Migration[7.1]
  def change
    create_table :list_markers do |t|
      t.references :user, null: false, foreign_key: true
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
