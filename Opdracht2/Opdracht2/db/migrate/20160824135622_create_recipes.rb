class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.int :price
      t.array :ingredients

      t.timestamps null: false
    end
  end
end
