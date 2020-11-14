class InitWorld < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.timestamps null: false
    end

    create_table :posts do |t|
      t.string :title
      t.string :url
      t.integer :votes, default: 0
      t.references :user
      t.timestamps null: false
    end
  end
end
