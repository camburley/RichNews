class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      
      t.belongs_to :page
      t.belongs_to :newsletter
      t.datetime :date
      
      t.jsonb :first_section
      t.jsonb :second_section
      t.jsonb :third_section
      
      t.timestamps null: false
    end
  end
end
