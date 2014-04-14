class CreateUsers < ActiveRecord::Migration
  
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps
    end
  end
  
  def clear
    drop_table :recipes
  end
  
end