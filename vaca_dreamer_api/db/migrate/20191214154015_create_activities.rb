class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.belongs_to :vacation
      t.string :title
      t.text :description
      t.string :address
      t.string :city
      t.string :cost # string because it will be '$', '$$', '$$$', '$$$$', '$$$$$'
      t.boolean :family_friendly

      t.timestamps
    end
  end
end
