class CreateClicks < ActiveRecord::Migration
  def change
    create_table :clicks do |t|
      
      t.belongs_to :user
      t.references :clickable, polymorphic: true, index: true
      
      t.timestamps null: false
    end
  end
end
