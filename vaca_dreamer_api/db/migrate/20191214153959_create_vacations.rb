class CreateVacations < ActiveRecord::Migration[6.0]
  def change
    create_table :vacations do |t|
      t.string :title
      t.string :username
      t.string :category
      t.string :transportation

      t.timestamps
    end
  end
end
