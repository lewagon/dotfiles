class CreateRecipes < ActiveRecord::Migration
  
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :description
      t.integer :length
      t.integer :difficulty
      t.integer :rating 
      t.integer :user_id     
      
      t.timestamps
    end
    
    add_index :recipes, :name
  end
  
  def clear
    drop_table :recipes
  end
  
end


