class InitWorld < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.timestamps null: false
    end

    create_table :posts do |t|
      t.string :name
      t.string :url
      t.integer :votes
      t.references :user
      t.timestamps null: false
    end
  end
end
