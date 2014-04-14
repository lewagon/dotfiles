class CreateRecipes < ActiveRecord::Migration
  def change
      create_table :recipes do |t|
        t.string :name
        # your code here

        t.timestamps
      end
    end
end