class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      
      t.belongs_to :page
      t.string :name
      t.datetime :date
      t.datetime :editor_send
      t.datetime :subscriber_send
      
      t.string :heading_bubble

      t.timestamps null: false
    end
  end
end
