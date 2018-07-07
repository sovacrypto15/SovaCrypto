class CreateCchistories < ActiveRecord::Migration[5.1]
  def change
    create_table :cchistories do |t|
      t.integer :year
      t.string :month
      t.integer :week
      t.integer :week_start
      t.integer :week_end
      t.integer :rank
      t.string :symbol
      
      t.timestamps
    end
  end
end
