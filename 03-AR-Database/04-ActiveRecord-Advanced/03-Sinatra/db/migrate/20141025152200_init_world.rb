class InitWorld < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email

      t.timestamps null: false
    end

    create_table :posts do |t|
      t.string      :name
      t.string      :url
      t.integer     :votes, default: 0

      t.references  :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
