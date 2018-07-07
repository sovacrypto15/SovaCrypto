class CreateTop15pctrtns < ActiveRecord::Migration[5.1]
  def change
    create_table :top15pctrtns do |t|
      t.string :date
      t.integer :week
      t.string :month
      t.integer :year

      t.timestamps
    end
  end
end
