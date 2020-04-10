class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :url
      t.integer :votes, default: 0
      t.timestamps null: false
    end
  end
end
