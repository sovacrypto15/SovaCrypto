class CreateRebalances < ActiveRecord::Migration[5.1]
  def change
    create_table :rebalances do |t|
      t.string :month
      t.integer :week
      t.string :day
      t.integer :totalCash

      t.timestamps
    end
  end
end
