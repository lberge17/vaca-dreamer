class CreateStays < ActiveRecord::Migration[6.0]
  def change
    create_table :stays do |t|
      t.belongs_to :vacation
      t.string :name
      t.string :city
      t.string :state
      t.string :country
      t.boolean :family_friendly
      t.string :cost, # string because it will be '$', '$$', '$$$', '$$$$', '$$$$$'

      t.timestamps
    end
  end
end
