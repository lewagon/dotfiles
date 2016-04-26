class CreatePosts < ActiveRecord::Migration[4.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :url
      t.integer :votes
      t.timestamps null: false
    end
  end
end
