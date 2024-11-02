# frozen_string_literal: true

class ActsAsFavoritorMigration < ActiveRecord::Migration[7.1]
  def self.up
    create_table :favorites, force: true do |t|
      t.references :favoritable, polymorphic: true, null: false
      t.references :favoritor, polymorphic: true, null: false
      t.string :scope, default: ActsAsFavoritor.configuration.default_scope,
                       null: false,
                       index: true
      t.boolean :blocked, default: false, null: false, index: true
      t.timestamps
    end

    add_index :favorites,
              ['favoritor_id', 'favoritor_type'],
              name: 'fk_favorites'
    add_index :favorites,
              ['favoritable_id', 'favoritable_type'],
              name: 'fk_favoritables'
    add_index :favorites,
              ['favoritable_type', 'favoritable_id', 'favoritor_type',
              'favoritor_id', 'scope'],
              name: 'uniq_favorites__and_favoritables', unique: true
  end

  def self.down
    drop_table :favorites
  end
end
