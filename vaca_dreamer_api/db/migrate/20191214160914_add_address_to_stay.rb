class AddAddressToStay < ActiveRecord::Migration[6.0]
  def change
    add_column :stays, :address, :string
  end
end
