class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      
      t.belongs_to :publisher
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
