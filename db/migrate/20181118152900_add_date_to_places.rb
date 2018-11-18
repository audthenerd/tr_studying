class AddDateToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :date, :date
  end
end
