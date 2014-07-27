class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string    :name
      t.datetime  :created_at
      t.string    :source_url
      t.integer   :rating
    end
  end
end
