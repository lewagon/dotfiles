class InitWorld < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.timestamps
    end

    create_table :posts do |t|
      t.string :name
      t.string :url
      t.integer :votes
      t.references :user
      t.timestamps
    end
  end
end
