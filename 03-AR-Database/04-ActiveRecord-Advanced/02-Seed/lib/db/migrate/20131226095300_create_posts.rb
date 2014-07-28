class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string      :name
      t.datetime    :date
      t.string      :source_url
      t.integer     :rating
      t.references  :user
    end
  end
end
